import { createIndexer, IdbStorage, Event } from "chainsauce-web";
import type { Indexer } from "chainsauce-web";
import { ethers } from "ethers";

import FactoryABI from "../abis/factoryCookieJar.json";
import { ADDRESSES } from "../utils/config";
import { useEffect, useState } from "react";

export type CookieJarEntry = {
  id: string;
  type: string;
  address: string;
  initializer: { [key: string]: any };
};

const parseSummonEvent = (event: Event) => {
  // cookieJar, details, initializer
  const parsedContent = event.args;
  const address = parsedContent.cookieJar;

  let initParams;
  switch (parsedContent.details) {
    case "BAAL":
      initParams = ethers.utils.defaultAbiCoder.decode(
        [
          "address",
          "uint256",
          "uint256",
          "address",
          "address",
          "uint256",
          "bool",
          "bool",
        ],
        parsedContent.initializer
      );
    case "ERC20":
      initParams = ethers.utils.defaultAbiCoder.decode(
        ["address", "uint256", "uint256", "address", "address", "uint256"],
        parsedContent.initializer
      );
    default:
      break;
  }

  if (!initParams) return undefined;

  return {
    id: initParams[0],
    type: parsedContent.details,
    address,
    initializer: initParams,
  } as CookieJarEntry;
};

async function handleEvent(indexer: Indexer<IdbStorage>, event: Event) {
  const db = indexer.storage.db;

  if (!db) {
    console.error("No db");
    return;
  }

  switch (event.name) {
    case "SummonCookieJar":
      const parsedEvent = parseSummonEvent(event);
      if (!parsedEvent) {
        console.error("Failed to parse event", event);
        break;
      }

      // address, details, initializer
      // TODO ID mix of chain + factory address + instance address
      db.add("cookieJars", {
        id: event.args.id,
        type: parsedEvent.type,
        address: parsedEvent.address,
        initializer: parsedEvent.initializer,
      });
      break;
    default:
      break;
  }

  console.log("event", event);
}

const useIndexer = (provider?: ethers.providers.Web3Provider) => {
  if (!provider) return {};
  const storage = new IdbStorage(["cookieJars"]);
  const [indexer, setIndexer] = useState<Indexer<IdbStorage> | undefined>();

  useEffect(() => {
    const init = async () => {
      const _indexer = await createIndexer(provider, storage, handleEvent);
      _indexer.subscribe(ADDRESSES["0x64"].summonCookieJar, FactoryABI);

      setIndexer(_indexer);
    };

    if (!indexer) {
      init();
    }
  }, []);

  // Susbscribe to events with the contract address and ABI
  //TODO dynamic config loading

  return { indexer: indexer };
};

export { useIndexer };

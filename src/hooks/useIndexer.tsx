import { createIndexer, IdbStorage, Event } from "chainsauce-web";
import type { Indexer } from "chainsauce-web";
import { ethers, BigNumberish } from "ethers";

import FactoryABI from "../abis/factoryCookieJar.json";
import { ADDRESSES } from "../utils/config";
import { useEffect, useState } from "react";
import { useDHConnect } from "@daohaus/connect";
import { BaalInitializer, CookieJarInitializer, Erc20Initializer, Initializer } from "./useCookieJarFactory";

export type CookieJarEntry = {
  id: string;
  type: string;
  address: string;
  initializer: Initializer;
};

const parseSummonEvent = (event: Event) => {
  // cookieJar, initializer, jarType
  const args = event.args;
  console.log("Event: ", event);

  let initParams: Initializer;
  let decoded: ethers.utils.Result;
  switch (args.jarType) {
    case "BAAL":
      decoded = ethers.utils.defaultAbiCoder.decode(
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
        args.initializer
      );
      console.log(decoded);
      initParams = {
        safeTarget: decoded[0],
        cookieAmount: decoded[1],
        periodLength: decoded[2],
        cookieToken: decoded[3],
        dao: decoded[4],
        threshold: decoded[5],
        useShares: decoded[6],
        useLoot: decoded[7],
      } as BaalInitializer;
      break;
    case "ERC20":
      decoded = ethers.utils.defaultAbiCoder.decode(
        ["address", "uint256", "uint256", "address", "address", "uint256"],
        args.initializer
      );
      console.log(decoded);

      initParams = {
        safeTarget: decoded[0],
        cookieAmount: decoded[1],
        periodLength: decoded[2],
        cookieToken: decoded[3],
        erc20Addr: decoded[4],
        threshold: decoded[5],
      } as Erc20Initializer;

      break;
    default:
      console.log("Unknown jar type");
      decoded = ethers.utils.defaultAbiCoder.decode(
        ["address", "uint256", "uint256", "address"],
        args.initializer
      );
      console.log(decoded);
      initParams = {
        safeTarget: decoded[0],
        cookieAmount: decoded[1],
        periodLength: decoded[2],
        cookieToken: decoded[3],
      } as CookieJarInitializer;
      break;
  }

  return {
    id: ethers.utils.id(
      event.address + event.args.cookieJar + JSON.stringify(initParams)
    ),
    type: args.jarType,
    address: event.args.cookieJar,
    initializer: initParams,
  } as CookieJarEntry;
};

async function handleEvent(indexer: Indexer<IdbStorage>, event: Event) {
  const db = indexer.storage.db;

  if (!db) {
    console.error("No db");
    return;
  }

  console.log("Handling event");

  switch (event.name) {
    case "SummonCookieJar":
      console.log("SummonCookieJar");
      const parsedEvent = parseSummonEvent(event);
      if (!parsedEvent) {
        console.error("Failed to parse event", event);
        break;
      }

      console.log("parserd event", parsedEvent);

      // address, details, initializer
      // TODO ID mix of chain + factory address + instance address
      await db.add(
        "cookieJars",
        parsedEvent,
        ethers.utils.id(JSON.stringify(parsedEvent))
      );
      break;
    default:
      console.log("Unhandled event");
      break;
  }

  console.log("event", event);
}

const useIndexer = () => {
  const { provider } = useDHConnect();
  const [indexer, setIndexer] = useState<Indexer<IdbStorage> | undefined>();

  const storage = new IdbStorage(["cookieJars"]);

  // Effect hook to create indexer
  useEffect(() => {
    if (!provider || !storage) return;
    const init = async () => {
      const indexer = await createIndexer(provider, storage, handleEvent);
      setIndexer(indexer);
    };

    init();
  }, [provider]);

  console.log(indexer);

  if (indexer) {
    // Don't set starting block to 0, bunch of indexing errors if you do
    indexer.subscribe(ADDRESSES["0x64"].summonCookieJar, FactoryABI, 27746237);
  }

  const getJars = async () => {
    if (!indexer) return;
    const db = indexer.storage.db;
    return db?.getAll("cookieJars") as Promise<CookieJarEntry[]>;
  };
  // Susbscribe to events with the contract address and ABI
  //TODO dynamic config loading

  return { indexer: indexer, getJars };
};

export { useIndexer };

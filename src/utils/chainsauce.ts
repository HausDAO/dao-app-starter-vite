import { createIndexer, JsonStorage, Event } from "chainsauce";
import type { Indexer } from "chainsauce";
import { ethers } from "ethers";

import FactoryABI from "../abis/factoryCookieJar.json" assert { type: "json" };
import { useDHConnect } from "@daohaus/connect";
import { ADDRESSES } from "./config";

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

async function handleEvent(indexer: Indexer<JsonStorage>, event: Event) {
  const db = indexer.storage;

  switch (event.name) {
    case "SummonCookieJar":
      const parsedEvent = parseSummonEvent(event);
      if (!parsedEvent) {
        console.error("Failed to parse event", event);
        break;
      }

      // address, details, initializer
      // TODO ID mix of chain + factory address + instance address
      db.collection("cookieJars").insert({
        id: event.args.id,
        type: parsedEvent.type,
        address: parsedEvent.address,
        initializer: parsedEvent.initializer,
      });
      break;
    default:
      break;
  }
}

const getIndexer = async () => {
  const { provider } = useDHConnect();
  if (!provider) throw new Error("No provider");
  const indexer = await createIndexer(provider, storage, handleEvent);
  return indexer;
};

const storage = new JsonStorage("./data");
const indexer = await getIndexer();

// Susbscribe to events with the contract address and ABI
//TODO dynamic config loading
indexer.subscribe(ADDRESSES["0x64"].summonCookieJar, FactoryABI);

export { indexer };

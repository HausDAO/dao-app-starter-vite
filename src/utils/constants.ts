import { Keychain } from "@daohaus/keychain-utils";

export const DEFAULT_GRAPH_URL =
  "https://api.thegraph.com/subgraphs/name/hats-protocol/hats-protocol-goerli";

export const HATS_GRAPH_URL: Keychain = {
  "0x5": DEFAULT_GRAPH_URL,
  "0x64": "",
};

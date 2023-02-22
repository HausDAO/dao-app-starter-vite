import { ValidNetwork } from "@daohaus/keychain-utils";

export const TARGET_DAO: {
  [key: string]: {
    ADDRESS: string;
    SAFE_ADDRESS: string;
    CHAIN_ID: ValidNetwork;
  };
} = {
  "0x3dea7058a19bf6854bb63384707139636efb99ea": {
    ADDRESS: "0x3dea7058a19bf6854bb63384707139636efb99ea",
    SAFE_ADDRESS: "0x47f327bdde3c92d82872d686bb6d7a994c22b4a5",
    CHAIN_ID: "0x5",
  },
};

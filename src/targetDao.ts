import { ValidNetwork } from "@daohaus/keychain-utils";

export const TARGET_DAO: {
  [key: string]: {
    ADDRESS: string;
    SAFE_ADDRESS: string;
    CHAIN_ID: ValidNetwork;
  };
} = {
  "0x59cd41f7d0c488d2ad95bf378eb0e1833b9a8b7f": {
    ADDRESS: "0x59cd41f7d0c488d2ad95bf378eb0e1833b9a8b7f",
    SAFE_ADDRESS: "0x361371ce476cbace9b1aff7c671620ac705c649c",
    CHAIN_ID: "0x64",
  },
};

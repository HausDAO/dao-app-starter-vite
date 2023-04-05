import { ValidNetwork } from "@daohaus/keychain-utils";

export const TARGET_DAO: {
  [key: string]: {
    ADDRESS: string;
    SAFE_ADDRESS: string;
    CHAIN_ID: ValidNetwork;
  };
} = {
  "0x0c495cb5b5f2313e84c4a1a584ac27f42fd78d29": {
    ADDRESS: "0x0c495cb5b5f2313e84c4a1a584ac27f42fd78d29",
    SAFE_ADDRESS: "0xc0f3a7737cb8338c7fa0de5bc23acb0060d9f642",
    CHAIN_ID: "0x5",
  },
};

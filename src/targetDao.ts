import { ValidNetwork } from "@daohaus/keychain-utils";

export const TARGET_DAO: {
  [key: string]: {
    ADDRESS: string;
    SAFE_ADDRESS: string;
    CHAIN_ID: ValidNetwork;
  };
} = {
  "0xf6538c07324f59b3ba685d86393c65dce9676c70": {
    ADDRESS: "0xf6538c07324f59b3ba685d86393c65dce9676c70",
    SAFE_ADDRESS: "0xb64b12c4e68310fc222580dea1c86d202310f343",
    CHAIN_ID: "0x5",
  },
};

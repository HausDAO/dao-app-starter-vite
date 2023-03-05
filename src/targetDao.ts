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
  "0xf844b98df9ccdfbe5d460d0d7bdca232cf9da923": {
    ADDRESS: "0xf844b98df9ccdfbe5d460d0d7bdca232cf9da923",
    SAFE_ADDRESS: "0xeb0dc703b854791914f30b5a73dd04d8d22a9aff",
    CHAIN_ID: "0x1",
  },
  "0x3dea7058a19bf6854bb63384707139636efb99ea": {
    ADDRESS: "0x3dea7058a19bf6854bb63384707139636efb99ea",
    SAFE_ADDRESS: "0x47f327bdde3c92d82872d686bb6d7a994c22b4a5",
    CHAIN_ID: "0x5",
  },
  "0x052cf3746e2dff16af70bc2184a934dc48d181f7": {
    ADDRESS: "0x052cf3746e2dff16af70bc2184a934dc48d181f7",
    SAFE_ADDRESS: "0x93eac449d9334edc262c2f46f0a694d96f78e6e4",
    CHAIN_ID: "0x5",
  },
};

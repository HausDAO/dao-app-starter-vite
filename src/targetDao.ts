import { ValidNetwork } from "@daohaus/keychain-utils";

export const TARGET_DAO: {
  [key: string]: {
    ADDRESS: string;
    SAFE_ADDRESS: string;
    COOKIEJAR_ADDRESS: string;
    CHAIN_ID: ValidNetwork;
  };
} = {
  "0x59cd41f7d0c488d2ad95bf378eb0e1833b9a8b7f": {
    ADDRESS: "0x59cd41f7d0c488d2ad95bf378eb0e1833b9a8b7f",
    SAFE_ADDRESS: "0x361371ce476cbace9b1aff7c671620ac705c649c",
    COOKIEJAR_ADDRESS: "0xeca82593fe07a2c197f1b701eaae402a0da07707",
    CHAIN_ID: "0x64",
  },
};
// } = {
//   "0x431ff10c6f787ea69cde95ed1528f22c15678ed4": {
//     ADDRESS: "0x431ff10c6f787ea69cde95ed1528f22c15678ed4",
//     SAFE_ADDRESS: "0x49d136293031736942da75223050292528d00e7d",
//     COOKIEJAR_ADDRESS: "0xD255Cb6Ad25d42B40F7BBf1Ae1196b3e72A38937",
//     CHAIN_ID: "0x64",
//   },
// };

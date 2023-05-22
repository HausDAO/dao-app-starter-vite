import { LOCAL_ABI } from "@daohaus/abis";
import { ContractLego } from "@daohaus/utils";
import { CONTRACT_KEYCHAINS } from "@daohaus/keychain-utils";
import COOKIEJAR_ABI from "../abis/cookieJar.json";
import JAR_FACTORY_ABI from "../abis/factoryCookieJar.json";

export const APP_CONTRACT: Record<string, ContractLego> = {
  COOKIEJAR: {
    type: "static",
    contractName: "COOKIEJAR",
    abi: COOKIEJAR_ABI,
    targetAddress: ".cookieAddress",
  },
  POSTER: {
    type: "static",
    contractName: "Poster",
    abi: LOCAL_ABI.POSTER,
    targetAddress: {
      "0x1": "0x000000000000cd17345801aa8147b8d3950260ff",
      "0x5": "0x000000000000cd17345801aa8147b8d3950260ff",
      "0x64": "0x000000000000cd17345801aa8147b8d3950260ff",
    },
  },
  ERC_20: {
    type: "static",
    contractName: "ERC20",
    abi: LOCAL_ABI.ERC20,
    targetAddress: ".tokenAddress",
  },
  ERC_20_FUNDING: {
    type: "static",
    contractName: "ERC20",
    abi: LOCAL_ABI.ERC20,
    targetAddress: ".formValues.paymentTokenAddress",
  },
  CURRENT_DAO: {
    type: "static",
    contractName: "Current DAO (Baal)",
    abi: LOCAL_ABI.BAAL,
    targetAddress: ".daoId",
  },
  TRIBUTE_MINION: {
    type: "static",
    contractName: "Tribute Minion",
    abi: LOCAL_ABI.TRIBUTE_MINION,
    targetAddress: CONTRACT_KEYCHAINS.TRIBUTE_MINION,
  },
  SHARES_ERC20: {
    type: "static",
    contractName: "SHARES_ERC20",
    abi: LOCAL_ABI.SHARES,
    targetAddress: ".dao.sharesAddress",
  },
  LOOT_ERC20: {
    type: "static",
    contractName: "LOOT_ERC20",
    abi: LOCAL_ABI.LOOT,
    targetAddress: ".dao.sharesAddress",
  },
  SUMMON_JAR: {
    type: "static",
    contractName: "SUMMON_JAR",
    abi: JAR_FACTORY_ABI,
    targetAddress: "0x47135bC487036deea0c51bc9A63A6dAA9eA367ee",
  },
};

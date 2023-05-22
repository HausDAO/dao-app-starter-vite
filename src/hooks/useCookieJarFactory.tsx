import { BigNumberish, ContractTransaction } from "ethers";

import COOKIEJAR_FACTORY from "../abis/factoryCookieJar.json";
import { ADDRESSES } from "../utils/config";
import { useDHConnect } from "@daohaus/connect";
import { ethers } from "ethers";

export interface CookieJarInitializer {
  safeTarget: string;
  cookieAmount: BigNumberish;
  periodLength: BigNumberish;
  cookieToken: string;
}

export interface BaalInitializer extends CookieJarInitializer {
  dao: string;
  threshold: BigNumberish;
  useShares: boolean;
  useLoot: boolean;
}

export interface Erc20Initializer extends CookieJarInitializer {
  erc20Addr: string;
  threshold: BigNumberish;
}

export type Initializer =
  | CookieJarInitializer
  | BaalInitializer
  | Erc20Initializer;

interface CookieJarFactory {
  summonCookieJar: (
    details: Details,
    initializer: Initializer
  ) => Promise<ContractTransaction> | undefined;
}

export type Details = {
  type: string;
  name: string;
  description?: string;
};

export const useCookieJarFactory = (): CookieJarFactory => {
  const { provider, chainId } = useDHConnect();
  //TODO - support multiple chains
  const addresses = ADDRESSES[chainId as "0x64"];

  const contract = new ethers.Contract(
    addresses.summonCookieJar,
    COOKIEJAR_FACTORY,
    provider?.getSigner()
  );

  const summonCookieJar = async (
    details: Details,
    initializer: Initializer
  ) => {
    let tx;
    let _details;
    let _initializer;

    console.log("contract", contract);
    if (instanceOfBaalInitializer(initializer)) {
      console.log("Summoning Baal Cookie Jar");
      _details = {
        ...details,
        type: "BAAL",
      };

      _initializer = ethers.utils.defaultAbiCoder.encode(
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
        [
          initializer.safeTarget,
          initializer.periodLength,
          initializer.cookieAmount,
          initializer.cookieToken,
          initializer.dao,
          initializer.threshold,
          initializer.useShares,
          initializer.useLoot,
        ]
      );
    }

    if (instanceOfErc20Initializer(initializer)) {
      console.log("Summoning ERC20 Cookie Jar");

      _details = {
        ...details,
        type: "ERC20",
      };

      _initializer = ethers.utils.defaultAbiCoder.encode(
        ["address", "uint256", "uint256", "address", "address", "uint256"],
        [
          initializer.safeTarget,
          initializer.periodLength,
          initializer.cookieAmount,
          initializer.cookieToken,
          initializer.erc20Addr,
          initializer.threshold,
        ]
      );
    }

    console.log("_details: ", _details);
    console.log("_initializer: ", _initializer);
    console.log("address: ", addresses.erc20CookieJar);

    const detailString = JSON.stringify(_details);

    console.log("detailsString: ", JSON.stringify(_details));

    return contract.summonCookieJar(
      detailString,
      addresses.erc20CookieJar,
      _initializer
    );
  };

  return {
    summonCookieJar,
  };
};

function instanceOfBaalInitializer(
  initializer: Initializer
): initializer is BaalInitializer {
  return (
    "dao" in initializer &&
    "threshold" in initializer &&
    "useShares" in initializer &&
    "useLoot" in initializer
  );
}

function instanceOfErc20Initializer(
  initializer: Initializer
): initializer is Erc20Initializer {
  return "erc20Addr" in initializer && "threshold" in initializer;
}

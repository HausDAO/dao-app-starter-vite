import { useQuery } from "react-query";

import { utils } from "ethers";

import { createContract } from "@daohaus/tx-builder";
import { ValidNetwork, Keychain } from "@daohaus/keychain-utils";
import { nowInSeconds } from "@daohaus/utils";
import  COOKIEJAR_FACTORY  from "../abis/factoryCookieJar.json";
import { TARGET_DAO } from "../targetDao";

const fetchFactoryRecords = async ({
  chainId,
  rpcs,
}: {
  chainId: ValidNetwork;
  rpcs?: Keychain;
}) => {
  const factoryContract = createContract({
    address: TARGET_DAO.COOKIEJAR_FACTORY_ADDRESS,
    abi: COOKIEJAR_FACTORY,
    chainId,
    rpcs,
  });
  console.log("facaddr", TARGET_DAO.COOKIEJAR_FACTORY_ADDRESS);
  

  try {
    const filter = factoryContract.filters.SummonCookieJar();
    const events = await factoryContract.queryFilter(filter);
    console.log('factory events', events)
    return {
      events,
    };
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.message as string);
  }
};

export const useCookieJarFactory = ({
  userAddress,
  chainId,
  rpcs,
}: {
  userAddress: string | undefined | null;
  chainId: ValidNetwork;
  rpcs?: Keychain;
}) => {
  const { data, ...rest } = useQuery(
    ["recordData", { userAddress }],
    () =>
      fetchFactoryRecords({
        chainId,
        rpcs,
      }),
    { enabled: !!userAddress }
  );
  const parsed = data?.events.map((record: any) => {
    const parsedContent = record.args;
    // baal ["address","uint256","uint256","address","address","uint256","bool","bool"],
    // safeaddr, period, amount, token, dao, threshold, useShares, useLoot
        
    const initParams = utils.defaultAbiCoder.decode(
        ["address","uint256","uint256","address"],
        parsedContent.initializer
      )
    const initParamsObj = {
      safe: initParams[0],
      period: initParams[1],
      amount: initParams[2],
      token: initParams[3],
    }
    return {...parsedContent, initParamsObj};
  });



  return {
    records: data,
    parsed,
    ...rest,
  };
};

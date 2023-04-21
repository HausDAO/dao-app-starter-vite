import { useQuery } from "react-query";

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
    address: "0x4e31D58068fcdFA0666D0D9e1B809673aB00c126",
    abi: COOKIEJAR_FACTORY,
    chainId,
    rpcs,
  });

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
    // console.log(parsedContent);
    return parsedContent;
  });

  return {
    records: data,
    parsed,
    ...rest,
  };
};

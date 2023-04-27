import { useQuery } from "react-query";

import { createContract } from "@daohaus/tx-builder";
import { ValidNetwork, Keychain } from "@daohaus/keychain-utils";
import { nowInSeconds } from "@daohaus/utils";
import { LOCAL_ABI } from "@daohaus/abis";
import { TARGET_DAO } from "../targetDao";

const fetchPosterRecords = async ({
  userAddress,
  chainId,
  rpcs,
}: {
  userAddress: string;
  chainId: ValidNetwork;
  rpcs?: Keychain;
}) => {
  const posterContract = createContract({
    address: "0x000000000000cd17345801aa8147b8d3950260ff",
    abi: LOCAL_ABI.POSTER,
    chainId,
    rpcs,
  });

  try {
    const filter = posterContract.filters.NewPost(
      TARGET_DAO[import.meta.env.VITE_TARGET_KEY].COOKIEJAR_ADDRESS
    );
    const events = await posterContract.queryFilter(filter);
    return {
      events,
    };
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.message as string);
  }
};

export const usePoster = ({
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
      fetchPosterRecords({
        userAddress: userAddress as string,
        chainId,
        rpcs,
      }),
    { enabled: !!userAddress }
  );
  const parsed = data?.events.map((record: any) => {
    return JSON.parse(record.args[1]);
  });

  const addCount = parsed?.map((record: any) => {
    const count = parsed.filter((parsed) => record.user === parsed.user).length
    return {user: record.user, count};
  });
  
  const leaderBoard = addCount?.filter((v,i,a)=>a.findIndex(v2=>(v2.user===v.user))===i).sort((a,b) => b.count - a.count);

  return {
    records: data,
    parsed,
    leaderBoard,
    ...rest,
  };
};

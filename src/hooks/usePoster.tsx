import { useQuery } from "react-query";

import { createContract } from "@daohaus/tx-builder";
import { ValidNetwork, Keychain } from "@daohaus/keychain-utils";
import { nowInSeconds } from "@daohaus/utils";
import { LOCAL_ABI } from "@daohaus/abis";
import { TARGET_DAO } from "../targetDao";

const fetchPosterRecords = async ({
  userAddress,
  cookieAddress,
  chainId,
  rpcs,
}: {
  userAddress: string;
  cookieAddress: string;
  chainId: ValidNetwork;
  rpcs?: Keychain;
}) => {
  if (!cookieAddress || !chainId) {
    throw new Error("No cookie jar address provided");
  }
  const posterContract = createContract({
    address: "0x000000000000cd17345801aa8147b8d3950260ff",
    abi: LOCAL_ABI.POSTER,
    chainId,
    rpcs,
  });

  try {
    // Query the contract for new post events
    const filter = posterContract.filters.NewPost(
      cookieAddress
    );
    const events = await posterContract.queryFilter(filter);
    // Return the events as an object
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
  cookieAddress,
  chainId,
  rpcs,
}: {
  userAddress: string | undefined | null;
  cookieAddress: string | undefined | null;
  chainId: ValidNetwork;
  rpcs?: Keychain;
}) => {

  const { data, ...rest } = useQuery(
    ["recordData", { userAddress }],
    () =>
      fetchPosterRecords({
        userAddress: userAddress as string,
        cookieAddress: cookieAddress as string,
        chainId,
        rpcs,
      }),
    { enabled: !!userAddress }
  );
  console.log('data', data);
  

  // Parse the events data and extract the relevant information
  const parsed = data?.events.map((record: any) => {

    return JSON.parse(record.args[1])

  });

  // Group the parsed records by user and count the number of records for each user
  const addCount = parsed?.map((record: any) => {
    const count = parsed.filter((parsed) => record.user === parsed.user).length;
    return { user: record.user, count };
  });

  // Sort the addCount array by count and filter out duplicate user entries
  const leaderBoard = addCount
    ?.filter((v, i, a) => a.findIndex((v2) => v2.user === v.user) === i)
    .sort((a, b) => b.count - a.count);

  return {
    records: data,
    parsed: parsed?.reverse(),
    leaderBoard,
    ...rest,
  };
};

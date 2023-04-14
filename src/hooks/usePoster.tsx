import { useQuery } from 'react-query';

import { createContract } from '@daohaus/tx-builder';
import { ValidNetwork, Keychain } from '@daohaus/keychain-utils';
import { nowInSeconds } from '@daohaus/utils';
import { LOCAL_ABI } from "@daohaus/abis";

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
    
    const filter = posterContract.filters.NewPost("0xeca82593fe07a2c197f1b701eaae402a0da07707");
    const events = await posterContract.queryFilter(filter);
    return {
        events
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
    ['recordData', { userAddress }],
    () =>
      fetchPosterRecords({
        userAddress: userAddress as string,
        chainId,
        rpcs,
      }),
    { enabled: !!userAddress }
  );
  const parsed = data?.events.map((record: any) => {
    const parsedContent= JSON.parse(record.args[1])
    // console.log(parsedContent);
    return parsedContent
}
    );

  return { 
    records: data, 
    parsed,
    ...rest };
};

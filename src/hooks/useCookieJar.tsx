import { useQuery } from 'react-query';

import { createContract } from '@daohaus/tx-builder';
import { ValidNetwork, Keychain } from '@daohaus/keychain-utils';
import { nowInSeconds } from '@daohaus/utils';

import CookieJarAbi from '../abis/cookieJar.json';

const fetchUserClaim = async ({
  cookieJarAddress,
  userAddress,
  chainId,
  rpcs,
}: {
  cookieJarAddress: string;
  userAddress: string;
  chainId: ValidNetwork;
  rpcs?: Keychain;
}) => {
  const claimsContract = createContract({
    address: cookieJarAddress,
    abi: CookieJarAbi,
    chainId,
    rpcs,
  });

  try {
    const lastClaimed = await claimsContract.claims(userAddress);
    const claimAmt = await claimsContract.cookieAmount();
    const claimPeriod = await claimsContract.periodLength();
    const cookieToken = await claimsContract.cookieToken();
    
    //const canClaim = await claimsContract.canClaim(userAddress);

    return {
      lastClaimed: lastClaimed.toString() as string,
      claimAmt: claimAmt.toString() as string,
      claimPeriod: claimPeriod.toString() as string,
      cookieToken: cookieToken.toString() as string,
      // canClaim: canClaim
    };
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.message as string);
  }
};

export const useClaim = ({
  cookieJarAddress,
  userAddress,
  chainId,
  rpcs,
}: {
  cookieJarAddress: string;
  userAddress: string | undefined | null;
  chainId: ValidNetwork;
  rpcs?: Keychain;
}) => {
  const { data, ...rest } = useQuery(
    ['claimData', { userAddress }],
    () =>
      fetchUserClaim({
        cookieJarAddress,
        userAddress: userAddress as string,
        chainId,
        rpcs,
      }),
    { enabled: !!userAddress }
  );
  const hasClaimed = data?.lastClaimed && Number(data.lastClaimed) > 0;
  const canClaim =
  nowInSeconds() - Number(data?.lastClaimed) >= Number(data?.claimPeriod) ||
    !hasClaimed;
  // const isMember = data?.canClaim;
  return { 
    data, 
    hasClaimed, 
    canClaim, 
    // isMember,
    ...rest };
};
import { useQuery } from 'react-query';

import { createContract } from '@daohaus/tx-builder';
import { ValidNetwork, Keychain } from '@daohaus/keychain-utils';
import { nowInSeconds } from '@daohaus/utils';

import CookieJarAbi from '../abis/cookieJar.json';

// fetch user cookie claim data from the blockchain
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
    const lastClaimed = await claimsContract.claims(userAddress); // get last claimed timestamp for user
    const claimAmt = await claimsContract.cookieAmount(); // get amount of cookie token to claim
    const claimPeriod = await claimsContract.periodLength(); // get the period length for claims
    const cookieToken = await claimsContract.cookieToken(); // get the cookie token address
    
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

// custom hook to fetch and return user claim data
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
  // determine if user has claimed cookies before
  const hasClaimed = data?.lastClaimed && Number(data.lastClaimed) > 0;
  // determine if user can claim based on last claim time and claim period
  const canClaim =
  nowInSeconds() - Number(data?.lastClaimed) >= Number(data?.claimPeriod) ||
    !hasClaimed;
  // const isMember = data?.canClaim;

  // return user claim data along with helper variables and the query status
  return { 
    data, 
    hasClaimed, 
    canClaim, 
    // isMember,
    ...rest };
};

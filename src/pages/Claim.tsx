import { useDHConnect } from '@daohaus/connect';
import { Input, Spinner } from '@daohaus/ui';

import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

import { useClaim } from '../hooks/useCookieJar';
import { DisplayClaim } from '../components/DisplayClaim';
import { Countdown } from '../components/Countdown';
import { ClaimDetails } from '../components/DetailsBox';
import { ClaimButton } from '../components/ClaimButton';
import { useState } from 'react';
import { useRecords } from '@daohaus/moloch-v3-hooks';
import { TARGET_DAO } from '../targetDao';
import { useCookieReason } from '../hooks/useCookieReason';

export const Claims = () => {
  const { address, chainId } = useDHConnect();
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  const { records } = useCookieReason({
    daoId: TARGET_DAO[import.meta.env.VITE_TARGET_KEY].ADDRESS,
    chainId: TARGET_DAO[import.meta.env.VITE_TARGET_KEY].CHAIN_ID,
    recordType: "reason",
  });

  console.log("cookie reason records", records);
  
  
//   const { isIdle, isLoading, error, data, hasClaimed, canClaim, isMember, refetch } =
  const { isIdle, isLoading, error, data, hasClaimed, canClaim, refetch } =
    useClaim({
      cookieJarAddress: '0xeca82593fe07a2c197f1b701eaae402a0da07707',
      userAddress: address,
      chainId: '0x64',
    });

  const isGnosis = chainId === '0x64';

  if (isIdle)
    return (
      <DisplayClaim
        heading="Connect Your Wallet"
        description="You need to connect your wallet in order to see if you are eligable for a claim"
      />
    );
  if (!isGnosis) {
    return (
      <DisplayClaim
        heading="Connect to Gnosis Chain"
        description="Free Ryder DAO is only on Gnosis Chain."
      />
    );
  }

  if (isLoading)
    return (
      <DisplayClaim
        heading="Loading Claim Data"
        description="Please wait while we load your claim data"
        element={<Spinner size="12rem" />}
      />
    );
  if (error)
    return (
      <DisplayClaim
        heading="Error"
        description={'Error fetching claim data from network RPC'}
      />
    );
//   if (!isMember)
//     return (
//       <DisplayClaim
//         heading="You must be a member"
//         description={'Your are not a member or do not have enough cookie to meet the claim threshold.'}
//       />
//     );
  // Has Claimed, but needs to wait for the next claim period
  if (data && hasClaimed && !canClaim)
    return (
      <DisplayClaim
        heading="Time until next claim period."
        description="You have already claimed your cookie. You will be able to claim again in the next claim period."
        element={
          <>
          {showConfetti && <Confetti width={width} height={height} gravity={.05} recycle={false} onConfettiComplete={()=>setShowConfetti(false)} />}
            <Countdown
              claimPeriod={data.claimPeriod}
              lastClaimed={data.lastClaimed}
            />
            <ClaimDetails
              claimAmt={data.claimAmt}
              claimPeriod={data.claimPeriod}
              unit={'xDai'}
            />
          </>
        }
      />
    );
  // Has not claimed
  if (data && !hasClaimed)
    return (
      <DisplayClaim
        heading="It's time to claim your cookie!"
        description="You have not claimed your cookie yet. Claiming your cookie will allow you to participate in the DAO."
        element={
          <>
            <ClaimDetails
              claimAmt={data.claimAmt}
              claimPeriod={data.claimPeriod}
              unit={'xDai'}
            />
            <Input
              id="cookieReason"
              full
              placeholder="Reason for claiming"
            />
            <Input
              id="cookieLink"
              full
              placeholder="Link"
            />
            <ClaimButton reason="test" link="testlink" onSuccess={() => {refetch(); setShowConfetti(true);}} />
          </>
        }
      />
    );
  if (data && canClaim)
    return (
      <DisplayClaim
        heading="It's time to claim your cookie!"
        description="You have not claimed your cookie yet. Claiming your cookie will allow you to participate in the DAO."
        element={
          <>
            

            <ClaimDetails
              claimAmt={data.claimAmt}
              claimPeriod={data.claimPeriod}
              unit={'xDai'}
            />
            <Input
              id="cookieReason"
              full
              placeholder="Reason for claiming"
            />
            <Input
              id="cookieLink"
              full
              placeholder="Link"
            />
            <ClaimButton reason="yum yum" link="https://daohaus.club/" onSuccess={() => {refetch(); setShowConfetti(true);}} />
          </>
        }
      />
    );

  return null;
};

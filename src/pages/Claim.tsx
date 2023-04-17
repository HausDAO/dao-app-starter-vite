import { useDHConnect } from "@daohaus/connect";
import { Input, Label, Spinner } from "@daohaus/ui";

import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

import { useClaim } from "../hooks/useCookieJar";
import { DisplayClaim } from "../components/DisplayClaim";
import { Countdown } from "../components/Countdown";
import { ClaimDetails } from "../components/DetailsBox";
import { ClaimButton } from "../components/ClaimButton";
import { useState } from "react";
import { TARGET_DAO } from "../targetDao";

export const Claims = () => {
  const { address, chainId } = useDHConnect();
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  const [reason, setReason] = useState<string>("");
  const [link, setLink] = useState<string>("");

  //   const { isIdle, isLoading, error, data, hasClaimed, canClaim, isMember, refetch } =
  const { isIdle, isLoading, error, data, hasClaimed, canClaim, refetch } =
    useClaim({
      cookieJarAddress:
        TARGET_DAO[import.meta.env.VITE_TARGET_KEY].COOKIEJAR_ADDRESS,
      userAddress: address,
      chainId: TARGET_DAO[import.meta.env.VITE_TARGET_KEY].CHAIN_ID,
    });

  const isGnosis =
    chainId === TARGET_DAO[import.meta.env.VITE_TARGET_KEY].CHAIN_ID;

  const handleReasonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReason(e.target.value);
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };

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
        description={"Error fetching claim data from network RPC"}
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
            {showConfetti && (
              <Confetti
                width={width}
                height={height}
                gravity={0.05}
                recycle={false}
                onConfettiComplete={() => setShowConfetti(false)}
              />
            )}
            <Countdown
              claimPeriod={data.claimPeriod}
              lastClaimed={data.lastClaimed}
            />
            <ClaimDetails
              claimAmt={data.claimAmt}
              claimPeriod={data.claimPeriod}
              unit={"xDai"}
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
              unit={"xDai"}
            />
            <Input
              id="cookieReason"
              full
              onChange={handleReasonChange}
              value={reason}
              placeholder="Reason for claiming from cookie jar"
            />
            <Input
              id="cookieLink"
              full
              onChange={handleLinkChange}
              value={link}
              placeholder="Link"
            />
            <ClaimButton
              reason={reason}
              link={link}
              user={address}
              onSuccess={() => {
                refetch();
                setShowConfetti(true);
              }}
            />
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
              unit={"xDai"}
            />
            <div className="input-box">
              <Label>Reason for claiming</Label>
              <Input
              id="cookieReason"
              full
              onChange={handleReasonChange}
              value={reason}
              placeholder="Reason for claiming from cookie jar"
            />
              <Label>Link to details</Label>
              
            <Input
              id="cookieLink"
              full
              onChange={handleLinkChange}
              value={link}
              placeholder="Link"
            />
            </div>
            <ClaimButton
              reason={reason}
              link={link}
              user={address}
              onSuccess={() => {
                refetch();
                setShowConfetti(true);
              }}
            />
          </>
        }
      />
    );

  return null;
};

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
            {showConfetti  && (
                <Confetti
                  width={width}
                  height={height}
                  gravity={0.05}
                  recycle={false}
                  numberOfPieces={100}
                  tweenDuration={20000}
                  colors={[
                    "#f5deb3",
                    "#e6c281",
                    "#8a6015",
                    "#f44336",
                    "#e91e63",
                    "#9c27b0",
                    "#673ab7",
                    "#3f51b5",
                    "#2196f3",
                    "#03a9f4",
                    "#00bcd4",
                    "#009688",
                    "#4CAF50",
                    "#8BC34A",
                    "#CDDC39",
                    "#FFEB3B",
                    "#FFC107",
                    "#FF9800",
                    "#FF5722",
                    "#795548",
                  ]}
                  onConfettiComplete={() => setShowConfetti(false)}
                  drawShape={(ctx) => {
                    // Draw the cookie
                    ctx.beginPath();
                    // ctx.fillStyle = '#f5deb3';
                    ctx.arc(40, 40, 32, 0, 2 * Math.PI);
                    ctx.fill();

                    // Draw the chocolate chips
                    const numChips = 15;

                    for (let i = 0; i < numChips; i++) {
                      let randomSize = Math.floor(Math.random() * 2.4) + 1.6;
                      let chipSize = randomSize;
                      let chipX =
                        Math.floor(Math.random() * (80 - chipSize * 2)) +
                        chipSize;
                      let chipY =
                        Math.floor(Math.random() * (80 - chipSize * 2)) +
                        chipSize;

                      // Check if the chip is inside the cookie
                      let dX = chipX - 40;
                      let dY = chipY - 40;
                      let distance = Math.sqrt(dX * dX + dY * dY);
                      if (distance + chipSize <= 32) {
                        // The chip is inside the cookie, so draw it
                        ctx.beginPath();
                        ctx.fillStyle = "#8b4513";
                        ctx.arc(chipX, chipY, chipSize, 0, 2 * Math.PI);
                        ctx.fill();
                      }
                    }
                  }}
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
        heading="Go ahead, reach in and grab a cookie!"
        description="You have not claimed your daily cookie yet. Claiming a cookie will send funds direct to you from the jar."
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
                placeholder="Link to PR / Issue / hackmd /etc."
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
  if (data && canClaim)
    return (
      <DisplayClaim
        heading="Go ahead, reach in and grab a cookie!"
        description="You have not claimed your daily cookie yet. Claiming a cookie will send funds direct to you from the jar."
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
                placeholder="Link to PR / Issue / hackmd /etc."
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

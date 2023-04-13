import { useState } from "react";

import { Button, ParMd } from "@daohaus/ui";
import { useTxBuilder } from "@daohaus/tx-builder";

import { APP_TX } from "../legos/tx";
import { TARGET_DAO } from "../targetDao";
import { TXLego } from "@daohaus/utils";

export enum StatusMsg {
  Compile = "Compiling Transaction Data",
  Request = "Requesting Signature",
  Await = "Transaction Submitted",
  TxErr = "Transaction Error",
  TxSuccess = "Transaction Success",
  PollStart = "Syncing TX (Subgraph)",
  PollSuccess = "Success: TX Confirmed!",
  PollError = "Sync Error (Subgraph)",
}

export const ClaimButton = ({
  onError,
  onSuccess,
  reason,
  link,
}: {
  onError?: () => void;
  onSuccess?: () => void;
  reason: string;
  link: string;
}) => {
  const { fireTransaction } = useTxBuilder();
  const [txStatus, setTxStatus] = useState<StatusMsg | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    fireTransaction({
      tx: APP_TX.COOKIEJAR,
      staticArgs: ["test"],
      //     `{"daoId":"${
      //     TARGET_DAO[import.meta.env.VITE_TARGET_KEY].ADDRESS
      //   }","table":"reason","queryType":"list","title":"to eat a cookie","description":"${reason}","link":"${link}"}`,

      lifeCycleFns: {
        onRequestSign() {
          setTxStatus(StatusMsg.Request);
        },
        onTxHash() {
          setTxStatus(StatusMsg.Await);
        },
        onTxError() {
          setTxStatus(StatusMsg.TxErr);
          onError?.();
          setIsLoading(false);
        },
        onTxSuccess() {
          setTxStatus(StatusMsg.TxSuccess);
          onSuccess?.();
          setIsLoading(false);
        },
        // onPollStart() {
        //   setTxStatus(StatusMsg.PollStart);
        // },
        // onPollError() {
        //   setTxStatus(StatusMsg.PollError);
        //   onError?.();
        //   setIsLoading(false);
        // },
        // onPollSuccess() {
        //   setTxStatus(StatusMsg.PollSuccess);
        //   onSuccess?.();
        //   setIsLoading(false);
        // },
      },
    });
  };

  return (
    <>
      <Button
        size="lg"
        onClick={handleClick}
        style={{ marginTop: "2rem", marginBottom: "2rem" }}
        disabled={isLoading}
      >
        Claim Shares
      </Button>
      <ParMd>{txStatus}</ParMd>
    </>
  );
};

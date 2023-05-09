import styled from "styled-components";
import { FieldValues } from "react-hook-form";
import { ethers } from "ethers";

import { H2, Link, ParMd, SingleColumnLayout, useToast } from "@daohaus/ui";
import { FormBuilder, StatusMsg } from "@daohaus/form-builder";
import { APP_FORM } from "../legos/forms";
import { TARGET_DAO } from "../targetDao";
import { AppFieldLookup } from "../legos/fieldConfig";
import { useState } from "react";
import { useTxBuilder } from "@daohaus/tx-builder";
import { handleErrorMessage } from "@daohaus/utils";
import { APP_CONTRACT } from "../legos/contract";
import { useDHConnect } from "@daohaus/connect";
import { assembleTxArgs } from "../utils/summonHelpers";
import { SummonerForm } from "../components/SummonerForm";
import { SummonerLoading } from "../components/SummonerLoading";
import { SummonerSuccess } from "../components/SummonerSuccess";
import { SummonError } from "../components/SummonerError";

const LinkBox = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-between;
`;
export type SummonStates = "idle" | "loading" | "success" | "error";
export const Home = () => {
  const { provider, chainId } = useDHConnect();

  const [summonState, setSummonState] = useState<SummonStates>("idle");
  const [txHash, setTxHash] = useState<string>("");
  const [daoAddress, setDaoAddress] = useState<string>("");
  const [tokenAddress, setTokenAddress] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("");

  return (
    <SingleColumnLayout>
      {summonState === "idle" && (
        <SummonerForm
          setSummonState={setSummonState}
          setTxHash={setTxHash}
          setDaoAddress={setDaoAddress}
          setTokenAddress={setTokenAddress}
          setErrMsg={setErrMsg}
        />
      )}
      {summonState === "loading" && <SummonerLoading txHash={txHash} />}
      {summonState === "success" && (
        <SummonerSuccess
          chainId={chainId}
          daoAddress={daoAddress}
          tokenAddress={tokenAddress}
          setSummonState={setSummonState}
        />
      )}
      {summonState === "error" && (
        <SummonError
          errMsg={errMsg}
          setSummonState={setSummonState}
          daoAddress={daoAddress}
        />
      )}
    </SingleColumnLayout>
  );
};

import styled from "styled-components";
import { FieldValues } from 'react-hook-form';

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

const LinkBox = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-between;
`;

export const Home = () => {
  const { fireTransaction } = useTxBuilder();
  const { provider, address } = useDHConnect();
  const { defaultToast, errorToast, successToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<null | StatusMsg>(null);
  const [txHash, setTxHash] = useState<null | string>(null);

  
  const handleSubmit = async (formValues: FieldValues) => {
    {
      {
        setIsLoading(true);
        setTxHash(null);
        setStatus(StatusMsg.Compile);

        const args =  assembleTxArgs(formValues, TARGET_DAO.CHAIN_ID, address, TARGET_DAO.SQUAD);
        const executed = await fireTransaction({
          tx: {
            id: 'SUMMON',
            contract: APP_CONTRACT.BAALSUMMONER,
            method: 'summonBaalFromReferrer',
            staticArgs: args
          },
          lifeCycleFns: {
            onRequestSign() {
              setStatus(StatusMsg.Request);
            },
            onTxHash(txHash) {
              setTxHash(txHash);
              setStatus(StatusMsg.Await);
            },
            onTxError(error) {
              setStatus(StatusMsg.TxErr);
              const errMsg = handleErrorMessage({
                error,
                fallback: 'Could not decode error message',
              });
              setIsLoading(false);
              errorToast({ title: StatusMsg.TxErr, description: errMsg });
            },
            onTxSuccess(...args) {
              setStatus(
                StatusMsg.TxSuccess
              );
              defaultToast({
                title: StatusMsg.TxSuccess,
                description: 'Transaction cycle complete.',
              });
            },
          },
        });
        if (executed === undefined) {
          setStatus(StatusMsg.NoContext);
          return;
        }
        return executed;
        }}
  }

  return (
    <SingleColumnLayout>
      <FormBuilder
      form={APP_FORM.SUMMON}
      targetNetwork={TARGET_DAO.CHAIN_ID}
      customFields={AppFieldLookup }
      
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    />
      <LinkBox style={{"marginTop": "2em"}}>
        <Link href="https://github.com/HausDAO/monorepo">Github</Link>
        <Link href="https://admin.daohaus.fun/">Admin</Link>
      </LinkBox>
    </SingleColumnLayout>
  );
};

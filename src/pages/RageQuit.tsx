import { useMemo } from "react";
import { useParams } from "react-router-dom";

import { FormBuilder } from "@daohaus/form-builder";
import { NETWORK_TOKEN_ETH_ADDRESS, TokenBalance } from "@daohaus/utils";
import { sortTokensForRageQuit } from "@daohaus/moloch-v3-fields";
import { COMMON_FORMS } from "@daohaus/moloch-v3-legos";
import { MolochFields } from "@daohaus/moloch-v3-fields";
import { useConnectedMember, useDaoData } from "@daohaus/moloch-v3-hooks";
import { useDHConnect } from "@daohaus/connect";

export function RageQuit() {
  const { daoid, daochain } = useParams();
  const { dao, refetch } = useDaoData();

  const { address } = useDHConnect();
  const { connectedMember } = useConnectedMember({
    daoChain: daochain as string,
    daoId: daoid as string,
    memberAddress: address as string,
  });

  const defaultFields = useMemo(() => {
    if (connectedMember && dao) {
      const treasury = dao.vaults.find(
        (v) => dao.safeAddress === v.safeAddress
      );

      return {
        to: connectedMember.memberAddress,
        tokens:
          treasury &&
          sortTokensForRageQuit(
            treasury.tokenBalances
              .filter((token: TokenBalance) => Number(token.balance) > 0)
              .map(
                (token: TokenBalance) =>
                  token.tokenAddress || NETWORK_TOKEN_ETH_ADDRESS
              )
          ),
      };
    }
  }, [connectedMember, dao]);

  const onFormComplete = () => {
    refetch?.();
  };

  if (!dao || !connectedMember) {
    return null;
  }

  return (
    <FormBuilder
      defaultValues={defaultFields}
      form={{ ...COMMON_FORMS.RAGEQUIT, log: true, devtool: true }}
      customFields={MolochFields}
      lifeCycleFns={{
        onPollSuccess: () => {
          onFormComplete();
        },
      }}
      targetNetwork={daochain}
    />
  );
}

export default RageQuit;

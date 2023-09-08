import { useMemo } from "react";

import { FormBuilder } from "@daohaus/form-builder";
import { NETWORK_TOKEN_ETH_ADDRESS, TokenBalance } from "@daohaus/utils";
import { COMMON_FORMS } from "@daohaus/moloch-v3-legos";
import { sortTokensForRageQuit } from "@daohaus/moloch-v3-fields";

import { AppFieldLookup } from "../legos/legoConfig";
import {
  useCurrentDao,
  useDaoData,
  useDaoMember,
  useDaoMembers,
} from "@daohaus/moloch-v3-hooks";
import { useDHConnect } from "@daohaus/connect";

export function RageQuit() {
  const { dao, refetch } = useDaoData();
  const { daoId, daoChain } = useCurrentDao();
  const { address } = useDHConnect();
  const { member: connectedMember, refetch: refetchMember } = useDaoMember({
    memberAddress: address,
    // @ts-expect-error: need to fix in hooks package
    daoId,
    // @ts-expect-error: need to fix in hooks package
    daoChain,
  });

  const { refetch: refetchMembers } = useDaoMembers();

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
    refetchMember?.();
    refetchMembers?.();
  };

  if (!dao || !connectedMember) {
    return null;
  }

  return (
    <FormBuilder
      defaultValues={defaultFields}
      form={{ ...COMMON_FORMS.RAGEQUIT, log: true, devtool: true }}
      customFields={AppFieldLookup}
      lifeCycleFns={{
        onPollSuccess: () => {
          onFormComplete();
        },
      }}
      targetNetwork={daoChain}
    />
  );
}

export default RageQuit;

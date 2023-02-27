import React from "react";
import { useCurrentDao, useDaoData } from "@daohaus/moloch-v3-hooks";
import { SingleColumnLayout } from "@daohaus/ui";
import { SafesList } from "@daohaus/moloch-v3-macro-ui";

export const Safes = () => {
  const { daoChain } = useCurrentDao();
  const { dao } = useDaoData();

  return (
    <SingleColumnLayout>
      {dao && daoChain && (
        <SafesList daoChain={daoChain} daoId={dao.id} includeLinks={true} />
      )}
    </SingleColumnLayout>
  );
};

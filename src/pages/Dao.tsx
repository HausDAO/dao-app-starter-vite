import { useDaoData } from "@daohaus/moloch-v3-hooks";
import { DaoOverview } from "@daohaus/moloch-v3-macro-ui";
import { H2, ParMd, SingleColumnLayout, Link } from "@daohaus/ui";

import { TARGET_DAO } from "../targetDao";

export function Dao() {
  const { dao } = useDaoData({
    daoId: TARGET_DAO[import.meta.env.VITE_TARGET_KEY].ADDRESS,
    daoChain: TARGET_DAO[import.meta.env.VITE_TARGET_KEY].CHAIN_ID,
  });

  return (
    <SingleColumnLayout>
      {dao && (
        <DaoOverview
          daoChain={TARGET_DAO[import.meta.env.VITE_TARGET_KEY].CHAIN_ID}
          daoId={dao.id}
        />
      )}
    </SingleColumnLayout>
  );
}

export default Dao;

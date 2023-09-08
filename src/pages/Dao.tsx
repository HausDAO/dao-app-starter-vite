import { useCurrentDao } from "@daohaus/moloch-v3-hooks";
import { DaoOverview } from "@daohaus/moloch-v3-macro-ui";
import { SingleColumnLayout } from "@daohaus/ui";

export function Dao() {
  const { daoChain, daoId } = useCurrentDao();

  return (
    <SingleColumnLayout>
      {daoId && daoChain && <DaoOverview daoChain={daoChain} daoId={daoId} />}
    </SingleColumnLayout>
  );
}

export default Dao;

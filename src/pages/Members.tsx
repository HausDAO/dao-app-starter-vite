import { useCurrentDao } from "@daohaus/moloch-v3-hooks";
import { MemberList } from "@daohaus/moloch-v3-macro-ui";
import {
  SingleColumnLayout,
  Spinner,
  useBreakpoint,
  widthQuery,
} from "@daohaus/ui";

export const Members = () => {
  const { daoChain, daoId } = useCurrentDao();
  const isMd = useBreakpoint(widthQuery.md);

  return (
    <SingleColumnLayout title="Members">
      {!daoChain || !daoId ? (
        <Spinner size={isMd ? "8rem" : "16rem"} padding="6rem" />
      ) : (
        <MemberList daoChain={daoChain} daoId={daoId} />
      )}
    </SingleColumnLayout>
  );
};

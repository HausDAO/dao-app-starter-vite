import { useCurrentDao } from "@daohaus/moloch-v3-hooks";
import { MemberList } from "@daohaus/moloch-v3-macro-ui";
import {
  SingleColumnLayout,
  Loading,
  useBreakpoint,
  widthQuery,
} from "@daohaus/ui";

export const Members = () => {
  const { daoChain, daoId } = useCurrentDao();
  const isMd = useBreakpoint(widthQuery.md);

  return (
    <SingleColumnLayout title="Members">
      {!daoChain || !daoId ? (
        <Loading size={isMd ? 8 : 16} padding="6rem" />
      ) : (
        <MemberList
          daoChain={daoChain}
          daoId={daoId}
          allowLinks={true}
          allowMemberMenu={true}
        />
      )}
    </SingleColumnLayout>
  );
};

import { useCurrentDao } from "@daohaus/moloch-v3-hooks";
import { MemberList } from "@daohaus/moloch-v3-macro-ui";
import {
  Link,
  SingleColumnLayout,
  Spinner,
  useBreakpoint,
  widthQuery,
} from "@daohaus/ui";
import { TARGET_DAO } from "../targetDao";

export const Members = () => {
  const { daoChain, daoId } = useCurrentDao();
  const isMd = useBreakpoint(widthQuery.md);

  return (
    <SingleColumnLayout title="Members">
      {!daoChain || !daoId ? (
        <Spinner size={isMd ? "8rem" : "16rem"} padding="6rem" />
      ) : (
        <>
          <Link
            href={`https://admin.daohaus.fun/#/molochv3/${
              TARGET_DAO.CHAIN_ID
            }/${TARGET_DAO.ADDRESS}`}
            style={{ marginBottom: "2rem" }}
          >
            View Full DAO admin
          </Link>

          <MemberList daoChain={daoChain} daoId={daoId} />
        </>
      )}
    </SingleColumnLayout>
  );
};

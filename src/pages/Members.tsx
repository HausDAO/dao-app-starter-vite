import { useDaoMembers } from "@daohaus/moloch-v3-hooks";
import { Button, ParSm, SingleColumnLayout } from "@daohaus/ui";
import { StyledRouterLink } from "../components/Layout";

export const Members = () => {
  const { members, fetchNextPage, hasNextPage } = useDaoMembers();

  return (
    <SingleColumnLayout>
      {members?.map((member) => {
        return (
          <StyledRouterLink
            key={member?.memberAddress}
            to={`/members/${member?.memberAddress}`}
          >
            <ParSm>{member?.memberAddress}</ParSm>
          </StyledRouterLink>
        );
      })}

      <Button onClick={() => fetchNextPage()} disabled={!hasNextPage} size="sm">
        More
      </Button>
    </SingleColumnLayout>
  );
};

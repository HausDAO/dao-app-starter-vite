import { useDaoProposals } from "@daohaus/moloch-v3-hooks";
import { Button, ParSm, SingleColumnLayout } from "@daohaus/ui";
import { StyledRouterLink } from "../components/Layout";

export const Proposals = () => {
  const { proposals, fetchNextPage, hasNextPage } = useDaoProposals();

  return (
    <SingleColumnLayout>
      {proposals?.map((proposal) => {
        return (
          <StyledRouterLink
            key={proposal.proposalId}
            to={`/proposals/${proposal.proposalId}`}
          >
            <ParSm>{proposal?.title}</ParSm>
          </StyledRouterLink>
        );
      })}

      <Button onClick={() => fetchNextPage()} disabled={!hasNextPage} size="sm">
        More
      </Button>
    </SingleColumnLayout>
  );
};

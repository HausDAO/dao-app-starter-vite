import { useCurrentDao, useDaoProposal } from "@daohaus/moloch-v3-hooks";
import { ParLg, SingleColumnLayout } from "@daohaus/ui";
import { ProposalHistory } from "@daohaus/moloch-v3-macro-ui";

export const Proposal = () => {
  const { daoChain, daoId } = useCurrentDao();
  const { proposal } = useDaoProposal();

  return (
    <SingleColumnLayout>
      <ParLg>{proposal?.title}</ParLg>

      {daoChain && daoId && proposal && (
        <div>
          <ProposalHistory
            proposalId={proposal.proposalId}
            daoChain={daoChain}
            daoId={daoId}
            includeLinks={true}
          />
        </div>
      )}
    </SingleColumnLayout>
  );
};

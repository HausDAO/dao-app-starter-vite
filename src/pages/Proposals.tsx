import { BsPlusLg } from "react-icons/bs";

import { ProposalList } from "@daohaus/moloch-v3-macro-ui";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  SingleColumnLayout,
} from "@daohaus/ui";
import { NewProposalList } from "../components/NewProposalList";
import { prepareProposals } from "../utils/formHelpers";
import {
  BASIC_PROPOSAL_FORMS_APP,
  ADVANCED_PROPOSAL_FORMS_APP,
} from "../legos/legoConfig";

export const Proposals = () => {
  const basicProposals = prepareProposals(BASIC_PROPOSAL_FORMS_APP);
  const advancedProposals = prepareProposals(ADVANCED_PROPOSAL_FORMS_APP);

  return (
    <SingleColumnLayout>
      <ProposalList
        header="Proposals"
        allowLinks={true}
        rightActionEl={
          <Dialog>
            <DialogTrigger asChild>
              <Button IconLeft={BsPlusLg}>New Proposal</Button>
            </DialogTrigger>
            <DialogContent title="Choose Proposal Type">
              <NewProposalList
                basicProposals={basicProposals}
                advancedProposals={advancedProposals}
              />
            </DialogContent>
          </Dialog>
        }
      />
    </SingleColumnLayout>
  );
};

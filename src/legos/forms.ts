import { FormLego } from "@daohaus/form-builder";
import { APP_FIELD } from "./fields";
import { APP_TX } from "./tx";

export const APP_FORM: Record<string, FormLego> = {
  SIGNAL: {
    id: "SIGNAL",
    title: "Signal Form",
    subtitle: "Signal Proposal",
    description: "Ratify on-chain using a DAO proposal.",
    requiredFields: { title: true, description: true },
    log: true,
    tx: APP_TX.POST_SIGNAL,
    fields: [
      APP_FIELD.TITLE,
      APP_FIELD.DESCRIPTION,
      APP_FIELD.LINK,
      // ...PROPOSAL_SETTINGS_FIELDS,
    ],
  },
};

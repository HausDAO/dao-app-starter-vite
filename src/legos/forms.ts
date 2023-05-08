import { FormLego } from "@daohaus/form-builder";
import { FIELD } from "@daohaus/moloch-v3-legos";
import { CustomFormLego } from "./fieldConfig";
import { APP_FIELD } from "./fields";
import { APP_TX } from "./tx";

const PROPOSAL_SETTINGS_FIELDS = [FIELD.PROPOSAL_EXPIRY, FIELD.PROP_OFFERING];

export const APP_FORM: Record<string, CustomFormLego> = {
  SIGNAL: {
    id: "SIGNAL",
    title: "Signal Form",
    subtitle: "Signal Proposal",
    description: "Ratify on-chain using a DAO proposal.",
    requiredFields: { title: true, description: true },
    log: true,
    tx: APP_TX.POST_SIGNAL,
    fields: [
      FIELD.TITLE,
      FIELD.DESCRIPTION,
      FIELD.LINK,
      APP_FIELD.TEST_FIELD,
      ...PROPOSAL_SETTINGS_FIELDS,
    ],
  },
  SUMMON: {
    id: "SUMMON",
    title: "Summon a shit coin",
    subtitle: "Learn about tokens and DAOs",
    description: "This summons 1 trillion tokens, 90% to the summoner and 10% to Shit Coin DAO",
    requiredFields: { tokenName: true, tokenSymbol: true },
    log: true,
    // tx: APP_TX.SUMMON,
    fields: [
      APP_FIELD.TOKEN_NAME,
      APP_FIELD.TOKEN_SYMBOL,
    ],
  },
};

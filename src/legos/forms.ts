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
  TOP_HAT: {
    id: "TOP_HAT",
    title: "Mint Top Hat",
    subtitle: "Hats Proposal",
    description: "Make a proposal to mint a top hat owned by the DAO",
    requiredFields: { title: true, description: true },
    log: true,
    tx: APP_TX.TOP_HAT,
    fields: [
      FIELD.TITLE,
      FIELD.DESCRIPTION,
      { ...FIELD.DESCRIPTION, id: "details", label: "Top Hat Details" },
      { ...FIELD.LINK, id: "imgURI", label: "Top Hat Image" },
      ...PROPOSAL_SETTINGS_FIELDS,
    ],
  },
  CREATE_HAT: {
    id: "CREATE_HAT",
    title: "Create Hat",
    subtitle: "Hats Proposal",
    description: "Make a proposal to create a hat",
    requiredFields: { title: true, description: true, maxSupply: true },
    log: true,
    tx: APP_TX.CREATE_HAT,
    fields: [
      FIELD.TITLE,
      FIELD.DESCRIPTION,
      { ...FIELD.DESCRIPTION, id: "details", label: "Hat Details" },
      { ...FIELD.LINK, id: "imgURI", label: "Hat Image" },
      { ...FIELD.TITLE, id: "maxSupply", label: "Max Supply" },
      ...PROPOSAL_SETTINGS_FIELDS,
    ],
  },
  MINT_HAT: {
    id: "MINT_HAT",
    title: "Mint a Hat",
    subtitle: "Hats Proposal",
    description: "Make a proposal to mint a hat to a wearer",
    requiredFields: { title: true, description: true, wearer: true },
    log: true,
    tx: APP_TX.MINT_HAT,
    fields: [
      FIELD.TITLE,
      FIELD.DESCRIPTION,
      {
        id: "wearer",
        type: "input",
        label: "Wearer Address",
        placeholder: "0x0...",
        expectType: "ethAddress",
      },
      ...PROPOSAL_SETTINGS_FIELDS,
    ],
  },
};

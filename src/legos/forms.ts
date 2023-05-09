import { FormLego } from "@daohaus/form-builder";
import { FIELD } from "@daohaus/moloch-v3-legos";
import { CustomFormLego } from "./fieldConfig";
import { APP_FIELD } from "./fields";
import { APP_TX } from "./tx";
import { TARGET_DAO } from "../targetDao";
import { formatValueTo } from "@daohaus/utils";

const PROPOSAL_SETTINGS_FIELDS = [FIELD.PROPOSAL_EXPIRY, FIELD.PROP_OFFERING];
const totalCoins = () =>
  parseInt(TARGET_DAO.SUMMONER_SUPPLY) + parseInt(TARGET_DAO.SQUAD_SUPPLY);

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
    title: "Summon a Squad Coin",
    subtitle: "Join the Big Squad",
    description: `This summons ${formatValueTo({
      value: totalCoins(),
      decimals: 2,
      format: "numberShort",
      unit: "tokens",
    })}, ${
      (parseInt(TARGET_DAO.SUMMONER_SUPPLY) / totalCoins()) * 100
    }% to the summoner and ${(parseInt(TARGET_DAO.SQUAD_SUPPLY) / totalCoins()) * 100}% to Squad Coin DAO`,
    requiredFields: { tokenName: true, tokenSymbol: true },
    log: true,
    // tx: APP_TX.SUMMON,
    fields: [APP_FIELD.TOKEN_NAME, APP_FIELD.TOKEN_SYMBOL],
  },
};

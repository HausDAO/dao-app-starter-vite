import { CustomFormLego } from "./fieldConfig";
import { APP_FIELD } from "./fields";
import { APP_TX } from "./tx";

const defaultRequiredFields = {
  name: true,
  description: false,
  safeTarget: true,
  cookieAmount: true,
  periodLength: true,
  cookieToken: true,
};

const defaultFields = [
  APP_FIELD.NAME,
  APP_FIELD.DESCRIPTION,
  APP_FIELD.SAFETARGET,
  APP_FIELD.COOKIEAMOUNT,
  APP_FIELD.PERIODLENGTH,
  APP_FIELD.COOKIETOKEN,
];

export const APP_FORM: Record<string, CustomFormLego> = {
  CREATE_BAAL: {
    id: "CREATE_BAAL",
    title: "Create Baal Jar",
    subtitle: "Build your MolochDAO V3 cookie jar",
    description:
      "Access to the cookie jar is determined by selected DAO tokens",
    requiredFields: {
      ...defaultRequiredFields,
      dao: true,
      threshold: true,
      useShares: false,
      useLoot: false,
    },
    log: true,
    fields: [
      ...defaultFields,
      APP_FIELD.DAO,
      APP_FIELD.THRESHOLD,
      APP_FIELD.USESHARES,
      APP_FIELD.USELOOT,
    ],
  },
  CREATE_ERC20: {
    id: "CREATE_ERC20",
    title: "Create ERC20 Jar",
    subtitle: "Build your ERC20 cookie jar",
    description:
      "Access to the cookie jar is determined by the ERC20 token balance",
    requiredFields: {
      ...defaultRequiredFields,
      tokenAddress: true,
      threshold: true,
    },
    log: true,
    fields: [...defaultFields, APP_FIELD.TOKENADDRESS, APP_FIELD.THRESHOLD],
  },
};

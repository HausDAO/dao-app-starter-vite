import { FieldLego } from "@daohaus/form-builder";
import { CustomFieldLego } from "./fieldConfig";

export const APP_FIELD: Record<string, CustomFieldLego> = {
  NAME: {
    id: "name",
    type: "input",
    label: "Name",
    placeholder: "Enter name",
  },
  DESCRIPTION: {
    id: "description",
    type: "textarea",
    label: "Description",
    placeholder: "Enter description",
  },
  SAFETARGET: {
    id: "safeTarget",
    type: "input",
    label: "Safe address",
    placeholder: "Enter safe address",
  },
  COOKIEAMOUNT: {
    id: "cookieAmount",
    type: "input",
    label: "Cookie amount",
    placeholder: "Enter cookie amount (in wei or equivalent)",
  },
  PERIODLENGTH: {
    id: "periodLength",
    type: "input",
    label: "Period length",
    placeholder: "Enter period length (in seconds)",
  },
  COOKIETOKEN: {
    id: "cookieToken",
    type: "input",
    label: "Cookie token",
    placeholder: "Enter cookie token address",
  },
  DAO: {
    id: "dao",
    type: "input",
    label: "DAO address",
    placeholder: "Enter DAO address",
  },
  THRESHOLD: {
    id: "threshold",
    type: "input",
    label: "Threshold",
    placeholder: "Enter threshold",
  },
  USESHARES: {
    id: "useShares",
    type: "switch",
    label: "Use shares",
    switches: [
      {
        id: "useShares",
        fieldLabel: "Use shares",
      },
    ],
  },
  USELOOT: {
    id: "useLoot",
    type: "switch",
    label: "Use loot",
    switches: [
      {
        id: "useLoot",
        fieldLabel: "Use loot",
      },
    ],
  },
  TOKENADDRESS: {
    id: "tokenAddress",
    type: "input",
    label: "Token address",
    placeholder: "Enter token address",
  },
};

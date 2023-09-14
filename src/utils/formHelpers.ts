import { MolochFormLego } from "@daohaus/moloch-v3-fields";

import { CustomFormLego } from "../legos/legoConfig";

export const getFormLegoByIdApp = (
  id: CustomFormLego["id"],
  forms: {
    [x: string]: CustomFormLego | MolochFormLego;
  }
): CustomFormLego | undefined => {
  const formKey = Object.keys(forms).find((key: string) => {
    return forms[key].id === id;
  });
  if (!formKey) return;
  return forms[formKey];
};

export const prepareProposals = (proposals: Record<string, CustomFormLego>) => {
  return Object.keys(proposals).map((key) => proposals[key]);
};

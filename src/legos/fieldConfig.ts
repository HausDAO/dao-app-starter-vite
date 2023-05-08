import { CoreFieldLookup } from "@daohaus/form-builder";
import { MolochFields } from "@daohaus/moloch-v3-fields";
import { FieldLegoBase, FormLegoBase } from "@daohaus/utils";
import { TestField } from "../components/customFields/fieldTest";
import { TokenSymbol } from "../components/customFields/tokenSymbol";
import { TokenName } from "../components/customFields/tokenName";

export const AppFieldLookup = {
  ...MolochFields,
  testField: TestField,
  tokenName: TokenName,
  tokenSymbol: TokenSymbol,
};

export type CustomFieldLego = FieldLegoBase<typeof AppFieldLookup>;
export type CustomFormLego = FormLegoBase<typeof AppFieldLookup>;

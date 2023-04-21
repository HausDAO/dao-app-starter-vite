import { FormBuilder } from "@daohaus/form-builder";
import { MolochFields } from "@daohaus/moloch-v3-fields";

import { APP_FORM } from "../legos/forms";
import { TARGET_DAO } from "../targetDao";
import { AppFieldLookup } from "../legos/fieldConfig";

export const CreateJar = () => {
  return (
    <FormBuilder
      form={APP_FORM.CREATEJAR}
      targetNetwork={TARGET_DAO[import.meta.env.VITE_TARGET_KEY].CHAIN_ID}
    />
  );
};

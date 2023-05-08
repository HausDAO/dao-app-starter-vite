import { FormBuilder } from "@daohaus/form-builder";
import { MolochFields } from "@daohaus/moloch-v3-fields";

import { APP_FORM } from "../legos/forms";
import { TARGET_DAO } from "../targetDao";
import { AppFieldLookup } from "../legos/fieldConfig";

export const FormTest = () => {
  return (
    <FormBuilder
      form={APP_FORM.SIGNAL}
      targetNetwork={TARGET_DAO.CHAIN_ID}
      customFields={{ ...MolochFields, ...AppFieldLookup }}
    />
  );
};

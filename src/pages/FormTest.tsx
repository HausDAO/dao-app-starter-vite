import { FormBuilder } from "@daohaus/form-builder";
import { MolochFields } from "@daohaus/moloch-v3-fields";

import { APP_FORM } from "../legos/forms";
import { AppFieldLookup } from "../legos/legoConfig";
import { useCurrentDao } from "@daohaus/moloch-v3-hooks";

export const FormTest = () => {
  const { daoChain } = useCurrentDao();

  return (
    <FormBuilder
      form={APP_FORM.SIGNAL}
      targetNetwork={daoChain}
      customFields={{ ...MolochFields, ...AppFieldLookup }}
    />
  );
};

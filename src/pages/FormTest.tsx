import { FormBuilder } from "@daohaus/form-builder";

import { FORM } from "../legos/forms";
import { TARGET_DAO } from "../targetDao";

export const FormTest = () => {
  return (
    <FormBuilder
      form={FORM.SIGNAL}
      targetNetwork={TARGET_DAO[import.meta.env.VITE_TARGET_KEY].CHAIN_ID}
    />
  );
};

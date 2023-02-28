import { FormBuilder } from "@daohaus/form-builder";

import { APP_FORM } from "../legos/forms";
import { TARGET_DAO } from "../targetDao";

export const FormTest = () => {
  return (
    <FormBuilder
      form={APP_FORM.SIGNAL}
      targetNetwork={TARGET_DAO[import.meta.env.VITE_TARGET_KEY].CHAIN_ID}
    />
  );
};

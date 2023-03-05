import React, { useState } from "react";
import { APP_FORM } from "../legos/forms";
import { TARGET_DAO } from "../targetDao";
import { MolochFields } from "@daohaus/moloch-v3-fields";
import { AppFieldLookup } from "../legos/fieldConfig";
import { FormBuilder } from "@daohaus/form-builder";
import { SuccessMessage } from "../components/Success";

export const Create = () => {
  const [success, setSuccess] = useState<boolean>(false);
  return (
    <>
      {success && <SuccessMessage />}
      {!success && (
        <FormBuilder
          form={APP_FORM.TOP_HAT}
          targetNetwork={TARGET_DAO[import.meta.env.VITE_TARGET_KEY].CHAIN_ID}
          customFields={{ ...MolochFields, ...AppFieldLookup }}
          lifeCycleFns={{
            onPollSuccess: () => {
              setSuccess(true);
            },
          }}
        />
      )}
    </>
  );
};

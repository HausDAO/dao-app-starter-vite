import React, { useMemo, useState } from "react";
import { APP_FORM } from "../legos/forms";
import { TARGET_DAO } from "../targetDao";
import { MolochFields } from "@daohaus/moloch-v3-fields";
import { AppFieldLookup } from "../legos/fieldConfig";
import { FormBuilder } from "@daohaus/form-builder";
import { SuccessMessage } from "../components/Success";
import { useLocation } from "react-router-dom";

export const CreateHat = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const location = useLocation();

  const defaults = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const defaultValues = params.get("defaultValues");

    console.log("defaultValues", defaultValues);

    if (!defaultValues) return null;
    return JSON.parse(defaultValues);
  }, [location]);

  return (
    <>
      {success && <SuccessMessage />}
      {!success && (
        <FormBuilder
          form={APP_FORM.CREATE_HAT}
          targetNetwork={TARGET_DAO[import.meta.env.VITE_TARGET_KEY].CHAIN_ID}
          customFields={{ ...MolochFields, ...AppFieldLookup }}
          defaultValues={defaults}
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

import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { FormBuilder } from "@daohaus/form-builder";
import {
  useCurrentDao,
  useDaoData,
  useDaoProposals,
} from "@daohaus/moloch-v3-hooks";

import { ALL_APP_FORMS, AppFieldLookup } from "../legos/legoConfig";
import { getFormLegoByIdApp } from "../utils/formHelpers";

export function NewProposal() {
  const location = useLocation();
  const navigate = useNavigate();
  const { daoChain, daoId } = useCurrentDao();
  const { refetch } = useDaoData();
  const { refetch: refetchProposals } = useDaoProposals();

  const onFormComplete = () => {
    refetch?.();
    refetchProposals?.();
    navigate(`/molochV3/${daoChain}/${daoId}/proposals`);
  };

  const formLego = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const legoId = params.get("formLego");

    if (!legoId) return null;
    return getFormLegoByIdApp(legoId, ALL_APP_FORMS);
  }, [location]);

  const defaults = useMemo(() => {
    if (formLego) {
      const params = new URLSearchParams(location.search);
      const defaultValues = params.get("defaultValues");

      if (!defaultValues) return null;
      return JSON.parse(defaultValues);
    }
    return null;
  }, [location, formLego]);

  if (!formLego) return null;

  return (
    <FormBuilder
      form={formLego}
      defaultValues={defaults}
      customFields={AppFieldLookup}
      lifeCycleFns={{
        onPollSuccess: () => {
          onFormComplete();
        },
      }}
      targetNetwork={daoChain}
    />
  );
}

export default NewProposal;

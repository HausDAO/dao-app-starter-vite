import { FormBuilder } from "@daohaus/form-builder";

import { APP_FORM } from "../legos/forms";
import { TARGET_DAO } from "../targetDao";
import { H2, SingleColumnLayout } from "@daohaus/ui";
import { useParams } from "react-router-dom";
import {
  BaalInitializer,
  Details,
  Erc20Initializer,
  Initializer,
  useCookieJarFactory,
} from "../hooks/useCookieJarFactory";

export const CreateForm = () => {
  const { jarType } = useParams();
  const { summonCookieJar } = useCookieJarFactory();

  const getForm = () => {
    let form;
    switch (jarType) {
      case "baal":
        form = APP_FORM.CREATE_BAAL;
        break;
      case "erc20":
        form = APP_FORM.CREATE_ERC20;
        break;
      default:
        break;
    }

    if (!form) {
      return undefined;
    }
    return form;
  };

  const getDetails = (values: any): Details | undefined => {
    let details;
    switch (jarType) {
      case "baal":
        details = {
          type: "BAAL",
          name: values.name ?? "Baal",
          description: values.description ?? "A cookie jar with a twist",
        };
        break;
      case "erc20":
        details = {
          type: "ERC20",
          name: values.name ?? "ERC20",
          description: values.description ?? "A cookie jar for ERC20 tokens",
        };
        break;
      default:
        break;
    }

    return details;
  };

  const getInitializer = (values: any): Initializer | undefined => {
    let initializer;
    switch (jarType) {
      case "baal":
        initializer = {
          safeTarget: values.safeTarget,
          periodLength: values.periodLength,
          cookieAmount: values.cookieAmount,
          cookieToken: values.cookieToken,
          dao: values.dao,
          threshold: values.threshold,
          useShares: values.useShares,
          useLoot: values.useLoot,
        } as BaalInitializer;
        break;
      case "erc20":
        initializer = {
          safeTarget: values.safeTarget,
          periodLength: values.periodLength,
          cookieAmount: values.cookieAmount,
          cookieToken: values.cookieToken,
          erc20Addr: values.tokenAddress,
          threshold: values.threshold,
        } as Erc20Initializer;
        break;
      default:
        break;
    }

    return initializer;
  };

  const handleSubmit = (values: any) => {
    console.log("values", values);

    const details = getDetails(values);
    if (!details) {
      console.log("Missing cookie jar details");
      return;
    }
    const initializer = getInitializer(values);
    if (!initializer) {
      console.log("Missing cookie jar initializer");
      return;
    }

    summonCookieJar(details, initializer);
  };

  const form = getForm();

  // set up different pages and routes for these forms

  if (!form) {
    return (
      <>
        <SingleColumnLayout>
          <H2>Form Not Found</H2>
        </SingleColumnLayout>
      </>
    );
  }

  return (
    <FormBuilder
      form={form}
      targetNetwork={TARGET_DAO.CHAIN_ID}
      onSubmit={handleSubmit}
    />
  );
};

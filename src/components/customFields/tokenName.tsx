import React from "react";
import { Buildable, WrappedInput, Field } from "@daohaus/ui";

export const TokenName = (props: Buildable<Field>) => {
  return <WrappedInput {...props} />;
};

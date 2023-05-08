import React from "react";
import { Buildable, WrappedInput, Field } from "@daohaus/ui";

export const TokenSymbol = (props: Buildable<Field>) => {
  return <WrappedInput {...props} />;
};

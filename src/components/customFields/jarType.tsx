import React from "react";
import { Buildable, Field, WrappedSelect } from "@daohaus/ui";

export const JarType = (props: Buildable<Field>) => {
  const { id = 'jarTypes' } = props;
  return <WrappedSelect {...props} id={id} options={
    [
      {name: "DAO", value: "baal", key: "baal"}, 
      {name: "erc20", value: "erc20", key: "erc20"}, 
      {name: "erc721", value: "erc721", key: "erc721"}, 
      {name: "hats", value: "hats", key: "hats"}, 
      {name: "pickles", value: "pickles", key: "pickles"}
    ]
  } />;
};

import { FormBuilder } from "@daohaus/form-builder";
import { MolochFields } from "@daohaus/moloch-v3-fields";

import { APP_FORM } from "../legos/forms";
import { TARGET_DAO } from "../targetDao";
import { AppFieldLookup } from "../legos/fieldConfig";
import { Button, H2, SingleColumnLayout } from "@daohaus/ui";

export const CreateJar = () => {
  // set up different pages and routes for these forms
  return (
    <>
      <SingleColumnLayout>
        <H2>Pick A Jar Type</H2>

        <Button style={{ marginTop: "2rem", marginBottom: "2rem" }}>DaoHAUS</Button>
        <Button disabled={true} style={{ marginTop: "2rem", marginBottom: "2rem" }}>ERC20(coming soon)</Button>
        <Button disabled={true} style={{ marginTop: "2rem", marginBottom: "2rem" }}>ERC721(coming soon)</Button>
        <Button disabled={true} style={{ marginTop: "2rem", marginBottom: "2rem" }}>Custom(coming soon)</Button>
      </SingleColumnLayout>
    </>
  );
};

{
  /* export const CreateJar = () => {
  return (
    <FormBuilder
      form={APP_FORM.CREATEJAR}
      targetNetwork={TARGET_DAO.CHAIN_ID}
    />
  );
}; */
}

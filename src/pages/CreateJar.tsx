import { FormBuilder } from "@daohaus/form-builder";
import { MolochFields } from "@daohaus/moloch-v3-fields";

import { APP_FORM } from "../legos/forms";
import { TARGET_DAO } from "../targetDao";
import { AppFieldLookup } from "../legos/fieldConfig";
import { Button, H2, SingleColumnLayout } from "@daohaus/ui";
import { StyledRouterLink } from "../components/Layout";

export const CreateJar = () => {
  // set up different pages and routes for these forms
  return (
    <>
      <SingleColumnLayout>
        <H2>Pick A Jar Type</H2>
        <StyledRouterLink to="/create/baal">
          <Button style={{ marginTop: "2rem", marginBottom: "2rem" }}>
            DaoHAUS
          </Button>
        </StyledRouterLink>
        <StyledRouterLink to="/create/erc20">
          <Button style={{ marginTop: "2rem", marginBottom: "2rem" }}>
            ERC20
          </Button>
        </StyledRouterLink>
      </SingleColumnLayout>
    </>
  );
};

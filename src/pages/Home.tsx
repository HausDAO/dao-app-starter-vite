import styled from "styled-components";

import { H2, Link, ParMd, SingleColumnLayout } from "@daohaus/ui";
import { HausAnimated } from "../components/HausAnimated";
import { StyledRouterLink } from "../components/Layout";

const LinkBox = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-between;
`;

export const Home = () => {
  return (
    <SingleColumnLayout>
      <H2>DAOhaus is your haus</H2>
      <HausAnimated />
      <ParMd style={{ marginBottom: "2.4rem" }}>
        Get started by editing src/pages/Home.tsx
      </ParMd>
      <LinkBox>
        <Link href="https://github.com/HausDAO/monorepo">Github</Link>
        <Link href="https://admin.daohaus.fun/">Admin</Link>
        <StyledRouterLink to="/formtest">Example Form</StyledRouterLink>
      </LinkBox>
    </SingleColumnLayout>
  );
};

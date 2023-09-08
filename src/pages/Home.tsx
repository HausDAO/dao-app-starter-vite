import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";

import { H2, Link, ParMd, SingleColumnLayout, LinkStyles } from "@daohaus/ui";

import { HausAnimated } from "../components/HausAnimated";
import { TARGET_DAO } from "../targetDao";

const LinkBox = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-between;
`;

export const StyledRouterLink = styled(RouterLink)`
  ${LinkStyles}
`;

export const Home = () => {
  const hasTargetDao =
    TARGET_DAO[import.meta.env.VITE_TARGET_KEY]?.CHAIN_ID !== undefined;

  return (
    <SingleColumnLayout>
      <H2>DAOhaus is your haus</H2>
      <HausAnimated />
      <ParMd style={{ marginBottom: "2.4rem" }}>
        Get started by editing src/pages/Home.tsx
      </ParMd>
      <LinkBox>
        {hasTargetDao && (
          <StyledRouterLink
            to={`molochv3/${
              TARGET_DAO[import.meta.env.VITE_TARGET_KEY].CHAIN_ID
            }/${TARGET_DAO[import.meta.env.VITE_TARGET_KEY].ADDRESS}`}
          >
            Target DAO Detected - Visit to DAO Overview
          </StyledRouterLink>
        )}
        <Link href="https://github.com/HausDAO/monorepo">Github</Link>
      </LinkBox>
    </SingleColumnLayout>
  );
};

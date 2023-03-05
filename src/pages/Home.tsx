import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";

import {
  Bold,
  border,
  Button,
  H2,
  Link,
  ParLg,
  SingleColumnLayout,
  Theme,
} from "@daohaus/ui";
import { HausAnimated } from "../components/HausAnimated";
import { useDaoData } from "@daohaus/moloch-v3-hooks";
import { useTopHats } from "../hooks/useTopHats";
import { RiArrowRightSLine } from "react-icons/ri/index.js";
import { TARGET_DAO } from "../targetDao";
import { StyledRouterLink } from "../components/Layout";
import { decimalId } from "../utils/idHelpers";

const ListItemContainer = styled.div`
  width: 100%;
  padding: 1rem 0;
  border-top: 1px ${({ theme }: { theme: Theme }) => theme.secondary.step6}
    solid;
`;

const ListItemLink = styled(RouterLink)`
  text-decoration: none;
  width: 100%;
  color: unset;
  :hover {
    text-decoration: none;
  }
`;

const ListItemHoverContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem;
  border-radius: ${border.radius};

  :hover {
    background: 1px ${({ theme }: { theme: Theme }) => theme.secondary.step3};
  }
`;

const ListItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  word-wrap: break-word;
`;

const StyledIcon = styled(RiArrowRightSLine)`
  fill: ${({ theme }: { theme: Theme }) => theme.primary.step9};
  font-size: 3rem;
`;

const LinkBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-content: center;
  margin-top: 10rem;
`;

export const Home = () => {
  const { dao } = useDaoData();

  const { topHats } = useTopHats({ daoId: dao?.safeAddress });

  console.log("topHats", topHats);

  return (
    <SingleColumnLayout>
      <H2>The Hats of {dao?.name}</H2>
      <HausAnimated />
      <ParLg style={{ marginBottom: "2.4rem" }}>DAO Top Hats</ParLg>
      {topHats &&
        topHats.map((hat: any) => {
          return (
            <ListItemContainer key={hat.id}>
              <ListItemLink to={`/hat/${hat.id}`}>
                <ListItemHoverContainer>
                  <ListItem>
                    <ParLg>
                      <Bold>{hat.details}</Bold>
                    </ParLg>
                    <p>{decimalId(hat.prettyId)}</p>
                  </ListItem>
                  <StyledIcon />
                </ListItemHoverContainer>
              </ListItemLink>
            </ListItemContainer>
          );
        })}

      <LinkBox>
        <StyledRouterLink to="/create">
          <Button variant="outline">Mint Top Hat</Button>
        </StyledRouterLink>
        <Link
          href={`https://admin.daohaus.club/#/molochv3/${
            TARGET_DAO[import.meta.env.VITE_TARGET_KEY].CHAIN_ID
          }/${TARGET_DAO[import.meta.env.VITE_TARGET_KEY].ADDRESS}`}
        >
          {dao?.name}
        </Link>
      </LinkBox>
    </SingleColumnLayout>
  );
};

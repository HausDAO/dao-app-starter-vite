import styled from "styled-components";
import { Link as RouterLink, useParams } from "react-router-dom";

import {
  Bold,
  border,
  Button,
  Card,
  DataMd,
  DataSm,
  H2,
  H4,
  Link,
  ParLg,
  ParMd,
  ParXl,
  SingleColumnLayout,
  Theme,
} from "@daohaus/ui";
import { HausAnimated } from "../components/HausAnimated";
import { useDaoData } from "@daohaus/moloch-v3-hooks";
import { useTopHats } from "../hooks/useTopHats";
import { RiArrowRightSLine } from "react-icons/ri/index.js";
import { TARGET_DAO } from "../targetDao";
import { StyledRouterLink } from "../components/Layout";
import { useHat } from "../hooks/useHat";
import { prettyIdToUrlId } from "../utils/idHelpers";

const HatList = styled.div`
  display: flex;
  gap: 5rem;
`;

const HatCard = styled(Card)`
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const TopHat = () => {
  const { hatId } = useParams();
  const { dao } = useDaoData();

  const { hat } = useHat({ hatId });

  console.log("hat", hat);

  if (!hat) return null;

  return (
    <SingleColumnLayout
      title={hat?.details}
      subtitle="The Hats of HaberdasheryDAO"
      actions={
        hat && (
          <StyledRouterLink
            to={`/create-hat?defaultValues=${JSON.stringify({
              topHatId: hatId,
            })}`}
          >
            <Button variant="outline">Create Sub Hat</Button>
          </StyledRouterLink>
        )
      }
    >
      <HatList>
        {hat.subHats.map((subhat: any) => {
          return (
            <HatCard key={subhat.id}>
              <DataSm>Hat {prettyIdToUrlId(subhat.prettyId)}</DataSm>
              <img src={subhat.imageUri} />
              <ParXl>{subhat.details}</ParXl>
              <DataMd>
                {subhat.wearers.length} Wearer
                {subhat.wearers.length > 1 ? "s" : ""}
              </DataMd>
              <StyledRouterLink
                to={`/mint-hat?defaultValues=${JSON.stringify({
                  hatId: subhat.id,
                })}`}
              >
                <Button size="md" variant="outline">
                  Mint to Wearer
                </Button>
              </StyledRouterLink>
              <div>
                <Link
                  href={`https://app.hatsprotocol.xyz/trees/5/73/${prettyIdToUrlId(
                    subhat.prettyId
                  )}`}
                  target="_blank"
                >
                  More details
                </Link>
              </div>
            </HatCard>
          );
        })}
      </HatList>
    </SingleColumnLayout>
  );
};

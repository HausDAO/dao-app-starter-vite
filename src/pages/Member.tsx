import { BsArrowLeft, BsShareFill } from "react-icons/bs";
import styled from "styled-components";

import { useCurrentDao, useDaoMember } from "@daohaus/moloch-v3-hooks";
import { MemberProfileCard } from "@daohaus/moloch-v3-macro-ui";
import {
  Button,
  ParLg,
  SingleColumnLayout,
  Loading,
  useBreakpoint,
  useToast,
  widthQuery,
} from "@daohaus/ui";
import { ButtonRouterLink } from "../components/ButtonRouterLink";

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 64rem;
  margin-bottom: 3rem;
  @media ${widthQuery.md} {
    max-width: 100%;
    min-width: 0;
  }
  @media ${widthQuery.sm} {
    flex-direction: column;
    button:first-child {
      margin-bottom: 1rem;
    }
  }
`;

const StyledArrowLeft = styled(BsArrowLeft)`
  height: 1.6rem;
  width: 1.6rem;
`;

export const Member = () => {
  const { isFetched, isFetching, member } = useDaoMember();
  const { daoChain, daoId } = useCurrentDao();
  const { successToast } = useToast();
  const isMobile = useBreakpoint(widthQuery.sm);

  const handleOnClick = () => {
    navigator.clipboard.writeText(`${window.location.href}`);
    successToast({
      title: "URL copied to clipboard",
    });
  };

  if (!daoChain || !daoId) return <ParLg>DAO Not Found</ParLg>;

  return (
    <SingleColumnLayout title="Member Profile">
      {!member && isFetching && <Loading size={12} />}
      {!member && isFetched && <ParLg>Member Not Found</ParLg>}
      {member && (
        <>
          <ButtonsContainer>
            <ButtonRouterLink
              to={`/molochv3/${daoChain}/${daoId}/members`}
              IconLeft={StyledArrowLeft}
              color="secondary"
              linkType="no-icon-external"
              variant="outline"
              fullWidth={isMobile}
            >
              MEMBERS
            </ButtonRouterLink>
            <Button
              IconLeft={BsShareFill}
              onClick={handleOnClick}
              fullWidth={isMobile}
            >
              SHARE PROFILE
            </Button>
          </ButtonsContainer>
          <MemberProfileCard
            daoChain={daoChain}
            daoId={daoId}
            member={member}
            allowLinks={true}
            allowMemberMenu={true}
          />
        </>
      )}
    </SingleColumnLayout>
  );
};

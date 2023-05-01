import { Link, ParSm } from "@daohaus/ui";
import styled from "styled-components";
import { Container } from "@material-ui/core";
import raidguild from "../assets/raidguild.svg";
import publicnouns from "../assets/publicnouns.png";
import daohaus from "../assets/daohaus.png";
import metacartel from "../assets/metacartel.png";

const CookieFooter = () => {
  return (
    <>
      <ParSm style={{ textAlign: "center", marginTop: "2em" }}>
        Co Funded by the MetaFam
      </ParSm>
      <StyledFooter>
        <Link
          href="https://daohaus.club/"
          target="_blank"
        >
          <StyledImage alt="built by daohaus" src={daohaus} />
        </Link>
        <Link href="https://publicnouns.wtf/" target="_blank">
          <StyledImage alt="built by daohaus" src={publicnouns} />
        </Link>
        <Link href="https://raidguild.org" target="_blank">
          <StyledImage alt="built by daohaus" src={raidguild} />
        </Link>
        <Link
          href="https://www.metacartel.org/"
          target="_blank"
        >
          <StyledImage alt="built by daohaus" src={metacartel} />
        </Link>
      </StyledFooter>
    </>
  );
};

const StyledImage = styled.img`
  max-height: 100px;
  max-width: 150px;
`;

const StyledFooter = styled(Container)`
  && {
    padding: 1em;
    margin-top: 2em;

    display: flex;
    justify-content: space-between;
    padding-left: 5em;
    padding-right: 5em;
  }
`;

export default CookieFooter;

import styled from "styled-components";

import { H2, Link, ParMd, SingleColumnLayout } from "@daohaus/ui";
import { StyledRouterLink } from "../components/Layout";
// import cookie.png from assets
import cookie from "../assets/cookie.png";

const LinkBox = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-between;
`;

export const Home = () => {
  return (
    <SingleColumnLayout>
      <H2>COOKIE JAR</H2>
      <img src={cookie} alt="cookie" height={"150px"} />
      <ParMd style={{ marginBottom: "2.4rem" }}>
        Cookie Jar is a DAO owned slush fund
      </ParMd>

      <ParMd style={{ marginBottom: "2.4rem" }}>
        Cookies have daily limits and can be claimed by an anyone on the
        allowlist
      </ParMd>

      <ParMd style={{ marginBottom: "2.4rem" }}>
        Allowlist is managed by the DAO
      </ParMd>

      <ParMd style={{ marginBottom: "2.4rem" }}>
        Take out the trash? Claim a cookie. Don't forget to leave a note!
      </ParMd>

      <ParMd style={{ marginBottom: "2.4rem" }}>
        But be careful, if you take too many cookies without good reason, you
        might just get kicked out of the DAO!
      </ParMd>

      <LinkBox>
        <StyledRouterLink to="/jars">Jars</StyledRouterLink>
        <StyledRouterLink to="/create">New</StyledRouterLink>
      </LinkBox>
    </SingleColumnLayout>
  );
};

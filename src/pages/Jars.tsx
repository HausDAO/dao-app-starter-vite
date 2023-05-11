import styled from "styled-components";

import { H2, Label, Link, ParMd, SingleColumnLayout } from "@daohaus/ui";
import { HausAnimated } from "../components/HausAnimated";
import { StyledRouterLink } from "../components/Layout";
import { useDHConnect } from "@daohaus/connect";
import { TARGET_DAO } from "../targetDao";

import cookie from "../assets/cookie.png";
import { useCookieJarFactory } from "../hooks/useCookieJarFactory";
import { NavLink } from "react-router-dom";

export const Jars = () => {
  const { address, chainId } = useDHConnect();

  const { records, parsed, isLoading } = useCookieJarFactory({
    userAddress: address,
    chainId: TARGET_DAO.CHAIN_ID,
  });
  

  return (
    <SingleColumnLayout>
      <H2>Jars</H2>

      {isLoading && <HausAnimated />}
      {parsed &&
        parsed.map((record, idx) => {
          return record?.cookieJar ? (
            <div key={idx} style={{ marginBottom: "3rem" }}>
              <img src={cookie} alt="cookie" height={"20px"} /> 
              <Label >Address:</Label>
              <ParMd style={{ marginBottom: ".4rem" }} >
                {record?.cookieJar }
              </ParMd>
              <Label >Type: </Label>
              <ParMd style={{ marginBottom: ".4rem" }} >
                ??
              </ParMd>
              <Label >Description: </Label>
              <ParMd style={{ marginBottom: ".4rem" }}>
                {record?.jarType}
              </ParMd>

              <ParMd style={{ marginBottom: ".4rem" }}>
                Go to <NavLink to={`/claims/${TARGET_DAO.CHAIN_ID}/${record?.cookieJar}`}>Claim</NavLink> to claim your tokens.
              </ParMd>



            </div>
          ): null;
        })}
    </SingleColumnLayout>
  );
};

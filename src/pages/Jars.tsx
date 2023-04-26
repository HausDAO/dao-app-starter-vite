import styled from "styled-components";

import { H2, Label, Link, ParMd, SingleColumnLayout } from "@daohaus/ui";
import { HausAnimated } from "../components/HausAnimated";
import { StyledRouterLink } from "../components/Layout";
import { useDHConnect } from "@daohaus/connect";
import { TARGET_DAO } from "../targetDao";

import cookie from "../assets/cookie.png";
import { useCookieJarFactory } from "../hooks/useCookieJarFactory";

export const Jars = () => {
  const { address, chainId } = useDHConnect();

  const { records, parsed } = useCookieJarFactory({
    userAddress: address,
    chainId: TARGET_DAO[import.meta.env.VITE_TARGET_KEY].CHAIN_ID,
  });


  return (
    <SingleColumnLayout>
      <H2>Jars</H2>

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
                {record?.jarType}
              </ParMd>
              <Label >Description: </Label>
              <ParMd style={{ marginBottom: ".4rem" }}>
                {record?.description}
              </ParMd>

              <ParMd style={{ marginBottom: ".4rem" }}>
                Go to
              </ParMd>



            </div>
          ): null;
        })}
    </SingleColumnLayout>
  );
};

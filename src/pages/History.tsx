import styled from "styled-components";

import { H2, Label, Link, ParMd, SingleColumnLayout } from "@daohaus/ui";
import { HausAnimated } from "../components/HausAnimated";
import { StyledRouterLink } from "../components/Layout";
import { usePoster } from "../hooks/usePoster";
import { useDHConnect } from "@daohaus/connect";
import { TARGET_DAO } from "../targetDao";

import cookie from "../assets/cookie.png";

export const History = () => {
  const { address, chainId } = useDHConnect();

  const { records, parsed } = usePoster({
    userAddress: address,
    chainId: TARGET_DAO[import.meta.env.VITE_TARGET_KEY].CHAIN_ID,
  });

  //   const { records } = useCookieReason({
  //     daoId: TARGET_DAO[import.meta.env.VITE_TARGET_KEY].ADDRESS,
  //     chainId: TARGET_DAO[import.meta.env.VITE_TARGET_KEY].CHAIN_ID,
  //     recordType: "reason",
  //   });

  // console.log("cookie parsed", parsed);
  return (
    <SingleColumnLayout>
      <H2>History</H2>

      {parsed &&
        parsed.map((record, idx) => {
          return record?.user ? (
            <div key={idx} style={{ marginBottom: "3rem" }}>
              <img src={cookie} alt="cookie" height={"20px"} /> 
              <Label >User:</Label>
              <ParMd style={{ marginBottom: ".4rem" }} >
                {record?.user }
              </ParMd>
              <Label >Title: </Label>
              <ParMd style={{ marginBottom: ".4rem" }} >
                {record?.title}
              </ParMd>
              <Label >Description: </Label>
              <ParMd style={{ marginBottom: ".4rem" }}>
                {record?.description}
              </ParMd>

              <Link href={record?.link}>link</Link>

            </div>
          ): null;
        })}
    </SingleColumnLayout>
  );
};

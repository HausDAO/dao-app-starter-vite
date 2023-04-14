import styled from "styled-components";

import { H2, Link, ParMd, SingleColumnLayout } from "@daohaus/ui";
import { HausAnimated } from "../components/HausAnimated";
import { StyledRouterLink } from "../components/Layout";
import { usePoster } from "../hooks/usePoster";
import { useDHConnect } from "@daohaus/connect";

export const History = () => {
  const { address, chainId } = useDHConnect();

  const { records, parsed } = usePoster({
    userAddress: address,
    chainId: "0x64",
  });

  //   const { records } = useCookieReason({
  //     daoId: TARGET_DAO[import.meta.env.VITE_TARGET_KEY].ADDRESS,
  //     chainId: TARGET_DAO[import.meta.env.VITE_TARGET_KEY].CHAIN_ID,
  //     recordType: "reason",
  //   });

  console.log("cookie parsed", parsed);
  return (
    <SingleColumnLayout>
      <H2>History</H2>

      {parsed &&
        parsed.map((record, idx) => {
          return (
            <div key={idx} style={{ marginBottom: "3rem" }}>
              <ParMd style={{ marginBottom: "2.4rem" }} >
                {record?.user}
              </ParMd>
              <ParMd style={{ marginBottom: "2.4rem" }} >
                {record?.title}
              </ParMd>
              <ParMd style={{ marginBottom: "2.4rem" }}>
                {record?.description}
              </ParMd>
              <ParMd style={{ marginBottom: "2.4rem" }}>
                {record?.link}
              </ParMd>
            </div>
          );
        })}
    </SingleColumnLayout>
  );
};

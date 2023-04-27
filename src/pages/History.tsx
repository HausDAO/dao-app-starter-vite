import styled from "styled-components";

import {
  BiColumnLayout,
  Card,
  H2,
  Label,
  Link,
  ParMd,
  SingleColumnLayout,
} from "@daohaus/ui";

import { usePoster } from "../hooks/usePoster";
import { useDHConnect } from "@daohaus/connect";
import { TARGET_DAO } from "../targetDao";
import { HistoryCard } from "../components/HistoryCard";

export const History = () => {
  const { address, chainId } = useDHConnect();

  const { records, parsed, leaderBoard } = usePoster({
    userAddress: address,
    chainId: TARGET_DAO[import.meta.env.VITE_TARGET_KEY].CHAIN_ID,
  });

  //   const { records } = useCookieReason({
  //     daoId: TARGET_DAO[import.meta.env.VITE_TARGET_KEY].ADDRESS,
  //     chainId: TARGET_DAO[import.meta.env.VITE_TARGET_KEY].CHAIN_ID,
  //     recordType: "reason",
  //   });

  console.log("leaderBoard", leaderBoard);

  return (
    <BiColumnLayout
      left={
        <SingleColumnLayout>
          {parsed &&
            parsed.map((record, idx) => {
              return record?.user ? (
                <HistoryCard record={record} key={idx} />
              ) : null;
            })}
        </SingleColumnLayout>
      }
      right={
        <SingleColumnLayout>
          Leader board
          {leaderBoard &&
            leaderBoard.map((record, idx) => {
              return (
                <div key={idx} style={{ marginBottom: "3rem", width: "50%" }}>
                  <Label>Address:</Label>
                  <ParMd style={{ marginBottom: ".4rem" }}>
                    {record?.user}
                  </ParMd>
                  <Label>Count: </Label>
                  <ParMd style={{ marginBottom: ".4rem" }}>
                    {record?.count}
                  </ParMd>
                </div>
              );
            })}
        </SingleColumnLayout>
      }
      subtitle="your dashboard for information about your cookie jar"
      title="History and Stats"
    />
  );
};

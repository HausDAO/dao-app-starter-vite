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
import { LeaderBoardCard } from "../components/LeaderBoardCard";

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
          <ParMd style={{ marginBottom: "1rem" }}>History</ParMd>
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
          <ParMd style={{ marginBottom: "1rem" }}>Leader Board</ParMd>
          {leaderBoard &&
            leaderBoard.map((record, idx) => {
              return (
                <LeaderBoardCard record={record} key={idx}  />
              );
            })}
        </SingleColumnLayout>
      }
      subtitle="your dashboard for information about your cookie jar"
      title="History and Stats"
    />
  );
};

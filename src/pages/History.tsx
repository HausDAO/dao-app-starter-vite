import styled from "styled-components";

import { BiColumnLayout, ParMd, SingleColumnLayout } from "@daohaus/ui";

import { usePoster } from "../hooks/usePoster";
import { useDHConnect } from "@daohaus/connect";
import { TARGET_DAO } from "../targetDao";
import { HistoryCard } from "../components/HistoryCard";
import { LeaderBoardCard } from "../components/LeaderBoardCard";
import { useParams } from "react-router-dom";

export const History = () => {
  const { address, chainId } = useDHConnect();
  const { cookieAddress, cookieChain } = useParams();

  const { records, parsed, leaderBoard, isLoading } = usePoster({
    userAddress: address,
    cookieAddress: cookieAddress,
    chainId: TARGET_DAO.CHAIN_ID,
  });

  return (
    <>
      {isLoading && <ParMd style={{ marginBottom: "1rem" }}>Loading...</ParMd>}

      <BiColumnLayout
        left={
          <SingleColumnLayout>
            <ParMd style={{ marginBottom: "1rem" }}>
              History (newer first)
            </ParMd>

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
                return <LeaderBoardCard record={record} key={idx} />;
              })}
          </SingleColumnLayout>
        }
        subtitle={
          parsed && parsed.length === 0
            ? "No history yet."
            : "your dashboard for information about your cookie jar"
        }
        title="History and Stats"
      />
    </>
  );
};

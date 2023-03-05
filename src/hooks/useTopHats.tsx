// useRequest.js
import { useQuery } from "react-query";
import { GraphQLClient } from "graphql-request";
import { DEFAULT_GRAPH_URL, HATS_GRAPH_URL } from "../utils/constants";

import { TARGET_DAO } from "../targetDao";
import { TOP_HATS_BY_DAO } from "./queries";

const API_URL =
  HATS_GRAPH_URL[TARGET_DAO[import.meta.env.VITE_TARGET_KEY].CHAIN_ID];

const graphQLClient = new GraphQLClient(API_URL || DEFAULT_GRAPH_URL);

export const useTopHats = ({ daoId }: { daoId?: string }) => {
  const { data, ...rest } = useQuery(
    ["get-nft-list", { daoId }],
    () =>
      graphQLClient.request(TOP_HATS_BY_DAO, {
        id: daoId?.toLowerCase(),
      }),
    { enabled: !!daoId }
  );

  return {
    topHats: data?.wearer?.currentHats,
    ...rest,
  };
};

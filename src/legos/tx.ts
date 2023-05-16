import { buildMultiCallTX } from "@daohaus/tx-builder";
import { APP_CONTRACT } from "./contract";

export enum ProposalTypeIds {
  Signal = "SIGNAL",
  IssueSharesLoot = "ISSUE",
  AddShaman = "ADD_SHAMAN",
  TransferErc20 = "TRANSFER_ERC20",
  TransferNetworkToken = "TRANSFER_NETWORK_TOKEN",
  UpdateGovSettings = "UPDATE_GOV_SETTINGS",
  UpdateTokenSettings = "TOKEN_SETTINGS",
  TokensForShares = "TOKENS_FOR_SHARES",
  GuildKick = "GUILDKICK",
  WalletConnect = "WALLETCONNECT",
}
// {
//   type: "JSONDetails",
//   jsonSchema: {
//     title: "to eat a cookie",
//     description: `.reason`,
//     contentURI: `.link`,
//     contentURIType: { type: "static", value: "url" },
//     table: { type: "static", value: "reason" },
//     queryType: { type: "static", value: "list" },
//   },
// },
// `{"daoId":"${
//   TARGET_DAO[import.meta.env.VITE_TARGET_KEY].ADDRESS
// }","table":"reason","queryType":"list","title":"to eat a cookie","description":"${reason}","link":"${link}"}`,

//
export const APP_TX = {
  REACH_IN_JAR: buildMultiCallTX({
    id: "COOKIEJAR",
    JSONDetails: {
      type: "JSONDetails",
      jsonSchema: {
        title: `.formValues.title`,
        description: `.formValues.description`,
        contentURI: `.formValues.link`,
        contentURIType: { type: "static", value: "url" },
        proposalType: { type: "static", value: ProposalTypeIds.Signal },
      },
    },
    actions: [
      {
        contract: APP_CONTRACT.COOKIEJAR,
        method: "reachInJar",
        args: [
          `.reason`,
          {
            type: "JSONDetails",
            jsonSchema: {
              title: { type: "static", value: "to eat a cookie" },
              user: `.user`,
              receiver: `.receiver`,
              description: `.reason`,
              link: `.link`,
              table: { type: "static", value: "reason" },
              queryType: { type: "static", value: "list" },
            },
          },
        ],
      },
    ],
  }),
  POST_SIGNAL: buildMultiCallTX({
    id: "POST_SIGNAL",
    JSONDetails: {
      type: "JSONDetails",
      jsonSchema: {
        title: `.formValues.title`,
        description: `.formValues.description`,
        contentURI: `.formValues.link`,
        contentURIType: { type: "static", value: "url" },
        proposalType: { type: "static", value: ProposalTypeIds.Signal },
      },
    },
    actions: [
      {
        contract: APP_CONTRACT.COOKIEJAR,
        method: "postReason",
        args: [
          `.receiver`,
          {
            type: "JSONDetails",
            jsonSchema: {
              title: { type: "static", value: "sweet or salty?" },
              user: `.user`,
              receiver: `.receiver`,
              description: `.reason`,
              link: `.link`,
              table: { type: "static", value: "reason" },
              queryType: { type: "static", value: "list" },
            },
          },
        ],
      },
    ],
  }),
  CREATEJAR: buildMultiCallTX({
    id: "CREATEJAR",
    JSONDetails: {
      type: "JSONDetails",
      jsonSchema: {
        title: `.formValues.title`,
        description: `.formValues.description`,
        contentURI: `.formValues.link`,
        contentURIType: { type: "static", value: "url" },
        proposalType: { type: "static", value: ProposalTypeIds.Signal },
      },
    },
    actions: [
      {
        contract: APP_CONTRACT.COOKIEJAR,
        method: "summonCookieJar",
        args: [
          `.receiver`,
          {
            type: "JSONDetails",
            jsonSchema: {
              title: { type: "static", value: "sweet or salty?" },
              user: `.user`,
              receiver: `.receiver`,
              description: `.reason`,
              link: `.link`,
              table: { type: "static", value: "reason" },
              queryType: { type: "static", value: "list" },
            },
          },
        ],
      },
    ],
  }),
};

import { buildMultiCallTX } from "@daohaus/tx-builder";
import { APP_CONTRACT } from "./contract";

export enum TxTypeIds {
  ReachInJar = "REACH_IN_JAR",
  Signal = "SIGNAL",
  Summon = "SUMMON",
}

// summonCookieJar(string memory details, address _singleton, bytes memory _initializer)

export const APP_TX = {
  REACH_IN_JAR: buildMultiCallTX({
    id: "REACH_IN_JAR",
    JSONDetails: {
      type: "JSONDetails",
      jsonSchema: {
        title: `.formValues.title`,
        description: `.formValues.description`,
        contentURI: `.formValues.link`,
        contentURIType: { type: "static", value: "url" },
        proposalType: { type: "static", value: TxTypeIds.ReachInJar },
      },
    },
    actions: [
      {
        contract: APP_CONTRACT.COOKIEJAR,
        method: "reachInJar",
        args: [`.reason`],
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
        proposalType: { type: "static", value: TxTypeIds.Signal },
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
        name: `.formValues.name`,
        description: `.formValues.description`,
      },
    },
    actions: [
      {
        contract: APP_CONTRACT.COOKIEJAR,
        method: "summonCookieJar",
        args: [`.details`, `.singleton`, `.initializer`],
      },
    ],
  }),
};

import { POSTER_TAGS } from "@daohaus/utils";
import { buildMultiCallTX } from "@daohaus/tx-builder";
import { APP_CONTRACT } from "./contract";
import { CONTRACT } from "@daohaus/moloch-v3-legos";

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
  Hats = "HATS",
}

export const APP_TX = {
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
        contract: APP_CONTRACT.POSTER,
        method: "post",
        args: [
          {
            type: "JSONDetails",
            jsonSchema: {
              title: `.formValues.title`,
              description: `.formValues.description`,
              contentURI: `.formValues.link`,
              contentURIType: { type: "static", value: "url" },
              proposalType: { type: "static", value: ProposalTypeIds.Signal },
            },
          },
          { type: "static", value: POSTER_TAGS.signalProposal },
        ],
      },
    ],
  }),
  TOP_HAT: buildMultiCallTX({
    id: "TOP_HAT",
    JSONDetails: {
      type: "JSONDetails",
      jsonSchema: {
        title: `.formValues.title`,
        description: `.formValues.description`,
        proposalType: { type: "static", value: ProposalTypeIds.Hats },
      },
    },
    actions: [
      {
        contract: APP_CONTRACT.HATS,
        method: "mintTopHat",
        args: [".safeId", ".formValues.details", ".formValues.imgURI"],
      },
    ],
  }),
  CREATE_HAT: buildMultiCallTX({
    id: "CREATE_HAT",
    JSONDetails: {
      type: "JSONDetails",
      jsonSchema: {
        title: `.formValues.title`,
        description: `.formValues.description`,
        proposalType: { type: "static", value: ProposalTypeIds.Hats },
      },
    },
    actions: [
      {
        contract: APP_CONTRACT.HATS,
        method: "createHat",
        args: [
          ".formValues.topHatId",
          ".formValues.details",
          ".formValues.maxSupply",
          ".safeId",
          ".safeId",
          { type: "static", value: "true" },
          ".formValues.imgURI",
        ],
      },
    ],
  }),
  MINT_HAT: buildMultiCallTX({
    id: "MINT_HAT",
    JSONDetails: {
      type: "JSONDetails",
      jsonSchema: {
        title: `.formValues.title`,
        description: `.formValues.description`,
        proposalType: { type: "static", value: ProposalTypeIds.Hats },
      },
    },
    actions: [
      {
        contract: APP_CONTRACT.HATS,
        method: "mintHat",
        args: [".formValues.hatId", ".formValues.wearer"],
      },
    ],
  }),
};

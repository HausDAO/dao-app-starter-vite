import { gql } from "graphql-request";

export const TOP_HATS_BY_DAO = gql`
  query getTopHatsByDao($id: ID!) {
    wearer(id: $id) {
      id
      currentHats(where: { levelAtLocalTree: 0 }) {
        id
        prettyId
        levelAtLocalTree
        details
        imageUri
      }
    }
  }
`;

export const HATS_FOR_TOP_HAT = gql`
  query getTopHatsByDao($id: ID!) {
    hat(id: $id) {
      id
      prettyId
      levelAtLocalTree
      details
      subHats(where: { levelAtLocalTree_gt: 0 }) {
        id
        maxSupply
        levelAtLocalTree
        details
        imageUri
        prettyId
        wearers {
          id
        }
      }
    }
  }
`;

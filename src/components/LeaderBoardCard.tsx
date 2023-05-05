import styled from "styled-components";

import { Avatar, Badge, Card, Link, ParMd } from "@daohaus/ui";
import cookie from "../assets/cookie.png";
import { useProfile } from "@daohaus/moloch-v3-hooks";

/**
 * Represents a leaderboard record.
 *
 * @typedef {Object} LBRecord
 * @property {string} user - The user's address.
 * @property {number} count - The user's cookie count.
 */
interface LBRecord {
  user: string;
  count: number;
}

/**
 * Displays a leaderboard card for a given record.
 *
 * @param {Object} props - The props for the component.
 * @param {Object} props.record - The record to display on the leaderboard.
 * @param {string} props.record.user - The user's address.
 * @param {number} props.record.count - The user's cookie count.
 * @returns {JSX.Element} A leaderboard card.
 */
export const LeaderBoardCard = ({ record }: { record: LBRecord }) => {
  /**
   * Gets the user's profile information from the Moloch v3 contract.
   * @returns {Object} The user's profile information.
   */
  const { profile } = useProfile({ address: record?.user });

  return (
    <div style={{ marginBottom: "3rem", width: "50%" }}>
      <Card>
        {/* If the user has a profile image, display it along with their ENS name */}
        {profile && (
          <ParMd style={{ marginBottom: ".4rem" }}>
            {profile?.image && !profile.image.includes("null") && (
              <Avatar alt={profile.ens} size="sm" src={profile.image} />
            )}{" "}
            {profile.ens}
          </ParMd>
        )}
        {/* Display the user's address */}
        <ParMd style={{ marginBottom: "2rem" }}>{record?.user}</ParMd>
        {/* Display the user's cookie count */}
        <ParMd style={{ marginBottom: "1rem" }}>
          <img src={cookie} alt="cookie" height={"20px"} /> {record?.count}
        </ParMd>
      </Card>
    </div>
  );
};

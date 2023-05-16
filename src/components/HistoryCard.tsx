import styled from "styled-components";

import { Avatar, Badge, Card, Link, ParMd } from "@daohaus/ui";
import cookie from "../assets/cookie.png";
import { useProfile } from "@daohaus/moloch-v3-hooks";

const DootBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

interface HistoryRecord {
  user: string;
  title: string;
  description: string;
  link: string;
}

/**
 * Renders a card displaying a history record, including the user's profile picture,
 * username, description, link, and the number of upvotes and downvotes.
 * @param {Object} props - The component props.
 * @param {Object} props.record - The history record to display.
 * @param {string} props.record.user - The username of the user who made the history record.
 * @param {string} props.record.title - The title of the history record.
 * @param {string} props.record.description - The description of the history record.
 * @param {string} props.record.link - The link to the history record.
 */
export const HistoryCard = ({ record }: { record: HistoryRecord }) => {
  const { profile } = useProfile({ address: record?.user });

  return (
    <div style={{ marginBottom: "3rem", width: "50%" }}>
      <Card>
        {profile && <ParMd style={{ marginBottom: ".4rem" }}>
          {profile?.image && !profile.image.includes("null") && (
            <Avatar alt={profile.ens} size="sm" src={profile.image} />
          )}{" "}
          {profile.ens}
        </ParMd>}
        <ParMd style={{ marginBottom: "2rem" }}>{record?.user}</ParMd>
        <ParMd style={{ marginBottom: "1rem" }}>
          <img src={cookie} alt="cookie" height={"20px"} />{" "}
          {record?.description}
        </ParMd>

        <Link href={record?.link}>link</Link>
        <DootBox style={{ fontSize: "2rem", marginTop: "1rem" }}>
          <div>
            👍
            <Badge badgeLabel={`${0} updoot`} />
          </div>
          <div>
            👎
            <Badge badgeLabel={`${0} downdoot`} />
          </div>
        </DootBox>
      </Card>
    </div>
  );
};

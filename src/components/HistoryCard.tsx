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

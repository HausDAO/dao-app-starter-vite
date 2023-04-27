import styled from "styled-components";

import { Avatar, Badge, Card, Link, ParMd } from "@daohaus/ui";
import cookie from "../assets/cookie.png";
import { useProfile } from "@daohaus/moloch-v3-hooks";

const DootBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

interface LBRecord {
  user: string;
  count: number;
}

export const LeaderBoardCard = ({ record }: { record: LBRecord }) => {
  const { profile } = useProfile({ address: record?.user });
  console.log("profile", profile);
  console.log("record", record);

  return (
    <div style={{ marginBottom: "3rem", width: "50%" }}>
      <Card>
        {profile && (
          <ParMd style={{ marginBottom: ".4rem" }}>
            {profile?.image && !profile.image.includes("null") && (
              <Avatar alt={profile.ens} size="sm" src={profile.image} />
            )}{" "}
            {profile.ens}
          </ParMd>
        )}
        <ParMd style={{ marginBottom: "2rem" }}>{record?.user}</ParMd>
        <ParMd style={{ marginBottom: "1rem" }}>
          <img src={cookie} alt="cookie" height={"20px"} /> {record?.count}
        </ParMd>
      </Card>
    </div>
  );
};

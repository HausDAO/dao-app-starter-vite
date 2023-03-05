import styled from "styled-components";

import { Link, ParXl } from "@daohaus/ui";
import { TARGET_DAO } from "../targetDao";

const routePath = `molochv3/${
  TARGET_DAO[import.meta.env.VITE_TARGET_KEY].CHAIN_ID
}/${TARGET_DAO[import.meta.env.VITE_TARGET_KEY].ADDRESS}`;

const MessageContainer = styled.div`
  display: flex;
  gap: 3rem;
  padding: 15rem;
`;

export const SuccessMessage = () => {
  return (
    <MessageContainer>
      <Link href={`http://daohaus.club/${routePath}`}>
        <ParXl>Vote on the proposal</ParXl>
      </Link>
    </MessageContainer>
  );
};

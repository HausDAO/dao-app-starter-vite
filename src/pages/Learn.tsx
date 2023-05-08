import { H2, Link, ParMd, SingleColumnLayout } from "@daohaus/ui";
import styled from "styled-components";

const LinkBox = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-between;
`;

export const Learn = () => {
  
  return (
    <SingleColumnLayout>
      <H2>Learn</H2>
      <ParMd>How does a shit coin work?</ParMd>
      <ParMd>How does a DAO work?</ParMd>
      <ParMd>How do I join SCD?</ParMd>
      <LinkBox style={{"marginTop": "2em"}}>
        <Link href="https://github.com/HausDAO/monorepo">Github</Link>
        <Link href="https://admin.daohaus.fun/">Admin</Link>
      </LinkBox>
    </SingleColumnLayout>
  );
};

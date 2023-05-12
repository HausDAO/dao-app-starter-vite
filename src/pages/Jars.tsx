import styled from "styled-components";

import { H2, Label, Link, ParMd, SingleColumnLayout } from "@daohaus/ui";
import { HausAnimated } from "../components/HausAnimated";
import { StyledRouterLink } from "../components/Layout";
import { useDHConnect } from "@daohaus/connect";
import { TARGET_DAO } from "../targetDao";

import cookie from "../assets/cookie.png";
import { useCookieJarFactory } from "../hooks/useCookieJarFactory";
import { NavLink } from "react-router-dom";
import { JarCard } from "../components/JarCard";

export const Jars = () => {
  const { address, chainId } = useDHConnect();

  const { records, parsed, isLoading } = useCookieJarFactory({
    userAddress: address,
    chainId: TARGET_DAO.CHAIN_ID,
  });
  
  // TODO: filter on only jars user is on allow list of

  return (
    <SingleColumnLayout>
      <H2>Jars</H2>

      {isLoading && <HausAnimated />}
      {parsed &&
        parsed.map((record, idx) => {
          return record?.cookieJar ? (
            <JarCard record={record} user={address} key={idx} />
          ): null;
        })}
    </SingleColumnLayout>
  );
};

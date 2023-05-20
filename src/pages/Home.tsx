import styled from "styled-components";

import { H2, Link, ParMd, SingleColumnLayout } from "@daohaus/ui";
import { HausAnimated } from "../components/HausAnimated";
import { StyledRouterLink } from "../components/Layout";
// import cookie.png from assets
import cookie from "../assets/cookie.png";
import { useDHConnect } from "@daohaus/connect";
import { ethers } from "ethers";
import { IdbStorage, Indexer, Event, createIndexer } from "chainsauce-web";
import { ADDRESSES } from "../utils/config";
import FactoryABI from "../abis/factoryCookieJar.json";
import { useEffect, useState } from "react";

const LinkBox = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-between;
`;

export type CookieJarEntry = {
  id: string;
  type: string;
  address: string;
  initializer: { [key: string]: any };
};

const parseSummonEvent = (event: Event) => {
  // cookieJar, initializer, jarType
  const args = event.args;
  console.log("Event: ", event);

  let initParams;
  switch (args.jarType) {
    case "BAAL":
      initParams = ethers.utils.defaultAbiCoder.decode(
        [
          "address",
          "uint256",
          "uint256",
          "address",
          "address",
          "uint256",
          "bool",
          "bool",
        ],
        args.initializer
      );
      console.log(initParams);
      break;
    case "Testing cookv1":
      initParams = ethers.utils.defaultAbiCoder.decode(
        ["address", "uint256", "uint256", "address"],
        args.initializer
      );
      console.log(initParams);

      break;
    case "cook test 2":
      initParams = ethers.utils.defaultAbiCoder.decode(
        ["address", "uint256", "uint256", "address"],
        args.initializer
      );
      console.log(initParams);

      break;
    case "ERC20":
      initParams = ethers.utils.defaultAbiCoder.decode(
        ["address", "uint256", "uint256", "address", "address", "uint256"],
        args.initializer
      );
      console.log(initParams);

      break;
    default:
      console.log("Unknown jar type");
      break;
  }

  if (!initParams) return undefined;

  return {
    id: initParams[0],
    type: args.jarType,
    address: initParams[0],
    initializer: initParams,
  } as CookieJarEntry;
};

async function handleEvent(indexer: Indexer<IdbStorage>, event: Event) {
  const db = indexer.storage.db;

  if (!db) {
    console.error("No db");
    return;
  }

  console.log("Handling event");

  switch (event.name) {
    case "SummonCookieJar":
      console.log("SummonCookieJar");
      const parsedEvent = parseSummonEvent(event);
      if (!parsedEvent) {
        console.error("Failed to parse event", event);
        break;
      }

      console.log("parserd event", parsedEvent);

      // address, details, initializer
      // TODO ID mix of chain + factory address + instance address
      await db.add(
        "cookieJars",
        parsedEvent,
        ethers.utils.id(JSON.stringify(parsedEvent))
      );
      break;
    default:
      console.log("Unhandled event");
      break;
  }

  console.log("event", event);
}

export const Home = () => {
  const { provider } = useDHConnect();
  const [indexer, setIndexer] = useState<Indexer<IdbStorage>>();
  const storage = new IdbStorage(["cookieJars"]);

  // Effect hook to create indexer
  useEffect(() => {
    if (!provider || !storage) return;
    const init = async () => {
      const indexer = await createIndexer(provider, storage, handleEvent);
      setIndexer(indexer);
    };

    init();
  }, [provider]);

  console.log(indexer);

  if (indexer) {
    // Don't set starting block to 0, bunch of indexing errors if you do
    indexer.subscribe(ADDRESSES["0x64"].summonCookieJar, FactoryABI, 27746237);
  }

  return (
    <SingleColumnLayout>
      <H2>COOKIE JAR</H2>
      <img src={cookie} alt="cookie" height={"150px"} />
      <ParMd style={{ marginBottom: "2.4rem" }}>
        Cookie Jar is a DAO owned slush fund
      </ParMd>

      <ParMd style={{ marginBottom: "2.4rem" }}>
        Cookies have daily limits and can be claimed by an anyone on the
        allowlist
      </ParMd>

      <ParMd style={{ marginBottom: "2.4rem" }}>
        Allowlist is managed by the DAO
      </ParMd>

      <ParMd style={{ marginBottom: "2.4rem" }}>
        Take out the trash? Claim a cookie. Don't forget to leave a note!
      </ParMd>

      <ParMd style={{ marginBottom: "2.4rem" }}>
        But be careful, if you take too many cookies without good reason, you
        might just get kicked out of the DAO!
      </ParMd>

      <LinkBox>
        <StyledRouterLink to="/jars">Jars</StyledRouterLink>
        <StyledRouterLink to="/create">New</StyledRouterLink>
      </LinkBox>
    </SingleColumnLayout>
  );
};

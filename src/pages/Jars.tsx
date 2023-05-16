import { H2, SingleColumnLayout } from "@daohaus/ui";
import { HausAnimated } from "../components/HausAnimated";
import { useDHConnect } from "@daohaus/connect";
import { TARGET_DAO } from "../targetDao";

import { useCookieJarFactory } from "../hooks/useCookieJarFactory";
import { JarCard } from "../components/JarCard";
import { CookieJarEntry, indexer } from "../utils/chainsauce";
import { useEffect, useState } from "react";

export const Jars = () => {
  const { address } = useDHConnect();

  const { isLoading } = useCookieJarFactory({
    userAddress: address,
    chainId: TARGET_DAO.CHAIN_ID,
  });

  const [jars, setJars] = useState<CookieJarEntry[]>([]);

  const data = indexer.storage.collection("cookiejars");

  // TODO: filter on only jars user is on allow list of
  useEffect(() => {
    const getJars = async () => {
      const jars = await data.all();
      setJars(jars as CookieJarEntry[]);
    };

    if (data) {
      getJars();
    }
  }, [data]);

  return (
    <SingleColumnLayout>
      <H2>Jars</H2>

      {isLoading && <HausAnimated />}

      {jars &&
        jars.map((jar) => <JarCard record={jar} user={address} key={jar.id} />)}
    </SingleColumnLayout>
  );
};

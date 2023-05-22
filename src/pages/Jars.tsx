import { H2, SingleColumnLayout } from "@daohaus/ui";
import { HausAnimated } from "../components/HausAnimated";
import { useDHConnect } from "@daohaus/connect";

import { JarCard } from "../components/JarCard";
import { CookieJarEntry, useIndexer } from "../hooks/useIndexer";
import { useEffect, useState } from "react";

export const Jars = () => {
  const { address } = useDHConnect();
  const { indexer, getJars } = useIndexer();

  const [jars, setJars] = useState<CookieJarEntry[]>();

  // TODO: filter on only jars user is on allow list of
  useEffect(() => {
    const getAllCookieJars = async () => {
      if (indexer) {
        const jars = await getJars();
        setJars(jars);
      }
    };

    getAllCookieJars();
  }, [indexer]);

  console.log("jars", jars);
  return (
    <SingleColumnLayout>
      <H2>Jars</H2>

      {!jars && <HausAnimated />}

      {jars && jars.map((jar) => <JarCard record={jar} key={jar.id} />)}
    </SingleColumnLayout>
  );
};

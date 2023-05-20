import { H2, SingleColumnLayout } from "@daohaus/ui";
import { HausAnimated } from "../components/HausAnimated";
import { useDHConnect } from "@daohaus/connect";
import { TARGET_DAO } from "../targetDao";

import { JarCard } from "../components/JarCard";
import { CookieJarEntry, useIndexer } from "../hooks/useIndexer";
import { useEffect, useState } from "react";

export const Jars = () => {
  const { address, provider } = useDHConnect();
  const indexer = useIndexer(provider);

  const [jars, setJars] = useState<CookieJarEntry[]>([]);

  // TODO: filter on only jars user is on allow list of
  useEffect(() => {
    const getJars = async () => {
      if (indexer) {
        console.log("Getting Jars");
      }
    };

    getJars();
  }, [indexer]);

  return (
    <SingleColumnLayout>
      <H2>Jars</H2>

      {/* {isLoading && <HausAnimated />} */}

      {jars &&
        jars.map((jar) => <JarCard record={jar} user={address} key={jar.id} />)}
    </SingleColumnLayout>
  );
};

import { DHLayout, useDHConnect } from "@daohaus/connect";
import { HAUS_RPC } from "@daohaus/keychain-utils";
import { TXBuilder } from "@daohaus/tx-builder";
import { H4 } from "@daohaus/ui";
import { Outlet, useLocation } from "react-router-dom";
import { TARGET_DAO } from "../targetDao";
import { useDaoData } from "@daohaus/moloch-v3-hooks";

export function HomeContainer() {
  const location = useLocation();
  const { provider, address } = useDHConnect();
  const { dao } = useDaoData({
    daoId: TARGET_DAO[import.meta.env.VITE_TARGET_KEY].ADDRESS,
    daoChain: TARGET_DAO[import.meta.env.VITE_TARGET_KEY].CHAIN_ID,
  });

  return (
    <DHLayout
      pathname={location.pathname}
      navLinks={[{ label: "Home", href: `/` }]}
      leftNav={<H4>{dao?.name}</H4>}
    >
      <TXBuilder
        provider={provider}
        chainId={TARGET_DAO[import.meta.env.VITE_TARGET_KEY].CHAIN_ID}
        daoId={TARGET_DAO[import.meta.env.VITE_TARGET_KEY].ADDRESS}
        safeId={TARGET_DAO[import.meta.env.VITE_TARGET_KEY].SAFE_ADDRESS}
        appState={{ dao, memberAddress: address }}
        rpcs={{
          "0x1": `https://${
            import.meta.env.VITE_RIVET_KEY
          }.eth.rpc.rivet.cloud/`,
          "0x5": `https://${
            import.meta.env.VITE_RIVET_KEY
          }.goerli.rpc.rivet.cloud/`,
          "0x64": HAUS_RPC["0x64"],
        }}
        explorerKeys={{
          "0x1": import.meta.env.VITE_EXPLORER_KEY,
          "0x5": import.meta.env.VITE_EXPLORER_KEY,
        }}
        graphApiKeys={{
          "0x1": import.meta.env.VITE_GRAPH_API_KEY_MAINNET,
        }}
      >
        <Outlet />
      </TXBuilder>
    </DHLayout>
  );
}

export default HomeContainer;

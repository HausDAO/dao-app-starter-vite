import { Outlet, useLocation, useParams } from "react-router-dom";

import { DHLayout, useDHConnect } from "@daohaus/connect";
import { TXBuilder } from "@daohaus/tx-builder";
import { H4 } from "@daohaus/ui";
import { ValidNetwork } from "@daohaus/keychain-utils";
import { CurrentDaoProvider, useDaoData } from "@daohaus/moloch-v3-hooks";

export const DaoContainer = () => {
  const location = useLocation();
  const { proposalId, memberAddress, daoChain, daoId } = useParams<{
    daoChain: ValidNetwork;
    daoId: string;
    proposalId: string;
    memberAddress: string;
  }>();
  const { publicClient, address } = useDHConnect();
  const { dao } = useDaoData();

  const routePath = `molochv3/${daoChain}/${daoId}`;

  return (
    <DHLayout
      pathname={location.pathname}
      navLinks={[
        { label: "Home", href: `/` },
        { label: "DAO Overview", href: `/${routePath}` },
        { label: "Safes", href: `/${routePath}/safes` },
        { label: "Proposals", href: `/${routePath}/proposals` },
        { label: "Members", href: `/${routePath}/members` },
        { label: "Settings", href: `/${routePath}/settings` },
      ]}
      leftNav={<H4>{dao?.name}</H4>}
    >
      <CurrentDaoProvider
        targetDao={{
          daoChain: daoChain,
          daoId: daoId,
          proposalId,
          memberAddress,
        }}
      >
        <TXBuilder
          publicClient={publicClient}
          chainId={daoChain}
          daoId={daoId}
          safeId={dao?.safeAddress}
          appState={{ dao, memberAddress: address }}
        >
          <Outlet />
        </TXBuilder>
      </CurrentDaoProvider>
    </DHLayout>
  );
};

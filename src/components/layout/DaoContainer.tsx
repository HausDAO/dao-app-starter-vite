import { Outlet, useLocation, useParams } from "react-router-dom";

import { DHLayout, useDHConnect } from "@daohaus/connect";
import { TXBuilder } from "@daohaus/tx-builder";
import { H4 } from "@daohaus/ui";
import { ValidNetwork } from "@daohaus/keychain-utils";
import { CurrentDaoProvider, useDaoData } from "@daohaus/moloch-v3-hooks";
import { useMemo } from "react";

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

  const navLinks = useMemo(() => {
    let baseLinks = [
      { label: "Claim", href: `/${routePath}/claim` },
      { label: "DAO", href: `/${routePath}` },
      { label: "Safes", href: `/${routePath}/safes` },
      { label: "Proposals", href: `/${routePath}/proposals` },
      { label: "Members", href: `/${routePath}/members` },
      { label: "Settings", href: `/${routePath}/settings` },
    ];

    return address
      ? [
          ...baseLinks,
          { label: "Profile", href: `/${routePath}/member/${address}` },
        ]
      : baseLinks;
  }, [daoChain, daoId, address]);

  return (
    <DHLayout
      pathname={location.pathname}
      navLinks={navLinks}
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

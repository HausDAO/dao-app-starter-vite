import { useDHConnect } from "@daohaus/connect";
import { TXBuilder } from "@daohaus/tx-builder";
import { H4 } from "@daohaus/ui";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { TARGET_DAO } from "../targetDao";
import { CurrentDaoProvider, useDaoData } from "@daohaus/moloch-v3-hooks";
import { CookieLayout } from "./CookieLayout";


const routePath = `molochv3/${
  TARGET_DAO[import.meta.env.VITE_TARGET_KEY].CHAIN_ID
}/${TARGET_DAO[import.meta.env.VITE_TARGET_KEY].ADDRESS}`;

/**
 * LayoutContainer component that wraps the entire application with a CookieLayout.
 *
 * @returns {JSX.Element} The JSX for the LayoutContainer component.
 */
export const LayoutContainer = () => {
  // Hooks
  const location = useLocation();
  const { proposalId, memberAddress } = useParams<{
    proposalId: string;
    memberAddress: string;
  }>();
  const { provider, address } = useDHConnect();
  const { dao } = useDaoData({
    daoId: TARGET_DAO[import.meta.env.VITE_TARGET_KEY].ADDRESS,
    daoChain: TARGET_DAO[import.meta.env.VITE_TARGET_KEY].CHAIN_ID,
  });

  // Render
  return (
    <CookieLayout
      pathname={location.pathname}
      navLinks={[
        { label: "Home", href: `/` },
        { label: "Safes", href: `${routePath}/safes` },
        { label: "Allow List", href: `${routePath}/members` },
        { label: "Claim", href: `${routePath}/claims` },
        { label: "Stats", href: `${routePath}/history` },
      ]}
      leftNav={
        <div>
          <H4>{dao?.name}</H4>
        </div>
      }
    >
      <CurrentDaoProvider
        targetDao={{
          daoChain: TARGET_DAO[import.meta.env.VITE_TARGET_KEY].CHAIN_ID,
          daoId: TARGET_DAO[import.meta.env.VITE_TARGET_KEY].ADDRESS,
          proposalId,
          memberAddress,
        }}
      >
        <TXBuilder
          provider={provider}
          chainId={TARGET_DAO[import.meta.env.VITE_TARGET_KEY].CHAIN_ID}
          daoId={TARGET_DAO[import.meta.env.VITE_TARGET_KEY].ADDRESS}
          safeId={TARGET_DAO[import.meta.env.VITE_TARGET_KEY].SAFE_ADDRESS}
          appState={{ dao, memberAddress: address }}
        >
          <Outlet />
        </TXBuilder>
      </CurrentDaoProvider>
      
    </CookieLayout>
  );
};

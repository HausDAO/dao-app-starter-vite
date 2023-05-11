import { useDHConnect } from "@daohaus/connect";
import { TXBuilder } from "@daohaus/tx-builder";
import { H4 } from "@daohaus/ui";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { TARGET_DAO } from "../targetDao";
import { CurrentDaoProvider, useDaoData } from "@daohaus/moloch-v3-hooks";
import { CookieLayout } from "./CookieLayout";

/**
 * LayoutContainer component that wraps the entire application with a CookieLayout.
 *
 * @returns {JSX.Element} The JSX for the LayoutContainer component.
 */
export const LayoutContainer = () => {
  // Hooks
  const location = useLocation();
  const { proposalId, memberAddress, cookieAddress, safeAddress, daoAddress, cookieChain } = useParams<{
    proposalId: string;
    memberAddress: string;
    cookieAddress: string;
    safeAddress: string;
    daoAddress: string;
    cookieChain: string;
  }>();
  const { provider, address } = useDHConnect();

  // Render
  return (
    <CookieLayout
      pathname={location.pathname}
      navLinks={[
        { label: "Home", href: `/` },
        // { label: "Safes", href: `${routePath}/safes` },
        ///{ label: "Allow List", href: `/members` },
        { label: "Claim", href: `/claims/${cookieChain}/${cookieAddress}` },
        { label: "Stats", href: `/history/${cookieChain}/${cookieAddress}` },
      ]}
      leftNav={
        <div>
          <H4>Cookie Jar</H4>
        </div>
      }
    >

        <TXBuilder
          provider={provider}
          chainId={TARGET_DAO.CHAIN_ID}
          appState={{ memberAddress: address }}
        >
          <Outlet />
        </TXBuilder>

      
    </CookieLayout>
  );
};

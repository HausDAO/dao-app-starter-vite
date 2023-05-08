import { DHLayout, useDHConnect } from "@daohaus/connect";
import { TXBuilder } from "@daohaus/tx-builder";
import { H4 } from "@daohaus/ui";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { TARGET_DAO } from "../targetDao";

export const LayoutContainer = () => {
  const location = useLocation();
  const { provider, address } = useDHConnect();


  return (
    <DHLayout
      pathname={location.pathname}
      navLinks={[
        { label: "Home", href: `/` },
        { label: "Learn about tokens and DAOs", href: `/learn` },
      ]}
      leftNav={<H4>Summon</H4>}
    >
        <TXBuilder
          provider={provider}
          chainId={TARGET_DAO.CHAIN_ID}
          appState={{ memberAddress: address }}
        >
          <Outlet />
        </TXBuilder>

    </DHLayout>
  );
};

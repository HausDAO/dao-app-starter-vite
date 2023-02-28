import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { DHConnectProvider } from "@daohaus/connect";
import { HausThemeProvider } from "@daohaus/ui";
import { Buffer } from "buffer";

import { Routes } from "./Routes";
import { TARGET_DAO } from "./targetDao";

// This solves an issue when using WalletConnect and intercept Txs to create dao proposals
// Related open issue: https://github.com/WalletConnect/walletconnect-monorepo/issues/748
window.Buffer = window.Buffer || Buffer;

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <QueryClientProvider client={queryClient}>
        <DHConnectProvider
          daoChainId={TARGET_DAO[import.meta.env.VITE_TARGET_KEY].CHAIN_ID}
        >
          <HausThemeProvider>
            <Routes />
          </HausThemeProvider>
        </DHConnectProvider>
      </QueryClientProvider>
    </HashRouter>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { HausThemeProvider } from "@daohaus/ui";
import { Buffer } from "buffer";

import { Routes } from "./Routes";

// This solves an issue when using WalletConnect and intercept Txs to create dao proposals
// Related open issue: https://github.com/WalletConnect/walletconnect-monorepo/issues/748
window.Buffer = window.Buffer || Buffer;


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>

          <HausThemeProvider>
            <Routes />
          </HausThemeProvider>

    </HashRouter>
  </React.StrictMode>
);

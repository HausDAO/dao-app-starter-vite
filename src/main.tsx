import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { HausThemeProvider } from "@daohaus/ui";

import { App } from "./App";

import "./App.css";

// import { Buffer } from "buffer";
// // This solves an issue when using WalletConnect and intercept Txs to create dao proposals
// // Related open issue: https://github.com/WalletConnect/walletconnect-monorepo/issues/748
// window.Buffer = window.Buffer || Buffer;

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <QueryClientProvider client={queryClient}>
        <HausThemeProvider>
          <App />
        </HausThemeProvider>
      </QueryClientProvider>
    </HashRouter>
  </React.StrictMode>
);

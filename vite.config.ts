import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
// https://vitejs.dev/config/
export default ({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd()));
  console.log('env', process.env);
  
  return defineConfig({
    plugins: [react()],
    define: {
      "process.env": {
        NX_RIVET_KEY: "5f314efa4d7c44b6bcb6f183859a43d3",
        NX_GRAPH_API_KEY_MAINNET: process.env.VITE_GRAPH_API_KEY_MAINNET,
        NX_INFURA_PROJECT_ID: process.env.VITE_INFURA_PROJECT_ID,
        NX_ETHERSCAN_KEY: process.env.VITE_ETHERSCAN_KEY,
        NODE_ENV: "16.6.0",
      },
    },
  });
};

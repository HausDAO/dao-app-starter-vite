import { Routes as Router, Route } from "react-router-dom";
import { FormTest } from "./pages/FormTest";
import { Home } from "./pages/Home";
import { LayoutContainer } from "./components/LayoutContainer";
import { TARGET_DAO } from "./targetDao";
import { Create } from "./pages/Create";
import { CreateHat } from "./pages/CreateHat";
import { MintHat } from "./pages/MintHat";
import { TopHat } from "./pages/TopHat";

const routePath = `molochv3/${
  TARGET_DAO[import.meta.env.VITE_TARGET_KEY].CHAIN_ID
}/${TARGET_DAO[import.meta.env.VITE_TARGET_KEY].ADDRESS}`;

export const Routes = () => {
  return (
    <Router>
      <Route path="/" element={<LayoutContainer />}>
        <Route index element={<Home />} />
        <Route path="formtest" element={<FormTest />} />
        <Route path="/create" element={<Create />} />
        <Route path="/create-hat" element={<CreateHat />} />
        <Route path="/mint-hat" element={<MintHat />} />
        <Route path="/hat/:hatId" element={<TopHat />} />
      </Route>
    </Router>
  );
};

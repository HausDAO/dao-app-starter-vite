import { Routes as Router, Route } from "react-router-dom";
import { FormTest } from "./pages/FormTest";
import { Home } from "./pages/Home";
import { LayoutContainer } from "./components/LayoutContainer";
import Dao from "./pages/Dao";
import { TARGET_DAO } from "./targetDao";

const routePath = `molochv3/${
  TARGET_DAO[import.meta.env.VITE_TARGET_KEY].CHAIN_ID
}/${TARGET_DAO[import.meta.env.VITE_TARGET_KEY].ADDRESS}`;

export const Routes = () => {
  return (
    <Router>
      <Route path="/" element={<LayoutContainer />}>
        <Route index element={<Home />} />
        <Route path={`${routePath}/formtest`} element={<FormTest />} />
        <Route path={`${routePath}/dao`} element={<Dao />} />
      </Route>
    </Router>
  );
};

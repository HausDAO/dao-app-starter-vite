import { Routes as Router, Route } from "react-router-dom";
import { FormTest } from "./pages/FormTest";
import { Home } from "./pages/Home";
import { LayoutContainer } from "./components/LayoutContainer";
import Dao from "./pages/Dao";
import { Safes } from "./pages/Safes";
import { Settings } from "./pages/Settings";
import { Proposals } from "./pages/Proposals";
import { Proposal } from "./pages/Proposal";
import { Members } from "./pages/Members";
import { Member } from "./pages/Member";
import { TARGET_DAO } from "./targetDao";
import RageQuit from "./pages/RageQuit";

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
        <Route path={`${routePath}/safes`} element={<Safes />} />
        <Route path={`${routePath}/settings`} element={<Settings />} />
        <Route path={`${routePath}/proposals/`} element={<Proposals />} />
        <Route
          path={`${routePath}/proposal/:proposalId`}
          element={<Proposal />}
        />
        <Route path={`${routePath}/members/`} element={<Members />} />
        <Route
          path={`${routePath}/member/:memberAddress`}
          element={<Member />}
        />
        <Route path={`${routePath}/members/ragequit`} element={<RageQuit />} />
      </Route>
    </Router>
  );
};

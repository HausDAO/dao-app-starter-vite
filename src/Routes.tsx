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

export const Routes = () => {
  return (
    <Router>
      <Route path="/" element={<LayoutContainer />}>
        <Route index element={<Home />} />
        <Route path="formtest/" element={<FormTest />} />
        <Route path="dao" element={<Dao />} />
        <Route path="safes" element={<Safes />} />
        <Route path="settings" element={<Settings />} />
        <Route path="proposals/" element={<Proposals />} />
        <Route path="proposals/:proposalId" element={<Proposal />} />
        <Route path="members/" element={<Members />} />
        <Route path="members/:memberAddress" element={<Member />} />
      </Route>
    </Router>
  );
};

import { Routes as Router, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { LayoutContainer } from "./components/LayoutContainer";
import { Safes } from "./pages/Safes";
import { Proposals } from "./pages/Proposals";
import { Proposal } from "./pages/Proposal";
import { Members } from "./pages/Members";
import { Member } from "./pages/Member";
import { TARGET_DAO } from "./targetDao";
import { Claims } from "./pages/Claim";
import { History } from "./pages/History";
import { Jars } from "./pages/Jars";
import { CreateJar } from "./pages/CreateJar";


export const Routes = () => {
  return (
    <Router>
      <Route path="/" element={<LayoutContainer />}>
        <Route index element={<Home />} />

        {/* <Route path={`${routePath}/safes`} element={<Safes />} /> */}

        <Route path={`/claims/:cookieChain/:cookieAddress`} element={<Claims />} />
        <Route path={`/history/:cookieChain/:cookieAddress`} element={<History />} />
        <Route path={`/jars`} element={<Jars />} />
        <Route path={`/create`} element={<CreateJar />} />

      </Route>
    </Router>
  );
};

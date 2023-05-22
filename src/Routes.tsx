import { Routes as Router, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { LayoutContainer } from "./components/LayoutContainer";
import { Claims } from "./pages/Claim";
import { History } from "./pages/History";
import { Jars } from "./pages/Jars";
import { CreateJar } from "./pages/CreateJar";
import { CreateForm } from "./pages/CreateForm";

export const Routes = () => {
  return (
    <Router>
      <Route path="/" element={<LayoutContainer />}>
        <Route index element={<Home />} />

        {/* <Route path={`${routePath}/safes`} element={<Safes />} /> */}

        <Route
          path={`/claims/:cookieChain/:cookieAddress`}
          element={<Claims />}
        />
        <Route
          path={`/history/:cookieChain/:cookieAddress`}
          element={<History />}
        />
        <Route path={`/jars`} element={<Jars />} />
        <Route path={`/create/`} element={<CreateJar />} />
        <Route
          path={`/create/:jarType`}
          element={<CreateForm />}
        />
      </Route>
    </Router>
  );
};

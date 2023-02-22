import { Routes as Router, Route, useLocation } from "react-router-dom";
import { FormTest } from "./pages/FormTest";
import { Home } from "./pages/Home";
import HomeContainer from "./components/HomeContainer";

export const Routes = () => {
  const { pathname } = useLocation();
  return (
    <Router>
      <Route path="/" element={<HomeContainer />}>
        <Route index element={<Home />} />
        {/* <Route path="proposals/" element={<Proposals />} /> */}
        {/* <Route path="members/" element={<Members />} /> */}
        <Route path="form-test/" element={<FormTest />} />
      </Route>
    </Router>
  );
};

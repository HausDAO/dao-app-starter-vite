import { Routes as Router, Route, useLocation } from "react-router-dom";
import { FormTest } from "./pages/FormTest";
import { Home } from "./pages/Home";
import HomeContainer from "./components/HomeContainer";
import Dao from "./pages/Dao";

export const Routes = () => {
  return (
    <Router>
      <Route path="/" element={<HomeContainer />}>
        <Route index element={<Home />} />
        <Route path="formtest/" element={<FormTest />} />
        <Route path="dao" element={<Dao />} />
        {/* <Route path="proposals/" element={<Proposals />} /> */}
        {/* <Route path="members/" element={<Members />} /> */}
      </Route>
    </Router>
  );
};

import { FunctionComponent } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CompanyDashboard from "./company/CompanyDashboard";
import App from "./app/App";
import CandidateDashboard from "./candidate/CandidateDashboard";
import Login from "./authentication/Login";
import LoginContainer from "./authentication/LoginContainer";
import { useCookies } from "react-cookie";

const LayoutSwitcher: FunctionComponent = () => {
  const [user] = useCookies(["user"]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<App />} />
        <Route path={"/login"} element={<LoginContainer />} />
        <Route path={"/company"} element={<CompanyDashboard user={user} />} />
        <Route
          path={"/candidate"}
          element={<CandidateDashboard user={user} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default LayoutSwitcher;

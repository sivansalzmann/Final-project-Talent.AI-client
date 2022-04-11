import { FunctionComponent } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CompanyDashboard from "./company/CompanyDashboard";
import App from "./app/App";

const LayoutSwitcher: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<App />} />
        <Route path={"/company"} element={<CompanyDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default LayoutSwitcher;

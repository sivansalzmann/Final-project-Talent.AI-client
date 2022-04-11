import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const CompanyDashboard = lazy(() => import("../company/CompanyDashboard"));

const ReactRouter = () => {
  return (
    <>
      <Route path="/" element={<CompanyDashboard />} />
    </>
  );
};

export default ReactRouter;

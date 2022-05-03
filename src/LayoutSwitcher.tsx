import { FunctionComponent } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./app/App";
import LoginContainer from "./authentication/LoginContainer";
import Applications from "./candidate/Applications";
import CandidateProfileContainer from "./candidate/CandidateProfileContainer";
import JobsListContainer from "./candidate/JobsListContainer";
import CompanyDetails from "./company/CompanyDetails";
import JobsOffers from "./job-offers/JobsOffers";

const LayoutSwitcher: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<App />} />
        <Route path={"/login"} element={<LoginContainer />} />
        <Route path={"/candidate"} element={<CandidateProfileContainer />} />
        <Route path={"/company"} element={<CompanyDetails />} />
        <Route path={"/companyJobOffers"} element={<JobsOffers />} />
        <Route path={"/jobList"} element={<JobsListContainer />} />
        <Route path={"/applications"} element={<Applications />} />
        {/* <Route path={"/applications"} element={<Applications />} />
        <Route path={"/jobList"} element={<JobsListContainer />} />
        <Route path={"/matchingCompanies"} element={<MatchingCompanies />} />
        <Route path={"/addNewJobOffer"} element={<AddNewJobOfferContainer />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default LayoutSwitcher;

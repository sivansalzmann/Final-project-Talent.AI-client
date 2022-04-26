import { FunctionComponent } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./app/App";
import LoginContainer from "./authentication/LoginContainer";
import { useCookies } from "react-cookie";
import JobsListContainer from "./candidate/JobsListContainer";
import Applications from "./candidate/Applications";
import CandidateDetails from "./candidate/CandidateDetails";
import MatchingCompanies from "./candidate/MatchingCompanies";
import CompanyDetails from "./company/CompanyDetails";
import JobsOffers from "./job-offers/JobsOffers";
import AddNewJobOfferContainer from "./company/NewJobOfferContainer";

const LayoutSwitcher: FunctionComponent = () => {
  const [user] = useCookies(["user"]);
  console.log(user.user);
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<App />} />
        <Route path={"/login"} element={<LoginContainer />} />
        <Route path={"/candidate"} element={<CandidateDetails user={user} />} />
        <Route path={"/company"} element={<CompanyDetails user={user} />} />
        <Route path={"/companyJobOffers"} element={<JobsOffers />} />
        <Route path={"/applications"} element={<Applications user={user} />} />
        <Route path={"/jobList"} element={<JobsListContainer user={user} />} />
        <Route
          path={"/matchingCompanies"}
          element={<MatchingCompanies candidate={user} />}
        />
        <Route
          path={"/addNewJobOffer"}
          element={<AddNewJobOfferContainer user={user} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default LayoutSwitcher;

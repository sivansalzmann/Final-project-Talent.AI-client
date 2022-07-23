import { FunctionComponent } from "react";
import { useCookies } from "react-cookie";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./app/App";
import LoginContainer from "./authentication/LoginContainer";
import Applications from "./candidate/Applications";
import CandidateProfileContainer from "./candidate/CandidateProfileContainer";
import JobsListContainer from "./candidate/JobsListContainer";
import MatchingCompanies from "./candidate/MatchingCompanies";
import CompanyFormsContainer from "./company/ComapnyFormsContainer";
import CompanyDetails from "./company/CompanyDetails";
import AddNewJobOfferContainer from "./company/NewJobOfferContainer";
import JobsOffers from "./job-offers/JobsOffers";

const LayoutSwitcher: FunctionComponent = () => {
  const [cookie] = useCookies(["user"]);
  let user: any = "";
  if (Array.isArray(cookie.user)) {
    user = cookie.user[0];
  } else {
    user = cookie.user;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<App />} />
        <Route
          path={"/loginCompany"}
          element={<LoginContainer user={user} isCompany={true} />}
        />
        <Route path={"/setCompany"} element={<CompanyFormsContainer />} />
        <Route
          path={"/loginCandidate"}
          element={<LoginContainer isCandidate={true} user={user} />}
        />

        <Route
          path={user && user.isCandidate ? "/candidate" : "/"}
          element={
            user && user.isCandidate ? (
              <CandidateProfileContainer user={user} />
            ) : (
              <App />
            )
          }
        />

        <Route
          path={user && user.isCompany ? "/company" : "/"}
          element={
            user && user.isCompany ? <CompanyDetails user={user} /> : <App />
          }
        />
        <Route
          path={user && user.isCompany ? "/companyJobOffers" : "/"}
          element={
            user && user.isCompany ? <JobsOffers user={user} /> : <App />
          }
        />
        <Route
          path={user && user.isCandidate ? "/jobList" : "/"}
          element={
            user && user.isCandidate ? (
              <JobsListContainer user={user} />
            ) : (
              <App />
            )
          }
        />
        <Route
          path={user && user.isCandidate ? "/applications" : "/"}
          element={
            user && user.isCandidate ? <Applications user={user} /> : <App />
          }
        />
        <Route
          path={user && user.isCandidate ? "/matchingCompanies" : "/"}
          element={
            user && user.isCandidate ? (
              <MatchingCompanies user={user} />
            ) : (
              <App />
            )
          }
        />
        <Route
          path={user && user.isCompany ? "/addNewJobOffer" : "/"}
          element={
            user && user.isCompany ? (
              <AddNewJobOfferContainer user={user} />
            ) : (
              <App />
            )
          }
        />
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
};

export default LayoutSwitcher;

import { FunctionComponent } from "react";
import { useCookies } from "react-cookie";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./app/App";
import LoginContainer from "./authentication/LoginContainer";
import Applications from "./candidate/Applications";
import CandidateProfileContainer from "./candidate/CandidateProfileContainer";
import JobsListContainer from "./candidate/JobsListContainer";
import MatchingCompanies from "./candidate/MatchingCompanies";
import CompanyDetails from "./company/CompanyDetails";
import AddNewJobOfferContainer from "./company/NewJobOfferContainer";
import JobsOffers from "./job-offers/JobsOffers";

const LayoutSwitcher: FunctionComponent = () => {
  const [cookie] = useCookies(["user"]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<App />} />
        <Route path={"/login"} element={<LoginContainer />} />
        <Route
          path={"/candidate"}
          element={
            cookie.user ? <CandidateProfileContainer /> : <LoginContainer />
          }
        />
        <Route
          path={"/company"}
          element={
            cookie.user && cookie.user.company ? (
              <CompanyDetails />
            ) : (
              <LoginContainer />
            )
          }
        />
        <Route
          path={"/companyJobOffers"}
          element={
            cookie.user && cookie.user.company ? (
              <JobsOffers />
            ) : (
              <LoginContainer />
            )
          }
        />
        <Route
          path={"/jobList"}
          element={
            cookie.user && cookie.user.candidate ? (
              <JobsListContainer />
            ) : (
              <LoginContainer />
            )
          }
        />
        <Route
          path={"/applications"}
          element={
            cookie.user && cookie.user.candidate ? (
              <Applications />
            ) : (
              <LoginContainer />
            )
          }
        />
        <Route
          path={"/matchingCompanies"}
          element={
            cookie.user && cookie.user.candidate ? (
              <MatchingCompanies />
            ) : (
              <LoginContainer />
            )
          }
        />
        <Route
          path={"/addNewJobOffer"}
          element={
            cookie.user && cookie.user.company ? (
              <AddNewJobOfferContainer />
            ) : (
              <LoginContainer />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default LayoutSwitcher;

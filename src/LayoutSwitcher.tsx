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
  let user: any = "";
  if (cookie.user[0]) user = cookie.user[0];
  if (cookie.user) user = cookie.user;

  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<App />} />
        <Route
          path={"/loginCompany"}
          element={<LoginContainer company={true} />}
        />
        <Route
          path={"/loginCandidate"}
          element={<LoginContainer candidate={true} />}
        />

        <Route
          path={user && user.candidate ? "/candidate" : "/"}
          element={
            user && user.candidate ? <CandidateProfileContainer /> : <App />
          }
        />

        <Route
          path={"/company"}
          element={
            user && user.company ? <CompanyDetails /> : <LoginContainer />
          }
        />
        <Route
          path={"/companyJobOffers"}
          element={user && user.company ? <JobsOffers /> : <LoginContainer />}
        />
        <Route
          path={"/jobList"}
          element={
            user && user.candidate ? <JobsListContainer /> : <LoginContainer />
          }
        />
        <Route
          path={"/applications"}
          element={
            user && user.candidate ? <Applications /> : <LoginContainer />
          }
        />
        <Route
          path={"/matchingCompanies"}
          element={
            user && user.candidate ? <MatchingCompanies /> : <LoginContainer />
          }
        />
        <Route
          path={"/addNewJobOffer"}
          element={
            user && user.company ? (
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

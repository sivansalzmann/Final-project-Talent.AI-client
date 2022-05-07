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
  else if (cookie.user) user = cookie.user;

  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<App />} />
        <Route
          path={"/loginCompany"}
          element={<LoginContainer company={true} user={user} />}
        />
        <Route
          path={"/loginCandidate"}
          element={<LoginContainer candidate={true} user={user} />}
        />

        <Route
          path={user && user.candidate ? "/candidate" : "/"}
          element={
            user && user.candidate ? (
              <CandidateProfileContainer user={user} />
            ) : (
              <App />
            )
          }
        />

        <Route
          path={"/company"}
          element={user && user.company ? <CompanyDetails /> : <App />}
        />
        <Route
          path={"/companyJobOffers"}
          element={user && user.company ? <JobsOffers /> : <App />}
        />
        <Route
          path={"/jobList"}
          element={
            user && user.candidate ? <JobsListContainer user={user} /> : <App />
          }
        />
        <Route
          path={"/applications"}
          element={
            user && user.candidate ? <Applications user={user} /> : <App />
          }
        />
        <Route
          path={"/matchingCompanies"}
          element={user && user.candidate ? <MatchingCompanies /> : <App />}
        />
        <Route
          path={"/addNewJobOffer"}
          element={user && user.company ? <AddNewJobOfferContainer /> : <App />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default LayoutSwitcher;

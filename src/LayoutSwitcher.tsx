import { FunctionComponent, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./app/App";
import LoginContainer from "./authentication/LoginContainer";
import { useCookies } from "react-cookie";
import JobsListContainer from "./candidate/JobsListContainer";
import Applications from "./candidate/Applications";
import CandidateDetails from "./candidate/CandidateDetails";
import { Candidate, Company } from "./types/candidates-types";
import MatchingCompanies from "./candidate/MatchingCompanies";
import CompanyDetails from "./company/CompanyDetails";
import JobsOffers from "./job-offers/JobsOffers";

const LayoutSwitcher: FunctionComponent = () => {
  const [user] = useCookies(["user"]);
  const [candidate, setCandidate] = useState<Candidate>();

  console.log(user.user);
  useEffect(() => {
    fetch(`http://localhost:3000/api/candidate?googleID=${user.user.googleID}`)
      .then((response) => response.json())
      .then((result) => {
        console.log(result[0]);
        setCandidate(result[0]);
      });
  }, [user.user.googleID]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<App />} />
        <Route path={"/login"} element={<LoginContainer />} />
        <Route path={"/candidate"} element={<CandidateDetails user={user} />} />
        <Route path={"/company"} element={<CompanyDetails user={user} />} />
        <Route path={"/companyJobOffers"} element={<JobsOffers />} />
        <Route path={"/applications"} element={<Applications user={user} />} />
        <Route
          path={"/jobList"}
          element={<JobsListContainer candidate={user} />}
        />
        <Route
          path={"/matchingCompanies"}
          element={<MatchingCompanies candidate={user} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default LayoutSwitcher;

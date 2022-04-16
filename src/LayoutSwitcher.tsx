import { FunctionComponent, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./app/App";
import CandidateDashboard from "./candidate/CandidateDashboard";
import Login from "./authentication/Login";
import LoginContainer from "./authentication/LoginContainer";
import { useCookies } from "react-cookie";
import JobsList from "./job-offers/JobsList";
import JobsListContainer from "./candidate/JobsListContainer";
import Applications from "./candidate/Applications";
import CandidateDetails from "./candidate/CandidateDetails";
import { Candidate } from "./types/candidates-types";

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
        <Route path={"/applications"} element={<Applications user={user} />} />
        <Route
          path={"/jobList"}
          element={<JobsListContainer candidate={user} />}
        />
        <Route
          path={"/MatchingCompanies"}
          element={<CandidateDashboard user={user} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default LayoutSwitcher;

import { FC, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useSnapshot } from "valtio";
import Page from "../dashboard/Page";
import AppStore from "../store/store";
import { Candidate } from "../types/candidates-types";
import CandidateProfileIndex from "./Profile";

const CandidateProfileContainer: FC = () => {
  const [cookie, setCookie] = useCookies(["user"]);
  const [candidate, setCandidate] = useState<Candidate>();
  useEffect(() => {
    fetch(
      `http://localhost:3000/api/candidate?googleID=${cookie.user.googleID}`
    )
      .then((response) => response.json())
      .then((result: Candidate) => {
        setCandidate(result[0]);
      });
  }, [cookie.user.googleID]);

  return (
    <Page title="Personal Profile">
      {candidate && <CandidateProfileIndex candidate={candidate} />}
    </Page>
  );
};

export default CandidateProfileContainer;

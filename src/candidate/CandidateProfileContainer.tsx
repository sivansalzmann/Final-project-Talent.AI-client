import { FC, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Page from "../dashboard/Page";
import { Candidate } from "../types/candidates-types";
import CandidateProfileIndex from "./Profile";

const CandidateProfileContainer: FC = () => {
  const [cookie] = useCookies(["user"]);
  let user: any = "";
  if (cookie.user[0]) user = cookie.user[0];
  if (cookie.user) user = cookie.user;

  const [candidate, setCandidate] = useState<Candidate>();
  useEffect(() => {
    fetch(`http://localhost:3000/api/candidate?googleID=${user.googleID}`)
      .then((response) => response.json())
      .then((result: Candidate) => {
        setCandidate(result[0]);
      });
  }, [cookie.user, cookie.user.googleID, user.googleID]);

  return (
    <Page title="Personal Profile">
      {candidate && <CandidateProfileIndex candidate={candidate} user={user} />}
    </Page>
  );
};

export default CandidateProfileContainer;

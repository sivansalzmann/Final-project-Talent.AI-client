import { FC, useEffect, useState } from "react";
import { Cookie } from "universal-cookie";
import Page from "../dashboard/Page";
import { Candidate } from "../types/candidates-types";
import CandidateProfileIndex from "./Profile";

const CandidateProfileContainer: FC<CandidateProfileContainerProps> = ({
  user,
}) => {
  const [candidate, setCandidate] = useState<Candidate>();
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_SERVER}/api/candidate?googleID=${user.googleID}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((result: Candidate) => {
        setCandidate(result[0]);
      });
  }, [user.googleID]);

  return (
    <Page title="Personal Profile">
      {candidate && <CandidateProfileIndex candidate={candidate} user={user} />}
    </Page>
  );
};

export interface CandidateProfileContainerProps {
  user: Cookie;
}

export default CandidateProfileContainer;

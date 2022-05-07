import Page from "../dashboard/Page";
import { FC, useEffect, useState } from "react";
import { JobOffer } from "../types/jobOffer-types";
import { Candidate } from "../types/candidates-types";
import ItemsList from "../ui-components/ItemsList";
import { CircularProgress, Typography } from "@mui/material";
import { useCookies } from "react-cookie";
import { styled } from "@mui/system";

const Applications: FC = () => {
  const [jobOffers, setJobsOffers] = useState<JobOffer[]>();
  const [wait, setWait] = useState(true);
  const [cookie] = useCookies(["user"]);
  const [candidate, setCandidate] = useState<Candidate>();

  let user: any = "";
  if (cookie.user[0]) user = cookie.user[0];
  else if (cookie.user) user = cookie.user;

  useEffect(() => {
    fetch(
      `http://localhost:3000/api/candidate?googleID=${cookie.user.googleID}`
    )
      .then((response) => response.json())
      .then((result: Candidate) => {
        setCandidate(result[0]);
      });
  }, [cookie.user, cookie.user.googleID]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/jobOffer`)
      .then((response) => response.json())
      .then(async (result) => {
        if (candidate) {
          const jobs = await result.filter((jobOffer: JobOffer) => {
            return jobOffer.candidates_id.find((id) => id === candidate._id);
          });
          setWait(false);
          setJobsOffers(jobs);
        }
      });
  }, [candidate, jobOffers]);

  return (
    <Page title={"Your Applications"}>
      {wait && (
        <ApplicationsContainer>
          <CircularProgress />
          <Typography variant="subtitle1">Loading...</Typography>
        </ApplicationsContainer>
      )}
      {candidate && jobOffers && (
        <ItemsList jobs={jobOffers} candidate={candidate} />
      )}
    </Page>
  );
};

const ApplicationsContainer = styled("div")({
  marginLeft: "50%",
  marginTop: "2%",
  display: "flex",
  flexDirection: "column",
});
export interface ApplicationsProps {
  candidate: Candidate;
}

export default Applications;

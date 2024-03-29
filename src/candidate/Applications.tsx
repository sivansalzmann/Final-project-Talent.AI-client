import Page from "../dashboard/Page";
import { FC, useEffect, useState } from "react";
import { JobOffer } from "../types/jobOffer-types";
import { Candidate } from "../types/candidates-types";
import ItemsList from "../ui-components/ItemsList";
import { CircularProgress, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Cookie } from "universal-cookie";

const Applications: FC<ApplicationsProps> = ({ user }) => {
  const [jobOffers, setJobsOffers] = useState<JobOffer[]>();
  const [wait, setWait] = useState(true);
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

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER}/api/jobOffer`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
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
  }, [candidate]);

  return (
    <Page title={"Your applications"}>
      {wait && (
        <ApplicationsContainer>
          <CircularProgress />
          <Typography variant="subtitle1">Loading...</Typography>
        </ApplicationsContainer>
      )}
      {candidate && jobOffers && (
        <ItemsList jobs={jobOffers} candidate={candidate} buttons={true} />
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
  user: Cookie;
}

export default Applications;

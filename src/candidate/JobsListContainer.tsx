import Page from "../dashboard/Page";
import { FC, useEffect, useState } from "react";
import { JobOffer } from "../types/jobOffer-types";
import JobOfferCard from "../job-offers/JobOfferCard";
import { Candidate } from "../types/candidates-types";
import { CircularProgress, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Cookie } from "universal-cookie";

const JobsListContainer: FC<JobsListContainerProps> = ({ user }) => {
  const [jobOffers, setJobsOffers] = useState<JobOffer[]>();
  const [candidate, setCandidate] = useState<Candidate>();
  const [wait, setWait] = useState(true);

  useEffect(() => {
    fetch(`https://52.215.114.42:3000/api/joboffer`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        const filterJobs = result.filter(
          (c: { status: string }) =>
            c.status === "Not have applications" || c.status === "In progress"
        );

        if (filterJobs) {
          setWait(false);
          setJobsOffers(filterJobs);
        }
      });
  }, [candidate]);
  useEffect(() => {
    fetch(`https://52.215.114.42:3000/api/candidate?googleID=${user.googleID}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setCandidate(result[0]);
      });
  }, [user.googleID]);

  return (
    <Page title={"Job Offers"}>
      {wait ? (
        <WaitContainer>
          <CircularProgress />
          <Typography variant="subtitle1">Loading...</Typography>
        </WaitContainer>
      ) : (
        <JobsContainer>
          {jobOffers &&
            candidate &&
            jobOffers.map((job, index) => {
              if (!job.candidates_id.includes(candidate._id)) {
                return (
                  <JobOfferCard
                    jobOffer={job}
                    key={index}
                    candidate={candidate}
                  />
                );
              }
              return <></>;
            })}
        </JobsContainer>
      )}
    </Page>
  );
};

const JobsContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: "2%",
});

const WaitContainer = styled("div")({
  marginLeft: "50%",
  marginTop: "2%",
  display: "flex",
  flexDirection: "column",
});

export interface JobsListContainerProps {
  user: Cookie;
}

export default JobsListContainer;

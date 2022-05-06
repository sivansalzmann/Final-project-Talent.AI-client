import Page from "../dashboard/Page";
import { FC, useEffect, useState } from "react";
import { JobOffer } from "../types/jobOffer-types";
import JobOfferCard from "../job-offers/JobOfferCard";
import { Candidate } from "../types/candidates-types";
import { CircularProgress, Typography } from "@mui/material";
import { useCookies } from "react-cookie";
import { styled } from "@mui/system";

const JobsListContainer: FC = () => {
  const [jobOffers, setJobsOffers] = useState<JobOffer[]>();
  const [candidate, setCandidate] = useState<Candidate>();
  const [wait, setWait] = useState(true);
  const [cookie, setCookie] = useCookies(["user"]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/joboffer`)
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
    fetch(
      `http://localhost:3000/api/candidate?googleID=${cookie.user.googleID}`
    )
      .then((response) => response.json())
      .then((result) => {
        setCandidate(result[0]);
      });
  }, [cookie.user.googleID]);

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
            jobOffers.map((job) => {
              return (
                <JobOfferCard
                  jobOffer={job}
                  key={job.job_title}
                  candidate={candidate}
                />
              );
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

export default JobsListContainer;

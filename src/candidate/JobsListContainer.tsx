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
      .then((result) => {
        setCandidate(result[0]);
      });
  }, [user.googleID]);

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_SERVER}/api/candidate/forAlgo/${candidate?._id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        fetch(`${process.env.REACT_APP_SERVER}/api/joboffer`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
          .then((response) => response.json())
          .then((res) => {
            if (res) {
              const keepRateOrder = res.sort((a, b) => {
                return (
                  result.order.findIndex((p) => p === a.job_company_name) -
                  result.order.findIndex((p) => p === b.job_company_name)
                );
              });
              setJobsOffers(keepRateOrder);
              setWait(false);
            }
          });
      });
  }, [candidate?._id]);

  return (
    <Page title={"Job offers"}>
      {wait ? (
        <WaitContainer>
          <CircularProgress />
          <Typography variant="subtitle1">Loading...</Typography>
        </WaitContainer>
      ) : (
        <JobsContainer>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexFlow: "wrap",
              justifyContent: "center",
            }}
          >
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
                return <div key={index}></div>;
              })}
          </div>
        </JobsContainer>
      )}
    </Page>
  );
};

const JobsContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
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

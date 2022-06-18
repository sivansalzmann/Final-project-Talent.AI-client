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
  const [precents, setPrecents] = useState<Map<string, number>>(new Map());
  const [companies, setCompanies] = useState<string[]>([]);

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
        console.log(result);
        // setPrecents(result.data);
        // setCompanies(Object.keys(result.data).reverse());

        fetch(`${process.env.REACT_APP_SERVER}/api/joboffer`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
          .then((response) => response.json())
          .then((res) => {
            if (res) {
              console.log(res);
              console.log(companies);
              console.log(result.order);
              console.log(precents);
              const keepRateOrder = res.sort((a, b) => {
                return (
                  result.order.findIndex((p) => p === a.job_company_name) -
                  result.order.findIndex((p) => p === b.job_company_name)
                );
              });
              setJobsOffers(keepRateOrder);
              console.log(keepRateOrder);
              setWait(false);
            }
          });
      });
  }, [candidate?._id]);

  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_SERVER}/api/joboffer`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((result) => {
  //       if (result) {
  //         console.log(companies);
  //         console.log(result);
  //         console.log(precents);
  //         if (companies.length > 0) {

  //           setWait(false);
  //           const keepRateOrder = result.sort((a, b) => {
  //             return (
  //               companies.findIndex((p) => p === a.job_company_name) -
  //               companies.findIndex((p) => p === b.job_company_name)
  //             );
  //           });
  //           setJobsOffers(keepRateOrder);
  //           console.log(keepRateOrder);
  //         }
  //       }
  //     });
  // }, [candidate]);

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
                return <></>;
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

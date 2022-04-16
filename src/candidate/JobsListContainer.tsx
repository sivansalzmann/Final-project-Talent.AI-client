import { useTheme } from "@mui/material/styles";
import JobsList from "../job-offers/JobsList";
import Page from "../dashboard/Page";
import { Divider, Typography } from "@mui/material";
import Card from "../job-offers/JobOfferCard";
import { useEffect, useState } from "react";
import { JobOffer } from "../types/jobOffer-types";
import JobsOffers from "../job-offers/JobsOffers";
import JobOfferCard from "../job-offers/JobOfferCard";

const JobsListContainer = ({ candidate }) => {
  const [jobOffers, setJobsOffers] = useState<JobOffer[]>();

  useEffect(() => {
    fetch(`http://localhost:3000/api/joboffer`)
      .then((response) => response.json())
      .then((result) => {
        const filterJobs = result.filter(
          (c: { status: string }) =>
            c.status === "Not have applications" || c.status === "In progress"
        );
        if (filterJobs) {
          setJobsOffers(filterJobs);
        }
      });
  }, []);
  return (
    <Page title={"Job Offers"}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "2%",
        }}
      >
        {jobOffers &&
          jobOffers.map((job) => {
            return <JobOfferCard jobOffer={job} key={job.job_title} />;
          })}
      </div>
    </Page>
  );
};

export default JobsListContainer;

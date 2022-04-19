import Page from "../dashboard/Page";
import { useEffect, useState } from "react";
import { JobOffer } from "../types/jobOffer-types";
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
            return (
              <JobOfferCard
                jobOffer={job}
                key={job.job_title}
                candidate={candidate}
              />
            );
          })}
      </div>
    </Page>
  );
};

export default JobsListContainer;

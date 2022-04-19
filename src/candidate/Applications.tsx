import { useTheme } from "@mui/material/styles";
import JobsList from "../job-offers/JobsList";
import Page from "../dashboard/Page";
import { Divider, Typography } from "@mui/material";
import Card from "../job-offers/JobOfferCard";
import { useEffect, useState } from "react";
import { JobOffer } from "../types/jobOffer-types";
import JobsOffers from "../job-offers/JobsOffers";
import JobOfferCard from "../job-offers/JobOfferCard";
import MatchingJobsToCandidate from "./MatchingJobsToCandidate";
import { Candidate } from "../types/candidates-types";
import List from "../ui-components/List";
import ItemsList from "../ui-components/ItemsList";

const Applications = ({ user }) => {
  const [jobOffers, setJobsOffers] = useState<JobOffer[]>();
  const [candidate, setCandidate] = useState<Candidate>();
  const [userID, setUserID] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/api/candidate?googleID=${user.user.googleID}`)
      .then((response) => response.json())
      .then((result) => {
        setCandidate(result[0]);
        setUserID(result[0]._id.toString());
      });
  }, [user.googleID, user.user.googleID, userID]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/jobOffer`)
      .then((response) => response.json())
      .then(async (result) => {
        const jobs = await result.filter((jobOffer: JobOffer) => {
          return jobOffer.candidates_id.find((id) => id === userID);
        });
        setJobsOffers(jobs);
      });
  }, [candidate, userID]);

  return (
    <Page title={"Your Applications"}>
      {jobOffers && <ItemsList jobs={jobOffers} company={false} />}
    </Page>
  );
};

export default Applications;

import Page from "../dashboard/Page";
import { useEffect, useState } from "react";
import { JobOffer } from "../types/jobOffer-types";
import { Candidate } from "../types/candidates-types";
import ItemsList from "../ui-components/ItemsList";
import { CircularProgress, Typography } from "@mui/material";

const Applications = ({ user }) => {
  const [jobOffers, setJobsOffers] = useState<JobOffer[]>();
  const [candidate, setCandidate] = useState<Candidate>();
  const [userID, setUserID] = useState("");
  const [wait, setWait] = useState(true);

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
        setWait(false);
        setJobsOffers(jobs);
      });
  }, [candidate, userID]);

  return (
    <Page title={"Your Applications"}>
      {wait && (
        <div
          style={{
            marginLeft: "50%",
            marginTop: "2%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CircularProgress />
          <Typography variant="subtitle1" fontFamily="Anek Odia">
            Loading...
          </Typography>
        </div>
      )}
      {jobOffers && (
        <ItemsList
          jobs={jobOffers}
          company={false}
          candidates={undefined}
          candidate={candidate}
        />
      )}
    </Page>
  );
};

export default Applications;

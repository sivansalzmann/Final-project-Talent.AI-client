import { JobOffer } from "../types/jobOffer-types";
import Page from "../dashboard/Page";
import { FC, useEffect, useState } from "react";
import ItemList from "../ui-components/ItemsList";
import { CircularProgress, Typography } from "@mui/material";
import { useCookies } from "react-cookie";

const JobsOffers: FC<JobOfferProps> = () => {
  const [cookie, setCookie] = useCookies(["user"]);
  const [jobOffers, setJobOffers] = useState<JobOffer[]>();
  const [wait, setWait] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/api/joboffer?job_company_name=facebook`)
      .then((response) => response.json())
      .then((result) => {
        setWait(false);
        setJobOffers(result);
      });
  }, []);

  const handleEditJobOffer = (jobOffer: JobOffer, update: Object) => {
    fetch(`http://localhost:3000/api/joboffer/${jobOffer._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        updateJobOffer: update,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      });
  };

  const handleDeleteJobOffer = (jobOffer: JobOffer) => {
    fetch(`http://localhost:3000/api/joboffer/${jobOffer._id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((result) => {});
  };

  return (
    <Page title={"Job offers"}>
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
      {/* {jobOffers && (
        <ItemList
          jobs={jobOffers}
          company={true}
          candidates={undefined}
        />
      )} */}
    </Page>
  );
};

export interface JobOfferProps {}
export default JobsOffers;

import { JobOffer } from "../types/jobOffer-types";
import Page from "../dashboard/Page";
import { useEffect, useState } from "react";
import ItemList from "../ui-components/ItemsList";

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

const JobsOffers = () => {
  const [jobOffers, setJobOffers] = useState<JobOffer[]>();

  useEffect(() => {
    fetch(`http://localhost:3000/api/joboffer?job_company_name=facebook`)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setJobOffers(result);
      });
  }, []);
  return (
    <Page title={"Job offers"}>
      {jobOffers && (
        <ItemList jobs={jobOffers} company={true} candidates={undefined} />
      )}
    </Page>
  );
};
export default JobsOffers;

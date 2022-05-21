import { JobOffer } from "../types/jobOffer-types";
import Page from "../dashboard/Page";
import { FC, useEffect, useState } from "react";
import ItemList from "../ui-components/ItemsList";
import { CircularProgress, Typography } from "@mui/material";
import { Cookie } from "universal-cookie";
import { CompanyUser } from "../types/companyUser-types";

const JobsOffers: FC<JobOffersProps> = ({ user }) => {
  const [jobOffers, setJobOffers] = useState<JobOffer[]>();
  const [wait, setWait] = useState(true);
  const [companyUser, setCompanyUser] = useState<CompanyUser>();

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_SERVER}/api/companyUsers?googleID=${user.googleID}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        setWait(false);
        setCompanyUser(result);
      });
  }, [user, user.companyName]);

  useEffect(() => {
    if (companyUser) {
      console.log(companyUser);
      fetch(
        `${process.env.REACT_APP_SERVER}/api/joboffer?job_company_name=${companyUser[0].company_name}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((result) => {
          setWait(false);
          setJobOffers(result);
          console.log(result);
        });
    }
  }, [companyUser, user.companyName]);

  // const handleEditJobOffer = (jobOffer: JobOffer, update: Object) => {
  //   fetch(`${process.env.REACT_APP_SERVER}/api/joboffer/${jobOffer._id}`, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       updateJobOffer: update,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((result) => {
  //       console.log(result);
  //     });
  // };

  // const handleDeleteJobOffer = (jobOffer: JobOffer) => {
  //   fetch(`${process.env.REACT_APP_SERVER}/api/joboffer/${jobOffer._id}`, {
  //     method: "DELETE",
  //   })
  //     .then((response) => response.json())
  //     .then((result) => {});
  // };

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
          <Typography variant="subtitle1">Loading...</Typography>
        </div>
      )}
      {jobOffers && <ItemList jobs={jobOffers} company buttons />}
    </Page>
  );
};

export interface JobOffersProps {
  user?: Cookie;
  jobs?: JobOffer[];
}

export default JobsOffers;

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
        if (Array.isArray(result)) {
          setCompanyUser(result[0]);
        } else {
          setCompanyUser(result);
        }
      });
  }, [user, user.companyName]);

  useEffect(() => {
    if (companyUser) {
      fetch(
        `${process.env.REACT_APP_SERVER}/api/joboffer?job_company_name=${companyUser.company_name}`,
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
        });
    }
  }, [companyUser, user.companyName]);

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

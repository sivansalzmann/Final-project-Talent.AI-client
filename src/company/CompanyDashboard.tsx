import { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
// import CompanyCard from "../../views/dashboard/Company/CompanyCard";
import JobOffers from "../job-offers/JobsOffers";
import { Company, JobOffer } from "../types/candidates-types";
import PopUpForms from "../forms/PopupForms";
// import ApexBarChart from "views/forms/chart/Apexchart/ApexBarChart";
import MainCard from "../ui-components/MainCard";
import JobOfferForm from "./JobOfferForm";
import Page from "../dashboard/Page";
import CompanyCard from "./CompanyCard";

const CompanyDashboard = ({ user }) => {
  useEffect(() => {
    fetch(`http://localhost:3000/api/company/62383e7efac2bb1e310007dc`)
      .then((response) => response.json())
      .then((result) => {
        setCompany(result);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/api/joboffer?job_company_name=facebook`)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setJobOffers(result);
      });
  }, []);

  const [company, setCompany] = useState<Company>();
  const [jobOffers, setJobOffers] = useState<JobOffer[]>();

  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Page>
      <Box display="flex" flexDirection="row">
        <Box display="flex" flexDirection="column" sx={{ marginRight: "2%" }}>
          <JobOffers jobOffers={jobOffers} />
          <Box
            sx={{
              marginTop: "2%",
              margin: "2%",
              marginBottom: "2%",
            }}
          >
            <JobOfferForm company={company} />
          </Box>
        </Box>
        <Box display="flex" flexDirection="column">
          {company ? (
            <CompanyCard company={company} isLoading={isLoading} />
          ) : null}
        </Box>
      </Box>
    </Page>
  );
};

export default CompanyDashboard;

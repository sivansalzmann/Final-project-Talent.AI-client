import { useEffect, useState } from "react";
import { Box } from "@mui/material";
// import CompanyCard from "../../views/dashboard/Company/CompanyCard";
import JobOffers from "../job-offers/JobsOffers";
import { Company, JobOffer } from "../types/candidates-types";
import PopUpForms from "../forms/PopupForms";
// import ApexBarChart from "views/forms/chart/Apexchart/ApexBarChart";
import MainCard from "../ui-components/MainCard";
import JobOfferForm from "./JobOfferForm";

const CompanyDashboard = () => {
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
    <Box display="flex" flexDirection="row">
      <Box display="flex" flexDirection="column" sx={{ marginRight: "1%" }}>
        <JobOffers jobOffers={jobOffers} />
        <MainCard title="Candidates for positions" sx={{ marginTop: "1%" }}>
          {/* <ApexBarChart /> */}
        </MainCard>
      </Box>
      <Box display="flex" flexDirection="column">
        {/* {company ? (
          <CompanyCard company={company} isLoading={isLoading} />
        ) : null} */}
        {/* <PopUpForms formType={"newJob"} candidate={null} company={company} /> */}
        <MainCard title="New job offer" sx={{ marginTop: "1%" }}>
          <JobOfferForm company={company} />
        </MainCard>
      </Box>
    </Box>
  );
};

export default CompanyDashboard;

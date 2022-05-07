import { FC, useEffect, useState } from "react";
import Page from "../dashboard/Page";
import { Company } from "../types/company-types";
import JobOfferForm from "./JobOfferForm";

const AddNewJobOfferContainer: FC = () => {
  const [company, setCompany] = useState<Company>();

  useEffect(() => {
    fetch(`http://localhost:3000/api/company/62383e7efac2bb1e310007dc`)
      .then((response) => response.json())
      .then((result) => {
        setCompany(result);
      });
  }, []);

  return (
    <Page title={"Add new job offer"}>
      <JobOfferForm company={company} />
    </Page>
  );
};

export default AddNewJobOfferContainer;

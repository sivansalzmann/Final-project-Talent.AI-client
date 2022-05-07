import CompanyProfile from "./CompanyProfile";
import Page from "../dashboard/Page";
import { FC, useEffect, useState } from "react";
import { Company } from "../types/company-types";

const CompanyDetails: FC = () => {
  const [company, setCompany] = useState<Company>();

  useEffect(() => {
    fetch(`http://localhost:3000/api/company/62383e7efac2bb1e310007dc`)
      .then((response) => response.json())
      .then((result) => {
        setCompany(result);
      });
  }, []);

  return (
    <Page title={"Company"}>
      {company && <CompanyProfile company={company} />}
    </Page>
  );
};

export default CompanyDetails;

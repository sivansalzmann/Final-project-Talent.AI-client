import CompanyProfile from "./CompanyProfile";
import Page from "../dashboard/Page";
import { FC, useEffect, useState } from "react";
import { Company } from "../types/company-types";
import { Cookie } from "universal-cookie";

const CompanyDetails: FC<CompanyDetailsProps> = ({ user }) => {
  const [company, setCompany] = useState<Company>();
  const [wait, setWait] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/api/company?company_name=${user.companyName}`)
      .then((response) => response.json())
      .then((result) => {
        setWait(false);
        setCompany(result[0]);
      });
  }, [user, user.companyName]);

  return (
    <Page title={"Company"}>
      {company && <CompanyProfile company={company} />}
    </Page>
  );
};

export interface CompanyDetailsProps {
  user: Cookie;
}

export default CompanyDetails;

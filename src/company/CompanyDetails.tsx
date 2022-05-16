import CompanyProfile from "./CompanyProfile";
import Page from "../dashboard/Page";
import { FC, useEffect, useState } from "react";
import { Company } from "../types/company-types";
import { Cookie } from "universal-cookie";
import styled from "@emotion/styled";
import { CircularProgress, Typography } from "@mui/material";
import { CompanyUser } from "../types/companyUser-types";

const CompanyDetails: FC<CompanyDetailsProps> = ({ user }) => {
  const [company, setCompany] = useState<Company>();
  const [companyUser, setCompanyUser] = useState<CompanyUser>();
  const [wait, setWait] = useState(true);

  useEffect(() => {
    fetch(
      `http://52.215.114.42:3000/api/companyUsers?googleID=${user.googleID}`
    )
      .then((response) => response.json())
      .then((result) => {
        setWait(false);
        setCompanyUser(result);
      });
  }, [user, user.companyName]);

  useEffect(() => {
    console.log(companyUser);
    if (companyUser) {
      fetch(
        `http://52.215.114.42:3000/api/company?company_name=${companyUser[0].company_name}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result[0]);
          setWait(false);
          setCompany(result[0]);
        });
    }
  }, [companyUser, companyUser?.company_name, user, user.companyName]);

  return (
    <Page title={"Company"}>
      {wait ? (
        <WaitContainer>
          <CircularProgress />
          <Typography variant="subtitle1">Loading...</Typography>
        </WaitContainer>
      ) : (
        <>{company && <CompanyProfile company={company} />}</>
      )}
    </Page>
  );
};

const WaitContainer = styled("div")({
  marginLeft: "50%",
  marginTop: "2%",
  display: "flex",
  flexDirection: "column",
});

export interface CompanyDetailsProps {
  user: Cookie;
}

export default CompanyDetails;

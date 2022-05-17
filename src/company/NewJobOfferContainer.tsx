import styled from "@emotion/styled";
import { CircularProgress, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Cookie } from "universal-cookie";
import Page from "../dashboard/Page";
import { Company } from "../types/company-types";
import { CompanyUser } from "../types/companyUser-types";
import JobOfferForm from "./JobOfferForm";

const AddNewJobOfferContainer: FC<AddNewJobOfferContainerProps> = ({
  user,
}) => {
  const [company, setCompany] = useState<Company[]>();
  const [wait, setWait] = useState(true);
  const [companyUser, setCompanyUser] = useState<CompanyUser>();

  useEffect(() => {
    fetch(`https://52.215.114.42:3000/api/companyUsers/${user.googleID}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(companyUser);
        setCompanyUser(result);
      });
  }, [companyUser, user.googleID]);

  useEffect(() => {
    if (companyUser) {
      fetch(
        `https://52.215.114.42:3000/api/company?comapny_name=${companyUser[0].company_name}`,
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
          setCompany(result);
          console.log(result);
        });
    }
  }, [companyUser, user.companyName]);

  return (
    <Page title={"Add new job offer"}>
      {wait ? (
        <WaitContainer>
          <CircularProgress />
          <Typography variant="subtitle1">Loading...</Typography>
        </WaitContainer>
      ) : (
        <>{company && company[0] && <JobOfferForm company={company[0]} />}</>
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

export interface AddNewJobOfferContainerProps {
  user: Cookie;
}

export default AddNewJobOfferContainer;

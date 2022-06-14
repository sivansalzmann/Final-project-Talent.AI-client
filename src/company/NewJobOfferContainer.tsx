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
  const [company, setCompany] = useState<Company>();
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
        setCompanyUser(result[0]);
      });
  }, [user.googleID]);

  useEffect(() => {
    if (companyUser) {
      fetch(
        `${process.env.REACT_APP_SERVER}/api/company?company_name=${companyUser.company_name}`,
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
          setCompany(result[0]);
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
        <>{company && <JobOfferForm company={company} />}</>
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

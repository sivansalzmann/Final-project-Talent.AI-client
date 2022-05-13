import { Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { FC, useState } from "react";
import { Company } from "../../types/company-types";
import SendIcon from "@mui/icons-material/Send";
import LoginContainer from "../../authentication/LoginContainer";
import {
  setIsCompany,
  setStoreCompanyName,
} from "../../store/app-store-actions";
import { Link as RouterLink } from "react-router-dom";
import { chooseCompany } from "../../store/load-app-actions";

const ChooseCompany: FC<ChooseCompaniesProps> = ({ companies }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#ebf5f9",
        width: "30%",
        marginLeft: "35%",
        borderRadius: "5%",
        boxShadow: "1px 3px 1px ##ebf5f9",
      }}
    >
      <div
        style={{
          height: "auto",
          display: "flex",
          flexDirection: "column",
          margin: "5%",
        }}
      >
        <Typography variant="h5">Choose your company</Typography>

        {companies.map((company, index) => {
          return (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  size="small"
                  value={company.name}
                  onChange={(e) => chooseCompany(e.target.value)}
                />
              }
              label={
                <Typography variant="subtitle2" mt={0.8}>
                  {company.name}
                </Typography>
              }
            />
          );
        })}
        <Button
          size="small"
          sx={{ display: "flex", justifyContent: "left", fontSize: "12px" }}
          color="primary"
        >
          Click here to add new company
        </Button>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "right",
            marginTop: "7%",
          }}
        >
          <Button
            component={RouterLink}
            to="/loginCompany"
            variant="contained"
            onClick={setIsCompany}
            startIcon={<SendIcon />}
            sx={{ width: "40%", alignItems: "right" }}
          />
        </div>
      </div>
    </div>
  );
};

export interface ChooseCompaniesProps {
  companies: Company[];
}
export default ChooseCompany;

import {
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { FC, useState } from "react";
import { Company } from "../../types/company-types";
import SendIcon from "@mui/icons-material/Send";
import LoginContainer from "../../authentication/LoginContainer";
import {
  setIsCompany,
  setStoreCompanyName,
} from "../../store/app-store-actions";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { chooseCompany } from "../../store/load-app-actions";
import { Cookie } from "universal-cookie";

const ChooseCompany: FC<ChooseCompaniesProps> = ({
  companies,
  user,
  companyName,
  setCompanyName,
  rule,
  setRule,
  handleAddCompanyUser,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#ebf5f9",
        width: "90%",
        marginLeft: "5%",
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
        <div style={{ display: "flex", flexDirection: "column", width: "40%" }}>
          {companies.map((company, index) => {
            return (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    size="small"
                    value={company.name}
                    onChange={(e) => setCompanyName(e.target.value)}
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
        </div>
        <Button
          size="small"
          sx={{
            display: "flex",
            justifyContent: "left",
            fontSize: "12px",
            width: "200px",
          }}
          color="primary"
        >
          Click here to add new company
        </Button>
        <Typography sx={{ m: 1 }} variant="subtitle2" fontWeight="bold">
          Enter your rule
        </Typography>
        <TextField
          label="Rule"
          sx={{ width: "25ch" }}
          InputProps={{
            startAdornment: <InputAdornment position="start" />,
          }}
          onChange={(e) => {
            setRule(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export interface ChooseCompaniesProps {
  companies: Company[];
  user: Cookie;
  setOpenAddPopUp: (open: boolean) => void;
  rule: string;
  setRule: (rule: string) => void;
  companyName: string;
  setCompanyName: (companyName: string) => void;
  handleAddCompanyUser: () => void;
}
export default ChooseCompany;

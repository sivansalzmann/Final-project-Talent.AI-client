import { Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { FC, useState } from "react";
import { Company } from "../../types/company-types";
import SendIcon from "@mui/icons-material/Send";
import { Link, Link as RouterLink } from "react-router-dom";
import LoginContainer from "../../authentication/LoginContainer";

const ChooseCompany: FC<ChooseCompaniesProps> = ({ companies }) => {
  const [selectedCompany, setSelectedCompany] = useState("");
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#ebf5f9",
        width: "30%",
        marginLeft: "35%",
      }}
    >
      <div
        style={{
          height: "auto",
          display: "flex",
          flexDirection: "column",
          margin: "10px",
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
                  onChange={(e) => setSelectedCompany(e.target.value)}
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button size="small" sx={{ width: "50%" }}>
            Click here to add new company
          </Button>
          <Link
            to={{
              pathname: "/loginCompany",
              //company: true,

              //   state: {
              //     company: true,
              //     companyName: selectedCompany,
              //     user: undefined,
              //   },
            }}
          >
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              sx={{ width: "40%", alignItems: "right" }}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export interface ChooseCompaniesProps {
  companies: Company[];
}
export default ChooseCompany;

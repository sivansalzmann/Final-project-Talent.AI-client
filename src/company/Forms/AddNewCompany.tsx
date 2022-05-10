import { InputAdornment, TextField } from "@mui/material";
import { styled } from "@mui/system";
import { FC } from "react";

const AddNewCompany: FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <RowDiv>
        <TextField
          label="Company name"
          disabled
          sx={{ m: 1, width: "35ch" }}
          InputProps={{
            startAdornment: <InputAdornment position="start" />,
          }}
        />
      </RowDiv>
    </div>
  );
};

const RowDiv = styled("div")({
  display: "flex",
  flexDirection: "row",
});
export default AddNewCompany;

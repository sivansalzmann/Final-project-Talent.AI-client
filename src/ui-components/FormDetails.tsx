import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import { Cookie } from "universal-cookie";
import SelectDialog from "./SelectDialog";
import DynamicForm from "./DynamicForm";

const FormDetails = ({
  candidate,
  company,
  user,
  setIndustry,
  setBirthDay,
  setBirthYear,
}: FormDetailsProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", flexDirection: "row" }}>
        <TextField
          label="First name"
          disabled
          value={user[0].first_name}
          sx={{ m: 1, width: "35ch" }}
          InputProps={{
            startAdornment: <InputAdornment position="start" />,
          }}
        />
        <TextField
          label="Last name"
          disabled
          value={user[0].last_name}
          sx={{ m: 1, width: "35ch" }}
          InputProps={{
            startAdornment: <InputAdornment position="start" />,
          }}
        />
      </div>
      <TextField
        label="Email"
        disabled
        value={user[0].email}
        sx={{ m: 1, width: "35ch" }}
        InputProps={{
          startAdornment: <InputAdornment position="start" />,
        }}
      />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <TextField
          label="Birth year"
          sx={{ m: 1 }}
          InputProps={{
            startAdornment: <InputAdornment position="start" />,
          }}
          onChange={(eve) => setBirthYear(eve.target.value)}
        />
        <TextField
          label="Birth date"
          sx={{ m: 1 }}
          InputProps={{
            startAdornment: <InputAdornment position="start" />,
          }}
          onChange={(eve) => setBirthDay(eve.target.value)}
        />
        <FormControl>
          <InputLabel>Industry</InputLabel>
          <Select
            label="Industry"
            value="Industry"
            sx={{ m: 1, width: "15ch" }}
            onChange={(e) => setIndustry(e.target.value)}
          >
            <MenuItem value={"Internet"}>Internet</MenuItem>
            <MenuItem value={"Computer software"}>Computer software</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="subtitle1" fontFamily="Anek Odia" ml={1.5}>
            Gender
          </Typography>
          <FormGroup sx={{ display: "flex", flexDirection: "row", ml: 1 }}>
            <FormControlLabel
              control={<Checkbox />}
              label={
                <Typography variant="subtitle2" fontFamily="Anek Odia" ml={1.5}>
                  Male
                </Typography>
              }
            />
            <FormControlLabel
              control={<Checkbox />}
              label={
                <Typography variant="subtitle2" fontFamily="Anek Odia" ml={1.5}>
                  Female
                </Typography>
              }
            />
          </FormGroup>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <SelectDialog
          candidate={undefined}
          skillsSelected={undefined}
          jobOffer={undefined}
          interests={false}
        />
        <SelectDialog
          candidate={undefined}
          skillsSelected={undefined}
          jobOffer={undefined}
          interests={true}
        />
      </div>
      <DynamicForm experienceForm={true} />
      <DynamicForm educationForm={true} />
    </div>
  );
};

export interface FormDetailsProps {
  candidate?: boolean;
  company?: boolean;
  user: Cookie;
  setIndustry: (industry: string) => void;
  setBirthDay: (industry: string) => void;
  setBirthYear: (industry: string) => void;
}

export default FormDetails;

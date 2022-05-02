import { FC } from "react";
import {
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
import InputAdornment from "@mui/material/InputAdornment";
import { Cookie } from "universal-cookie";
import SelectDialog from "./SelectDialog";
import DynamicForm from "./DynamicForm";
import { styled } from "@mui/system";

const FormDetails: FC<FormDetailsProps> = ({
  candidate,
  company,
  user,
  setIndustry,
  setBirthDay,
  setBirthYear,
  setGender,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <RowDiv>
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
      </RowDiv>
      <TextField
        label="Email"
        disabled
        value={user[0].email}
        sx={{ m: 1, width: "35ch" }}
        InputProps={{
          startAdornment: <InputAdornment position="start" />,
        }}
      />
      <RowDiv>
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
      </RowDiv>
      <RowDiv>
        <ColumnDiv>
          <Typography variant="subtitle1" ml={1.5}>
            Gender
          </Typography>
          <FormGroup sx={{ display: "flex", flexDirection: "row", ml: 1 }}>
            <FormControlLabel
              control={<Checkbox />}
              label={
                <Typography variant="subtitle2" ml={1.5}>
                  Male
                </Typography>
              }
            />
            <FormControlLabel
              control={<Checkbox />}
              label={
                <Typography variant="subtitle2" ml={1.5}>
                  Female
                </Typography>
              }
            />
          </FormGroup>
        </ColumnDiv>
      </RowDiv>
      <RowDiv>
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
      </RowDiv>
      <DynamicForm experienceForm={true} />
      <DynamicForm educationForm={true} />
    </div>
  );
};

const RowDiv = styled("div")({
  display: "flex",
  flexDirection: "row",
});

const ColumnDiv = styled("div")({
  display: "flex",
  flexDirection: "column",
});

export interface FormDetailsProps {
  candidate?: boolean;
  company?: boolean;
  user: Cookie;
  setIndustry: (industry: string) => void;
  setBirthDay: (industry: string) => void;
  setBirthYear: (industry: string) => void;
  setGender: (industry: string) => void;
}

export default FormDetails;

import { FC, useState } from "react";
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
import { Education, ExperienceInput } from "../types/jobOffer-types";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const FormDetails: FC<FormDetailsProps> = ({
  candidate,
  company,
  user,
  setIndustry,
  setBirthDay,
  setGender,
  setSkills,
  setInterests,
  experience,
  education,
  skills,
  interests,
}) => {
  const [birthDateValue, setBirthDayValue] = useState(new Date());
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
      <RowDiv>
        <TextField
          label="Email"
          disabled
          value={user[0].email}
          sx={{ m: 1, width: "35ch" }}
          InputProps={{
            startAdornment: <InputAdornment position="start" />,
          }}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            clearable
            label="Birth day"
            minDate={new Date("1940-01-01")}
            onChange={(date) => {
              setBirthDay(date);
              if (date) setBirthDayValue(date);
            }}
            value={birthDateValue}
            renderInput={(params) => (
              <TextField {...params} sx={{ m: 1, width: "35ch" }} />
            )}
          />
        </LocalizationProvider>
      </RowDiv>
      <RowDiv>
        <FormControl>
          <InputLabel>Industry</InputLabel>
          <Select
            label="Industry"
            defaultValue="Industry"
            sx={{ m: 1, width: "29ch" }}
            onChange={(e) => setIndustry(e.target.value)}
          >
            <MenuItem value={"Internet"}>Internet</MenuItem>
            <MenuItem value={"Computer software"}>Computer software</MenuItem>
          </Select>
        </FormControl>
        <ColumnDiv>
          <Typography variant="subtitle1" ml={1.5}>
            Gender
          </Typography>
          <FormGroup sx={{ display: "flex", flexDirection: "row", ml: 1 }}>
            <FormControlLabel
              control={<Checkbox onChange={() => setGender("Male")} />}
              label={
                <Typography variant="subtitle2" ml={1.5}>
                  Male
                </Typography>
              }
            />
            <FormControlLabel
              control={<Checkbox onChange={() => setGender("Female")} />}
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
          newCandidate={true}
          isSkills={true}
          setSkills={setSkills}
          selectSkills={skills}
        />

        <SelectDialog
          isInterests={true}
          newCandidate={true}
          setInterests={setInterests}
          selectInterests={interests}
        />
      </RowDiv>
      <RowDiv>
        {skills.length > 0 && (
          <div>
            <Typography variant="subtitle1" m={1}>
              Selected skills:
            </Typography>
            {skills.map((skill, index) => (
              <Typography key={index} variant="subtitle2" ml={1}>
                {skill}
              </Typography>
            ))}
          </div>
        )}
        {interests.length > 0 && (
          <div>
            <Typography variant="subtitle1" m={1}>
              Selected interests:
            </Typography>
            {interests.map((interest, index) => (
              <Typography key={index} variant="subtitle2" ml={1}>
                {interest}
              </Typography>
            ))}
          </div>
        )}
      </RowDiv>
      <DynamicForm
        experienceForm={true}
        experience={experience}
        education={education}
      />
      <DynamicForm
        educationForm={true}
        education={education}
        experience={experience}
      />
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
  setBirthDay: (date: Date | null) => void;
  setGender: (gender: string) => void;
  setSkills: (skills: string[]) => void;
  setInterests: (interests: string[]) => void;
  skills: string[];
  experience: ExperienceInput[];
  education: Education[];
  interests: string[];
}

export default FormDetails;

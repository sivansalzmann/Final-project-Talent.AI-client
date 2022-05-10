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
import DynamicFormEducation from "./DynamicFormEducation";
import { styled } from "@mui/system";
import { Education, ExperienceInput } from "../../types/jobOffer-types";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import DynamicFormExperience from "./DynamicFormExperience";
import { dateAsDate } from "../../app-utils";

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
  experienceFields,
  setExperienceFields,
  addFormFieldsExperience,
  educationFields,
  setEducationFields,
  addFormFieldsEducation,
  selectedDegrees,
  setPersonalInfo,
  setJobTitle,
  setJobTitleLevels,
  setJobTitleRole,
  setJobTitleSubRole,
  setJobCompany,
  setJobStartDate,
  levels,
  levelsInput,
  setLevelsInput,
}) => {
  const [birthDateValue, setBirthDayValue] = useState(new Date());
  const jobLevels = ["Senior", "Junior", "Intern"];

  const [jobStartDateInput, setJobStartDateInput] = useState(new Date());
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
          value={user.first_name}
          sx={{ m: 1, width: "35ch" }}
          InputProps={{
            startAdornment: <InputAdornment position="start" />,
          }}
        />
        <TextField
          label="Last name"
          disabled
          value={user.last_name}
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
          value={user.email}
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
              if (date) {
                setBirthDay(date);
                setBirthDayValue(date);
              }
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
            defaultValue={"Internet"}
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
          <div style={{ marginLeft: "90px" }}>
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
      <div>
        <Typography m={1}>Current job</Typography>
        <TextField
          name="company_name"
          label="Company name"
          sx={{ m: 1, width: "25ch" }}
          InputProps={{
            startAdornment: <InputAdornment position="start" />,
          }}
          onChange={(e) => {
            setJobCompany(e.target.value);
          }}
        />
        <TextField
          name="title_name"
          label="Title name"
          sx={{ m: 1, width: "25ch" }}
          InputProps={{
            startAdornment: <InputAdornment position="start" />,
          }}
          onChange={(e) => {
            setJobTitle(e.target.value);
          }}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="Start date"
            minDate={new Date("1990-01-01")}
            value={jobStartDateInput}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{ m: 1, width: "25ch" }}
                name="start_date"
              />
            )}
            onChange={(date) => {
              if (date) {
                setJobStartDate(dateAsDate(date));
                setJobStartDateInput(date);
              }
            }}
          />
        </LocalizationProvider>
        <TextField
          name="title_role"
          label="Title role"
          sx={{ m: 1, width: "25ch" }}
          InputProps={{
            startAdornment: <InputAdornment position="start" />,
          }}
          onChange={(e) => {
            setJobTitleRole(e.target.value);
          }}
        />
        <div style={{ display: "flex", flexDirection: "row" }}>
          <TextField
            name="title_role"
            label="Title sub role"
            sx={{ m: 1, width: "25ch" }}
            InputProps={{
              startAdornment: <InputAdornment position="start" />,
            }}
            onChange={(e) => {
              setJobTitleSubRole(e.target.value);
            }}
          />
          <div style={{ width: "30ch", marginLeft: "10px" }}>
            <Typography variant="subtitle1">Levels</Typography>
            <div>
              {jobLevels.map((level, index) => {
                return (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        size="small"
                        name="title_levels"
                        value={level}
                        onChange={(e) => {
                          setJobTitleLevels([...levels, e.target.value]);
                        }}
                      />
                    }
                    label={<Typography variant="body2">{level}</Typography>}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <DynamicFormExperience
        experienceFields={experienceFields}
        setExperienceFields={setExperienceFields}
        addFormFieldsExperience={addFormFieldsExperience}
        //levelsInput={levelsInput}
        //setLevelsInput={setLevelsInput}
      />
      <DynamicFormEducation
        educationFields={educationFields}
        setEducationFields={setEducationFields}
        addFormFieldsEducation={addFormFieldsEducation}
      />
      <TextField
        label="Personal info"
        sx={{ m: 1 }}
        multiline
        rows={4}
        fullWidth
        InputProps={{
          startAdornment: <InputAdornment position="start" />,
        }}
        onChange={(eve) => setPersonalInfo(eve.target.value)}
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
  setBirthDay: (date: Date) => void;
  setGender: (gender: string) => void;
  setSkills: (skills: string[]) => void;
  setInterests: (interests: string[]) => void;
  skills: string[];
  experience: ExperienceInput[];
  education: Education[];
  interests: string[];
  experienceFields: ExperienceInput[];
  setExperienceFields: (values: ExperienceInput[]) => void;
  addFormFieldsExperience: () => void;
  educationFields: Education[];
  setEducationFields: (values: Education[]) => void;
  addFormFieldsEducation: () => void;
  selectedDegrees: string[];
  setPersonalInfo: (personalInfo: string) => void;
  setJobTitle: (jobTitle: string) => void;
  setJobTitleLevels: (jobTitleLevels: string[]) => void;
  setJobTitleRole: (jobTitleRole: string) => void;
  setJobTitleSubRole: (jobTitleSubRole: string) => void;
  setJobCompany: (jobCompany: string) => void;
  setJobStartDate: (jobStartDate: string) => void;
  levels: string[];
  levelsInput: string[];
  setLevelsInput: (level: string[]) => void;
}

export default FormDetails;

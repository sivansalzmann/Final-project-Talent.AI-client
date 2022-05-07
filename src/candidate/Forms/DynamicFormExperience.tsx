import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { FC, useState } from "react";
import { dateAsDate } from "../../app-utils";
import { ExperienceInput } from "../../types/jobOffer-types";

const DynamicFormExperience: FC<DynamicFormExperienceProps> = ({
  experienceFields,
  setExperienceFields,
  addFormFieldsExperience,
  levelsInput,
  setLevelsInput,
}) => {
  const [expStart, setExpStart] = useState<Date[]>([]);
  const [expEnd, setExpEnd] = useState<Date[]>([]);

  const levels = ["Senior", "Junior", "Intern"];

  const handleChangeExperience = (
    i: number,
    e?:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    date?: { name: string; value: string }
  ) => {
    let newFormValues = [...experienceFields];
    if (date) {
      newFormValues[i][date.name] = date.value;
    } else if (e) {
      newFormValues[i][e.target.name] = e.target.value;
    }
    console.log(newFormValues);
    setExperienceFields(newFormValues);
  };

  return (
    <>
      <Typography variant="subtitle1" m={1}>
        Experience
      </Typography>
      {experienceFields.map((element, index) => {
        return (
          <div key={index}>
            <TextField
              name="company_name"
              label="Company name"
              sx={{ m: 1, width: "25ch" }}
              InputProps={{
                startAdornment: <InputAdornment position="start" />,
              }}
              onChange={(e) => {
                handleChangeExperience(index, e);
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
                handleChangeExperience(index, e);
              }}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Start date"
                minDate={new Date("1990-01-01")}
                onChange={(date) => {
                  if (date) {
                    setExpStart([...expStart, date]);
                    handleChangeExperience(index, undefined, {
                      name: "start_date",
                      value: dateAsDate(date),
                    });
                  }
                }}
                value={expStart[index]}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{ m: 1, width: "25ch" }}
                    name="start_date"
                  />
                )}
              />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="End date"
                minDate={new Date("1990-01-01")}
                onChange={(date) => {
                  if (date) {
                    setExpEnd([...expEnd, date]);
                    handleChangeExperience(index, undefined, {
                      name: "end_date",
                      value: dateAsDate(date),
                    });
                  }
                }}
                value={expEnd[index]}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{ m: 1, width: "25ch" }}
                    name="end_date"
                  />
                )}
              />
            </LocalizationProvider>

            <div style={{ display: "flex", flexDirection: "row" }}>
              <TextField
                name="title_role"
                label="Title role"
                sx={{ m: 1, width: "25ch" }}
                InputProps={{
                  startAdornment: <InputAdornment position="start" />,
                }}
                onChange={(e) => {
                  handleChangeExperience(index, e);
                }}
              />
              <div style={{ width: "30ch", marginLeft: "10px" }}>
                <Typography variant="subtitle1">Levels</Typography>
                <div>
                  {levels.map((level, index) => {
                    return (
                      <FormControlLabel
                        key={index}
                        control={
                          <Checkbox
                            size="small"
                            name="title_levels"
                            value={level}
                            onChange={(e) => {
                              setLevelsInput([...levelsInput, e.target.value]);
                              handleChangeExperience(index, e);
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
            <Divider sx={{ margin: "5px" }} />
          </div>
        );
      })}
      <div>
        <Button
          onClick={() => {
            addFormFieldsExperience();
          }}
        >
          Add more experience
        </Button>
      </div>
    </>
  );
};
export interface DynamicFormExperienceProps {
  experienceFields: ExperienceInput[];
  setExperienceFields: (values: ExperienceInput[]) => void;
  addFormFieldsExperience: () => void;
  levelsInput: string[];
  setLevelsInput: (level: string[]) => void;
}
export default DynamicFormExperience;

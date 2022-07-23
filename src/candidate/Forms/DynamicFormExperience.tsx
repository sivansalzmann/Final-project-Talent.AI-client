import {
  Button,
  Divider,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
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
}) => {
  const [expStart] = useState<Date[]>([]);
  const [expEnd] = useState<Date[]>([]);

  const handleChangeExperience = (
    i: number,
    e?:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>,
    date?: { name: string; value: string },
    levels?: string[]
  ) => {
    let newFormValues = [...experienceFields];
    if (date) {
      newFormValues[i][date.name] = date.value;
    } else if (e) {
      newFormValues[i][e.target.name] = e.target.value;
    }
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
              required
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
              required
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
                    expStart[index] = date;
                    handleChangeExperience(index, undefined, {
                      name: "start_date",
                      value: dateAsDate(date),
                    });
                  }
                }}
                value={expStart[index]}
                renderInput={(params) => (
                  <TextField
                    required
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
                    expEnd[index] = date;
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
                required
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
              <FormControl>
                <InputLabel>Levels</InputLabel>
                <Select
                  required
                  label="Levels"
                  name="title_levels"
                  defaultValue={"Senior"}
                  sx={{ m: 1, width: "23ch" }}
                  onChange={(e) => handleChangeExperience(index, e)}
                >
                  <MenuItem value="Senior">Senior</MenuItem>
                  <MenuItem value="Junior">Junior</MenuItem>
                  <MenuItem value="Intern">Intern</MenuItem>
                </Select>
              </FormControl>
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
}
export default DynamicFormExperience;

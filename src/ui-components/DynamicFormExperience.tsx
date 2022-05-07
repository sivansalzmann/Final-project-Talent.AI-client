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
import { ExperienceInput } from "../types/jobOffer-types";

const DynamicFormExperience: FC<DynamicFormExperienceProps> = ({
  experienceFields,
  setExperienceFields,
  addFormFieldsExperience,
}) => {
  const [expStart, setExpStart] = useState(new Date());
  const [expEnd, setExpEnd] = useState(new Date());

  const levels = ["Senior", "Junior", "Intern"];
  const [checkedCurrent, setCheckedCurrent] = useState(false);

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
    } else if (e && e.target.name === "title_levels") {
      newFormValues[i].title_levels.push(e.target.value);
    } else if (e) {
      newFormValues[i][e.target.name] = e.target.value;
    }

    setExperienceFields(newFormValues);
  };

  const dateAsDate = (date: Date) => {
    return (
      date?.getUTCFullYear() +
      "-" +
      (date.getUTCMonth() + 1) +
      "-" +
      date?.getUTCDate()
    );
  };

  return (
    <>
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
                    setExpStart(date);
                    handleChangeExperience(index, undefined, {
                      name: "start_date",
                      value: dateAsDate(date),
                    });
                  }
                }}
                value={expStart}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{ m: 1, width: "25ch" }}
                    name="start_date"
                  />
                )}
              />
            </LocalizationProvider>

            {!checkedCurrent && (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="End date"
                  minDate={new Date("1990-01-01")}
                  onChange={(date) => {
                    if (date) {
                      setExpEnd(date);
                      handleChangeExperience(index, undefined, {
                        name: "end_date",
                        value: dateAsDate(date),
                      });
                    }
                  }}
                  value={expEnd}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      sx={{ m: 1, width: "25ch" }}
                      name="end_date"
                    />
                  )}
                />
              </LocalizationProvider>
            )}

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
            <FormControlLabel
              sx={{ m: 1 }}
              control={
                <Checkbox
                  size="small"
                  onChange={(e) => {
                    setCheckedCurrent(e.target.checked);
                    handleChangeExperience(index, e);
                  }}
                />
              }
              label={<Typography variant="subtitle2">Current job?</Typography>}
            />
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

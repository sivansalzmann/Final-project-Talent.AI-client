import {
  Button,
  Checkbox,
  Dialog,
  Divider,
  FormControlLabel,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import { Education } from "../types/jobOffer-types";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import DialogSelect from "./SelectDialog";

const DynamicFormEducation: FC<DynamicFormProps> = ({
  educationFields,
  setEducationFields,
  addFormFieldsEducation,
}) => {
  const [majors, setMajors] = useState([{ major: "" }]);
  const [minors, setMinors] = useState([{ minor: "" }]);
  const [eduStart, setEduStart] = useState(new Date());
  const [eduEnd, setEduEnd] = useState(new Date());

  const addFormFieldsMajors = () => {
    setMajors([
      ...majors,
      {
        major: "",
      },
    ]);
  };

  const addFormFieldsMinors = () => {
    setMinors([
      ...minors,
      {
        minor: "",
      },
    ]);
  };

  const handleChangeEducation = (
    i: number,
    e?:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    date?: { name: string; value: string }
  ) => {
    let newFormValues = [...educationFields];
    if (date) {
      newFormValues[i][date.name] = date.value;
    } else if (e) {
      newFormValues[i][e.target.name] = e.target.value;
    } else if (selectedDegrees) {
      console.log(selectedDegrees);
      newFormValues[i].degrees = selectedDegrees;
    }
    setEducationFields(newFormValues);
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

  const selectedDegrees: string[] = [];

  return (
    <>
      <Typography variant="subtitle1" m={1}>
        Education
      </Typography>

      <div>
        {educationFields.map((element, index) => (
          <div key={index}>
            <TextField
              label="School name"
              name="school_name"
              sx={{ m: 1, width: "25ch" }}
              InputProps={{
                startAdornment: <InputAdornment position="start" />,
              }}
              defaultValue={element.school_name || ""}
              onChange={(e) => {
                handleChangeEducation(index, e);
              }}
            />
            <TextField
              label="School type"
              name="school_type"
              sx={{ m: 1, width: "25ch" }}
              InputProps={{
                startAdornment: <InputAdornment position="start" />,
              }}
              defaultValue={element.school_type || ""}
              onChange={(e) => {
                handleChangeEducation(index, e);
              }}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Start date"
                minDate={new Date("1990-01-01")}
                onChange={(date) => {
                  if (date) {
                    setEduStart(date);
                    handleChangeEducation(index, undefined, {
                      name: "start_date",
                      value: dateAsDate(date),
                    });
                  }
                }}
                value={eduStart}
                renderInput={(params) => (
                  <TextField {...params} sx={{ m: 1, width: "25ch" }} />
                )}
              />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="End date"
                minDate={new Date("1990-01-01")}
                onChange={(date) => {
                  if (date) {
                    setEduEnd(date);
                    handleChangeEducation(index, undefined, {
                      name: "end_date",
                      value: dateAsDate(date),
                    });
                  }
                }}
                value={eduEnd}
                renderInput={(params) => (
                  <TextField {...params} sx={{ m: 1, width: "25ch" }} />
                )}
              />
            </LocalizationProvider>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <TextField
                type="number"
                label="gpa"
                name="gpa"
                sx={{ m: 1, width: "25ch" }}
                InputProps={{
                  startAdornment: <InputAdornment position="start" />,
                }}
                defaultValue={element.gpa || ""}
                onChange={(e) => {
                  handleChangeEducation(index, e);
                }}
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <DialogSelect
                  isDegrees={true}
                  selectDegrees={selectedDegrees}
                />
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {majors.map((ele, index) => {
                  return (
                    <TextField
                      key={index}
                      label="Majors"
                      sx={{ m: 1, width: "25ch" }}
                      InputProps={{
                        startAdornment: <InputAdornment position="start" />,
                      }}
                      //defaultValue={element.majors || ""}
                      // onChange={(e) => {
                      //   education[0].majors.push(e.target.value);
                      //   edu["majors"].push(e.target.value);
                      // }}
                    />
                  );
                })}
                <Button
                  onClick={addFormFieldsMajors}
                  sx={{ width: "15ch", fontSize: "12px" }}
                  size="small"
                >
                  Add major
                </Button>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {minors.map((ele, index) => {
                  return (
                    <TextField
                      key={index}
                      label="Minors"
                      sx={{ m: 1, width: "25ch" }}
                      InputProps={{
                        startAdornment: <InputAdornment position="start" />,
                      }}
                      //defaultValue={element.minors || ""}
                      // onChange={(e) => {
                      //   education[0].minors.push(e.target.value);
                      //   edu["minors"].push(e.target.value);
                      // }}
                    />
                  );
                })}
                <Button
                  onClick={addFormFieldsMinors}
                  sx={{ width: "15ch", fontSize: "12px" }}
                  size="small"
                >
                  Add minor
                </Button>
              </div>
            </div>
            <Divider sx={{ margin: "5px" }} />
          </div>
        ))}

        <div>
          <Button
            onClick={() => {
              addFormFieldsEducation();
            }}
          >
            Add more education
          </Button>
        </div>
      </div>
    </>
  );
};

export interface DynamicFormProps {
  educationFields: Education[];
  setEducationFields: (values: Education[]) => void;
  addFormFieldsEducation: () => void;
}

export default DynamicFormEducation;

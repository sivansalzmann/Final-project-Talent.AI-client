import { Button, Divider, TextField, Typography } from "@mui/material";
import { FC, useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import { Education } from "../../types/jobOffer-types";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import DialogSelect from "./SelectDialog";
import { dateAsDate } from "../../app-utils";

const DynamicFormEducation: FC<DynamicFormProps> = ({
  educationFields,
  setEducationFields,
  addFormFieldsEducation,
}) => {
  const [major, setMajor] = useState("");
  const [majorsInput, setMajorsInput] = useState<string[]>([]);
  const [minors, setMinors] = useState<string[]>([]);
  const [eduStart, setEduStart] = useState<Date[]>([]);
  const [eduEnd, setEduEnd] = useState<Date[]>([]);
  const [degrees, setDegrees] = useState<string[]>([]);

  const addFormFieldsMinors = () => {
    setMinors([...minors, ""]);
  };

  const handleChangeEducation = (
    i: number,
    e?:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    date?: { name: string; value: string },
    degreed?: string[]
  ) => {
    let newFormValues = [...educationFields];
    if (date) {
      newFormValues[i][date.name] = date.value;
    } else if (e) {
      newFormValues[i][e.target.name] = e.target.value;
    }
    //newFormValues[i].degrees = degrees;
    //newFormValues[i].majors = majorsInput;
    console.log(newFormValues);
    setEducationFields(newFormValues);
  };

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
                    setEduStart([...eduStart, date]);
                    handleChangeEducation(index, undefined, {
                      name: "start_date",
                      value: dateAsDate(date),
                    });
                  }
                }}
                value={eduStart[index]}
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
                    setEduEnd([...eduEnd, date]);
                    handleChangeEducation(index, undefined, {
                      name: "end_date",
                      value: dateAsDate(date),
                    });
                  }
                }}
                value={eduEnd[index]}
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
                  degrees={degrees}
                  index={index}
                  setDegrees={handleChangeEducation}
                />
                {degrees.length > 0 &&
                  degrees.map((degree, index) => (
                    <Typography key={index} variant="body2">
                      {degree}
                    </Typography>
                  ))}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <TextField
                    key={index}
                    label="Majors"
                    sx={{ m: 1, width: "25ch" }}
                    InputProps={{
                      startAdornment: <InputAdornment position="start" />,
                    }}
                    value={major}
                    onChange={(e) => {
                      setMajor(e.target.value);
                    }}
                  />
                  <div style={{ margin: "10px" }}>
                    {majorsInput.length > 0 &&
                      majorsInput.map((majorInput, index) => {
                        return (
                          <Typography key={index}>{majorInput}</Typography>
                        );
                      })}
                  </div>
                </div>
                <Button
                  onClick={() => {
                    setMajorsInput([...majorsInput, major]);
                    setMajor("");
                  }}
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

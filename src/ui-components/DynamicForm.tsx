import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import { Education, ExperienceInput } from "../types/jobOffer-types";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const DynamicForm = ({
  experienceForm,
  educationForm,
  experience,
  education,
}: DynamicFormProps) => {
  const [countEdu, setCountEdu] = useState(0);
  const increaseEdu = () => {
    setCountEdu((count) => count + 1);
  };

  const [countExp, setCountExp] = useState(0);
  const increaseExp = () => {
    setCountEdu((count) => count + 1);
  };
  const [degrees, setDegrees] = useState([{ degree: "" }]);
  const [majors, setMajors] = useState([{ major: "" }]);
  const [minors, setMinors] = useState([{ minor: "" }]);
  const [expStart, setExpStart] = useState(new Date());
  const [expEnd, setExpEnd] = useState(new Date());
  const [eduStart, setEduStart] = useState(new Date());
  const [eduEnd, setEduEnd] = useState(new Date());

  const [educationFields, setEducation] = useState([
    {
      school_name: "",
      school_type: "",
      end_date: Date(),
      start_date: Date(),
      gpa: "",
      degrees: [],
      majors: [],
      minors: [],
    },
  ]);

  const addFormFieldsEducation = () => {
    setEducation([
      ...educationFields,
      {
        school_name: "",
        school_type: "",
        end_date: "",
        start_date: "",
        gpa: "",
        degrees: [],
        majors: [],
        minors: [],
      },
    ]);
  };

  const addFormFieldsDegrees = () => {
    setDegrees([
      ...degrees,
      {
        degree: "",
      },
    ]);
  };

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
  const [experienceFields, setExperienceFields] = useState([
    {
      company_name: "",
      start_date: "",
      end_date: "",
      current_job: false,
      title_name: "",
      title_role: "",
      title_levels: [],
    },
  ]);
  const addFormFieldsExperience = () => {
    setExperienceFields([
      ...experienceFields,
      {
        company_name: "",
        start_date: "",
        end_date: "",
        current_job: false,
        title_name: "",
        title_role: "",
        title_levels: [],
      },
    ]);
  };

  const exp = {};
  const edu = {};
  const [checkedCurrent, setCheckedCurrent] = useState(false);
  const levels = ["Senior", "Junior", "Intern"];

  const handleChangeExperience = (i, e) => {
    let newFormValues = [...experienceFields];
    newFormValues[i][e.target.name] = e.target.value;
    setExperienceFields(newFormValues);
  };

  const handleChangeEducation = (i, e) => {
    let newFormValues = [...educationFields];
    newFormValues[i][e.target.name] = e.target.value;
    setEducation(newFormValues);
  };

  return (
    <>
      <Typography variant="subtitle1" m={1}>
        {experienceForm ? "Experience" : "Education"}
      </Typography>
      {experienceForm ? (
        <div>
          {experienceFields.map((element, index) => (
            <div key={index}>
              <TextField
                label="Company name"
                sx={{ m: 1, width: "25ch" }}
                InputProps={{
                  startAdornment: <InputAdornment position="start" />,
                }}
                defaultValue={element.company_name || ""}
                onChange={(e) => {
                  experience[0].company_name = e.target.value;
                  exp["company_name"] = e.target.value;
                }}
              />
              <TextField
                label="Title name"
                sx={{ m: 1, width: "25ch" }}
                InputProps={{
                  startAdornment: <InputAdornment position="start" />,
                }}
                defaultValue={element.title_name || ""}
                onChange={(e) => {
                  experience[0].title_name = e.target.value;
                  exp["title_name"] = e.target.value;
                }}
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Start date"
                  minDate={new Date("1990-01-01")}
                  onChange={(date) => {
                    experience[0].start_date = date;
                    exp["start_date"] = date;
                    if (date) setExpStart(date);
                  }}
                  value={expStart}
                  renderInput={(params) => (
                    <TextField {...params} sx={{ m: 1, width: "25ch" }} />
                  )}
                />
              </LocalizationProvider>

              {!checkedCurrent && (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="End date"
                    minDate={new Date("1990-01-01")}
                    onChange={(date) => {
                      experience[0].end_date = date;
                      exp["end_date"] = date;
                      if (date) setExpEnd(date);
                    }}
                    value={expEnd}
                    renderInput={(params) => (
                      <TextField {...params} sx={{ m: 1, width: "25ch" }} />
                    )}
                  />
                </LocalizationProvider>
              )}

              <div style={{ display: "flex", flexDirection: "row" }}>
                <TextField
                  label="Title role"
                  sx={{ m: 1, width: "25ch" }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start" />,
                  }}
                  defaultValue={element.title_role || ""}
                  onChange={(e) => {
                    experience[0].title_role = e.target.value;
                    exp["title_role"] = e.target.value;
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
                              onChange={() => {
                                experience[0].title_levels.push(level);
                                exp["title_levels"].push(level);
                              }}
                            />
                          }
                          label={
                            <Typography variant="body2">{level}</Typography>
                          }
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
                      experience[0].current_job = e.target.checked;
                      exp["current_job"] = e.target.checked;
                    }}
                  />
                }
                label={
                  <Typography variant="subtitle2">Current job?</Typography>
                }
              />
              <Divider sx={{ margin: "5px" }} />
            </div>
          ))}
          <div>
            <Button
              onClick={() => {
                addFormFieldsExperience();
                if (countExp !== 0) {
                  experience.push(exp as ExperienceInput);
                }
                increaseExp();
              }}
            >
              Add more experience
            </Button>
          </div>
        </div>
      ) : (
        <div>
          {educationFields.map((element, index) => (
            <div key={index}>
              <TextField
                label="School name"
                sx={{ m: 1, width: "25ch" }}
                InputProps={{
                  startAdornment: <InputAdornment position="start" />,
                }}
                defaultValue={element.school_name || ""}
                onChange={(e) => {
                  education[0].school_name = e.target.value;
                  edu["school_name"] = e.target.value;
                }}
              />
              <TextField
                label="School type"
                sx={{ m: 1, width: "25ch" }}
                InputProps={{
                  startAdornment: <InputAdornment position="start" />,
                }}
                defaultValue={element.school_type || ""}
                onChange={(e) => {
                  education[0].school_type = e.target.value;
                  edu["school_type"] = e.target.value;
                }}
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Start date"
                  minDate={new Date("1990-01-01")}
                  onChange={(date) => {
                    education[0].start_date = date;
                    edu["start_date"] = date;
                    if (date) setEduStart(date);
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
                    education[0].end_date = date;
                    edu["end_date"] = date;
                    if (date) setEduEnd(date);
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
                  sx={{ m: 1, width: "25ch" }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start" />,
                  }}
                  defaultValue={element.gpa || ""}
                  onChange={(e) => {
                    education[0].gpa = e.target.value;
                    edu["gpa"] = e.target.value;
                  }}
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {degrees.map((ele, index) => {
                    return (
                      <TextField
                        key={index}
                        label="Degrees"
                        sx={{ m: 1, width: "25ch" }}
                        InputProps={{
                          startAdornment: <InputAdornment position="start" />,
                        }}
                        defaultValue={element.degrees || ""}
                        onChange={(e) => {
                          education[0].degrees.push(e.target.value);
                          edu["degrees"].push(e.target.value);
                        }}
                      />
                    );
                  })}
                  <Button
                    onClick={addFormFieldsDegrees}
                    sx={{ width: "15ch", fontSize: "12px" }}
                    size="small"
                  >
                    Add degree
                  </Button>
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
                        defaultValue={element.majors || ""}
                        onChange={(e) => {
                          education[0].majors.push(e.target.value);
                          edu["majors"].push(e.target.value);
                        }}
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
                        defaultValue={element.minors || ""}
                        onChange={(e) => {
                          education[0].minors.push(e.target.value);
                          edu["minors"].push(e.target.value);
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
                if (countEdu !== 0) {
                  education.push(edu as Education);
                }
                increaseEdu();
                console.log(education);
              }}
            >
              Add more education
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export interface DynamicFormProps {
  experienceForm?: boolean;
  educationForm?: boolean;
  experience: ExperienceInput[];
  education: Education[];
}

export default DynamicForm;

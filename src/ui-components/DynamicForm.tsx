import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";

const DynamicForm = ({ experienceForm, educationForm }: DynamicFormProps) => {
  const [experience, setExperience] = useState([
    {
      company_name: "",
      start_date: "",
      end_date: "",
      current_job: "",
      title_name: "",
      title_role: "",
      level: "",
    },
  ]);

  const [education, setEducation] = useState([
    {
      school_name: "",
      school_type: "",
      end_date: "",
      start_date: "",
      gpa: "",
      degrees: "",
      majors: "",
      minors: "",
    },
  ]);

  const addFormFieldsExperience = () => {
    setExperience([
      ...experience,
      {
        company_name: "",
        start_date: "",
        end_date: "",
        current_job: "",
        title_name: "",
        title_role: "",
        level: "",
      },
    ]);
  };

  const addFormFieldsEducation = () => {
    setEducation([
      ...education,
      {
        school_name: "",
        school_type: "",
        end_date: "",
        start_date: "",
        gpa: "",
        degrees: "",
        majors: "",
        minors: "",
      },
    ]);
  };

  const handleChangeExperience = (i, e) => {
    let newFormValues = [...experience];
    newFormValues[i][e.target.name] = e.target.value;
    setExperience(newFormValues);
  };

  const removeFormFieldsExperience = (i) => {
    let newFormValues = [...experience];
    newFormValues.splice(i, 1);
    setExperience(newFormValues);
  };

  const handleChangeEducation = (i, e) => {
    let newFormValues = [...education];
    newFormValues[i][e.target.name] = e.target.value;
    setEducation(newFormValues);
  };

  const removeFormFieldsEducation = (i) => {
    let newFormValues = [...education];
    newFormValues.splice(i, 1);
    setEducation(newFormValues);
  };

  return (
    <>
      <Typography variant="subtitle1" fontFamily="Anek Odia" m={1}>
        {experienceForm ? "Experience" : "Education"}
      </Typography>
      {experienceForm ? (
        <div>
          {experience.map((element, index) => (
            <div key={index}>
              <TextField
                label="Company name"
                sx={{ m: 1, width: "25ch" }}
                InputProps={{
                  startAdornment: <InputAdornment position="start" />,
                }}
                value={element.company_name || ""}
                onChange={(e) => handleChangeExperience(index, e)}
              />
              <TextField
                label="Start date"
                sx={{ m: 1, width: "25ch" }}
                InputProps={{
                  startAdornment: <InputAdornment position="start" />,
                }}
                value={element.start_date || ""}
                onChange={(e) => handleChangeExperience(index, e)}
              />
              <TextField
                label="End date"
                sx={{ m: 1, width: "25ch" }}
                InputProps={{
                  startAdornment: <InputAdornment position="start" />,
                }}
                value={element.end_date || ""}
                onChange={(e) => handleChangeExperience(index, e)}
              />

              <TextField
                label="Title name"
                sx={{ m: 1, width: "25ch" }}
                InputProps={{
                  startAdornment: <InputAdornment position="start" />,
                }}
                value={element.title_name || ""}
                onChange={(e) => handleChangeExperience(index, e)}
              />
              <TextField
                label="Title role"
                sx={{ m: 1, width: "25ch" }}
                InputProps={{
                  startAdornment: <InputAdornment position="start" />,
                }}
                value={element.title_role || ""}
                onChange={(e) => handleChangeExperience(index, e)}
              />
              <TextField
                name="name"
                label="Title levels"
                sx={{ m: 1, width: "25ch" }}
                InputProps={{
                  startAdornment: <InputAdornment position="start" />,
                }}
                value={element.title_role || ""}
                onChange={(e) => handleChangeExperience(index, e)}
              />
              <FormControlLabel
                sx={{ m: 1 }}
                control={<Checkbox />}
                label={
                  <Typography variant="subtitle2" fontFamily="Anek Odia">
                    Current job?
                  </Typography>
                }
              />

              {index ? (
                <Button onClick={() => removeFormFieldsExperience(index)}>
                  Remove
                </Button>
              ) : null}
            </div>
          ))}
          <div>
            <Button onClick={() => addFormFieldsExperience()}>
              Add more experience
            </Button>
          </div>
        </div>
      ) : (
        <div>
          {education.map((element, index) => (
            <div key={index}>
              <TextField
                label="School name"
                sx={{ m: 1, width: "25ch" }}
                InputProps={{
                  startAdornment: <InputAdornment position="start" />,
                }}
                value={element.school_name || ""}
                onChange={(e) => handleChangeExperience(index, e)}
              />
              <TextField
                label="School type"
                sx={{ m: 1, width: "25ch" }}
                InputProps={{
                  startAdornment: <InputAdornment position="start" />,
                }}
                value={element.school_type || ""}
                onChange={(e) => handleChangeExperience(index, e)}
              />
              <TextField
                label="Start date"
                sx={{ m: 1, width: "25ch" }}
                InputProps={{
                  startAdornment: <InputAdornment position="start" />,
                }}
                value={element.start_date || ""}
                onChange={(e) => handleChangeExperience(index, e)}
              />

              <TextField
                label="End date"
                sx={{ m: 1, width: "25ch" }}
                InputProps={{
                  startAdornment: <InputAdornment position="start" />,
                }}
                value={element.end_date || ""}
                onChange={(e) => handleChangeExperience(index, e)}
              />
              <TextField
                label="gpa"
                sx={{ m: 1, width: "25ch" }}
                InputProps={{
                  startAdornment: <InputAdornment position="start" />,
                }}
                value={element.gpa || ""}
                onChange={(e) => handleChangeExperience(index, e)}
              />
              <TextField
                label="Degrees"
                sx={{ m: 1, width: "25ch" }}
                InputProps={{
                  startAdornment: <InputAdornment position="start" />,
                }}
                value={element.degrees || ""}
                onChange={(e) => handleChangeExperience(index, e)}
              />
              <TextField
                label="Majors"
                sx={{ m: 1, width: "25ch" }}
                InputProps={{
                  startAdornment: <InputAdornment position="start" />,
                }}
                value={element.degrees || ""}
                onChange={(e) => handleChangeExperience(index, e)}
              />
              <TextField
                label="Minors"
                sx={{ m: 1, width: "25ch" }}
                InputProps={{
                  startAdornment: <InputAdornment position="start" />,
                }}
                value={element.degrees || ""}
                onChange={(e) => handleChangeExperience(index, e)}
              />
              {index ? (
                <Button onClick={() => removeFormFieldsEducation(index)}>
                  Remove
                </Button>
              ) : null}
            </div>
          ))}
          <div>
            <Button onClick={() => addFormFieldsEducation()}>
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
}

export default DynamicForm;

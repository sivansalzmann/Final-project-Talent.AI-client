import { FC, useState } from "react";
import { Candidate } from "../../types/candidates-types";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Dialog,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import SubCard from "../../ui-components/SubCard";
import CloseIcon from "@mui/icons-material/Close";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import SendIcon from "@mui/icons-material/Send";

const EditCandidateEducation: FC<EditCandidateEducationProps> = ({
  index,
  candidate,
}) => {
  const [educationModel, setEducationModel] = useState(false);
  const [startDate, setStartDate] = useState(
    candidate?.education[index].start_date
  );
  const [endDate, setEndDate] = useState(candidate?.education[index].end_date);
  const [textFieldMajor, setTextFieldMajor] = useState<boolean[]>([]);
  const [textFieldMinor, setTextFieldMinor] = useState<boolean[]>([]);
  const [textFieldDegree, setTextFieldDegree] = useState<string[]>([]);
  const [degree, setDegree] = useState(candidate?.education[index].degrees[0]);
  let [majors, setMajors] = useState(candidate?.education[index].majors);
  const [degrees, setDegrees] = useState(candidate?.education[index].degrees);
  const [minors, setMinors] = useState(candidate?.education[index].minors);
  const [majorsInput, setMajorsInput] = useState(
    candidate?.education[index].majors
  );
  const [minorsInput, setMinorsInput] = useState(
    candidate?.education[index].minors
  );
  const [degreesInput, setDegreesInput] = useState(
    candidate?.education[index].degrees
  );

  const [school_type, setSchoolType] = useState(
    candidate?.education[index].school_type
  );
  const [school_name, setSchoolName] = useState(
    candidate?.education[index].school_name
  );
  const [gpa, setGpa] = useState(candidate?.education[index].gpa);

  const handleEducationModel = (state: boolean) => {
    setEducationModel(state);
  };

  const addTextFieldMajor = () => {
    setTextFieldMajor([...textFieldMajor, true]);
  };

  const addTextFieldMinor = () => {
    setTextFieldMinor([...textFieldMinor, true]);
  };

  const addTextFieldDegree = () => {
    setTextFieldDegree([...textFieldDegree, ""]);
  };

  const editEducation = () => {
    fetch(
      `${process.env.REACT_APP_SERVER}/api/candidate/${candidate?._id}/${index}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          updateEducation: {
            school_type: school_type,
            school_name: school_name,
            gpa: gpa,
            start_date: startDate,
            end_date: endDate,
            majors: majorsInput,
            degrees: degreesInput,
            minors: minorsInput,
          },
        }),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      });
  };

  return (
    <>
      <IconButton onClick={() => handleEducationModel(true)}>
        <EditIcon fontSize="small" color="primary" />
      </IconButton>
      {educationModel && (
        <Dialog
          open={educationModel}
          onClose={() => handleEducationModel(false)}
          sx={{ overflowY: "auto", maxHeight: "100%", position: "absolute" }}
        >
          <SubCard
            sx={{ overFlow: "scroll" }}
            title={
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6" mt={1} color="black">
                  Edit eductain
                </Typography>
                <IconButton>
                  <CloseIcon
                    fontSize="small"
                    color="disabled"
                    onClick={() => handleEducationModel(false)}
                  />
                </IconButton>
              </div>
            }
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
                <TextField
                  label="School type"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: "30ch" }}
                  defaultValue={school_type}
                  InputProps={{
                    startAdornment: <InputAdornment position="start" />,
                  }}
                  onChange={(e) => setSchoolType(e.target.value)}
                />
                <TextField
                  label="School name"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: "30ch" }}
                  defaultValue={school_name}
                  InputProps={{
                    startAdornment: <InputAdornment position="start" />,
                  }}
                  onChange={(e) => setSchoolName(e.target.value)}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <TextField
                  label="Gpa"
                  id="outlined-start-adornment"
                  type="number"
                  sx={{ m: 1, width: "30ch" }}
                  defaultValue={gpa}
                  InputProps={{
                    startAdornment: <InputAdornment position="start" />,
                  }}
                  onChange={(e) => setGpa(e.target.value)}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Start date"
                    minDate={new Date("1990-01-01")}
                    value={startDate}
                    renderInput={(params) => (
                      <TextField {...params} sx={{ m: 1, width: "30ch" }} />
                    )}
                    onChange={(date) => {
                      if (date) setStartDate(date?.toLocaleString());
                    }}
                  />
                </LocalizationProvider>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="End date"
                    minDate={new Date("1990-01-01")}
                    value={endDate}
                    renderInput={(params) => (
                      <TextField {...params} sx={{ m: 1, width: "30ch" }} />
                    )}
                    onChange={(date) => {
                      if (date) setEndDate(date?.toLocaleString());
                    }}
                  />
                </LocalizationProvider>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="body1" m={1}>
                  Majors
                </Typography>
                {majors &&
                  majors.map((major, indexMajor) => {
                    return (
                      <TextField
                        label="major"
                        id="outlined-start-adornment"
                        sx={{ m: 1 }}
                        defaultValue={major}
                        InputProps={{
                          startAdornment: <InputAdornment position="start" />,
                        }}
                        onChange={(e) => {
                          if (majors && majors !== []) {
                            majors[indexMajor] = e.target.value;
                          }
                        }}
                      />
                    );
                  })}
                {textFieldMajor.map((textField) => {
                  return (
                    <TextField
                      label="major"
                      id="outlined-start-adornment"
                      sx={{ m: 1 }}
                      InputProps={{
                        startAdornment: <InputAdornment position="start" />,
                      }}
                      onChange={(e) => {
                        if (majors && majors !== []) {
                          setMajorsInput([...majors, e.target.value]);
                        } else {
                          setMajorsInput([e.target.value]);
                        }
                      }}
                    />
                  );
                })}
                <Button onClick={addTextFieldMajor}>Add new major</Button>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="body1" m={1}>
                  Minors
                </Typography>
                {minors &&
                  minors.map((minor, indexMinor) => {
                    return (
                      <TextField
                        label="minor"
                        id="outlined-start-adornment"
                        sx={{ m: 1 }}
                        defaultValue={minor}
                        InputProps={{
                          startAdornment: <InputAdornment position="start" />,
                        }}
                        onChange={(e) => {
                          if (minors && minors !== []) {
                            minors[indexMinor] = e.target.value;
                          }
                        }}
                      />
                    );
                  })}
                {textFieldMinor.map((textField) => {
                  return (
                    <TextField
                      label="minor"
                      id="outlined-start-adornment"
                      sx={{ m: 1 }}
                      InputProps={{
                        startAdornment: <InputAdornment position="start" />,
                      }}
                      onChange={(e) => {
                        if (minors && minors !== []) {
                          setMinorsInput([...minors, e.target.value]);
                        } else {
                          setMinorsInput([e.target.value]);
                        }
                      }}
                    />
                  );
                })}
                <Button onClick={addTextFieldMinor}>Add new minor</Button>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="body1" m={1}>
                  Degrees
                </Typography>
                {degrees &&
                  degrees.map((degree, indexDegree) => {
                    return (
                      <TextField
                        label="degree"
                        id="outlined-start-adornment"
                        sx={{ m: 1 }}
                        defaultValue={degree}
                        InputProps={{
                          startAdornment: <InputAdornment position="start" />,
                        }}
                        onChange={(e) => {
                          if (degrees && degrees !== []) {
                            degrees[indexDegree] = e.target.value;
                          }
                        }}
                      />
                    );
                  })}
                {textFieldDegree.map((textField) => {
                  return (
                    <TextField
                      label="degree"
                      id="outlined-start-adornment"
                      sx={{ m: 1 }}
                      InputProps={{
                        startAdornment: <InputAdornment position="start" />,
                      }}
                      onChange={(e) => {
                        if (degrees && degrees !== []) {
                          setDegreesInput([...degrees, e.target.value]);
                        } else {
                          setDegreesInput([e.target.value]);
                        }
                      }}
                    />
                  );
                })}
                <Button onClick={addTextFieldDegree}>Add new degree</Button>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "1%",
                }}
              >
                <Button
                  startIcon={<SendIcon />}
                  variant="contained"
                  sx={{
                    width: "20%",
                  }}
                  onClick={editEducation}
                >
                  <Typography variant="body2" mt={0.5} color="white">
                    Send
                  </Typography>
                </Button>
              </div>
            </div>
          </SubCard>
        </Dialog>
      )}
    </>
  );
};

export interface EditCandidateEducationProps {
  index: number;
  candidate?: Candidate;
}

export default EditCandidateEducation;

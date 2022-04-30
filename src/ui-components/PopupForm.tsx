import {
  Button,
  Checkbox,
  Dialog,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Candidate, JobOffer } from "../types/candidates-types";
import CustomDialog from "./CustomDialog";
import InputAdornment from "@mui/material/InputAdornment";
import DialogSelect from "./SelectDialog";

const PopupForm = ({
  editJobOffer,
  jobOffer,
  candidate,
  editCandidateAbout,
  editCandidateEducation,
  editCandidateEmployment,
  editCandidateSkills,
}: PopupFormProps) => {
  const [open, setOpen] = useState(false);
  const [industry, setIndustry] = useState("");
  const [jobLevels] = useState<string[]>([]);

  return (
    <>
      {editJobOffer ? (
        <>
          <Button
            startIcon={<EditOutlinedIcon />}
            sx={{ minWidth: 250, margin: "5px" }}
            size="small"
            variant="outlined"
            onClick={() => setOpen(true)}
          >
            Edit
          </Button>
          <CustomDialog
            title={
              <Typography variant="h6" fontFamily="Anek Odia">
                Edit job offer
              </Typography>
            }
            actions={"Edit"}
            open={open}
            setOpen={setOpen}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
                <FormControl>
                  <InputLabel id="demo-simple-select-label">
                    Industry
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={jobOffer?.industry}
                    label="Industry"
                    sx={{ m: 1, width: "29.5ch" }}
                    //onChange={handleChange}
                  >
                    <MenuItem value={"Internet"}>Internet</MenuItem>
                    <MenuItem value={"Information"}>Information</MenuItem>
                    <MenuItem value={"Computer software"}>
                      Computer software
                    </MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Job title"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: "35ch" }}
                  value={jobOffer?.job_title}
                  InputProps={{
                    startAdornment: <InputAdornment position="start" />,
                  }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <TextField
                  label="Job title role"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: "35ch" }}
                  value={jobOffer?.job_title_role}
                  InputProps={{
                    startAdornment: <InputAdornment position="start" />,
                  }}
                />
                <TextField
                  label="Job title sub role"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: "35ch" }}
                  value={jobOffer?.job_title_sub_role}
                  InputProps={{
                    startAdornment: <InputAdornment position="start" />,
                  }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <FormControl>
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={jobOffer?.status}
                    label="Status"
                    sx={{ m: 1, width: "29.5ch" }}
                    //onChange={handleChange}
                  >
                    <MenuItem value={"waiting"}>Waiting</MenuItem>
                    <MenuItem value={"In progress"}>In progress</MenuItem>
                    <MenuItem value={"Closed"}>Closed</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Job start date"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: "35ch" }}
                  value={jobOffer?.job_start_date}
                  InputProps={{
                    startAdornment: <InputAdornment position="start" />,
                  }}
                />
              </div>
              <div style={{ marginLeft: "10px" }}>
                <Typography
                  variant="subtitle2"
                  fontWeight="bold"
                  fontFamily="Anek Odia"
                >
                  Job levels
                </Typography>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={jobOffer?.job_title_levels.includes(
                            "Senior"
                          )}
                          onChange={() => jobLevels.push("Senior")}
                        />
                      }
                      label={
                        <Typography variant="body1" fontFamily="Anek Odia">
                          Senior
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={jobOffer?.job_title_levels.includes(
                            "Junior"
                          )}
                          onChange={() => jobLevels.push("Junior")}
                        />
                      }
                      label={
                        <Typography variant="body1" fontFamily="Anek Odia">
                          Junior
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={jobOffer?.job_title_levels.includes(
                            "Intern"
                          )}
                          onChange={() => jobLevels.push("Intern")}
                        />
                      }
                      label={
                        <Typography variant="body1" fontFamily="Anek Odia">
                          Intern
                        </Typography>
                      }
                    />
                  </div>
                </div>
              </div>
              <div>
                <DialogSelect
                  candidate={undefined}
                  skillsSelected={jobOffer?.skills}
                />
              </div>
              <TextField
                label="Job description"
                id="outlined-start-adornment"
                value={jobOffer?.job_description}
                sx={{ m: 1, width: "67ch" }}
                multiline
                rows={4}
                fullWidth
                InputProps={{
                  startAdornment: <InputAdornment position="start" />,
                }}
              />
            </div>
          </CustomDialog>
        </>
      ) : editCandidateAbout ? (
        <Typography>Edit candidate about</Typography>
      ) : editCandidateEducation ? (
        <></>
      ) : editCandidateEmployment ? (
        <></>
      ) : editCandidateSkills ? (
        <></>
      ) : null}
    </>
  );
};

export interface PopupFormProps {
  editJobOffer?: boolean;
  jobOffer?: JobOffer;
  candidate?: Candidate;
  editCandidateAbout?: boolean;
  editCandidateEducation?: boolean;
  editCandidateEmployment?: boolean;
  editCandidateSkills?: boolean;
}

export default PopupForm;

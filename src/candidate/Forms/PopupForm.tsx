import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Candidate } from "../../types/candidates-types";
import CustomDialog from "../../ui-components/CustomDialog";
import InputAdornment from "@mui/material/InputAdornment";
import { JobOffer } from "../../types/jobOffer-types";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { dateAsDate } from "../../app-utils";
import EditSkillsJobOffer from "../../job-offers/EditSkillsJobOffer";
import EditExpJobOffer from "../../job-offers/EditExpJobOffer";

const levels = ["Senior", "Junior", "Intern"];
const PopupForm: FC<PopupFormProps> = ({
  editJobOffer,
  jobOffer,
  candidate,
  editCandidateAbout,
  editCandidateEducation,
  editCandidateEmployment,
  editCandidateSkills,
  handleClose,
}: PopupFormProps) => {
  const [open, setOpen] = useState(false);
  const [industry, setIndustry] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobTitleRole, setJobTitleRole] = useState("");
  const [jobTitleSubRole, setJobTitleSubRole] = useState("");
  const [status, setStatus] = useState("");
  const [jobStartDate, setJobStartDate] = useState<Date>(new Date());
  const [description, setDescription] = useState("");
  const [jobLevels] = useState<string[]>([]);

  const handleUpdateJobOffer = () => {
    const tmp = {
      industry: industry,
      job_title: jobTitle,
      job_title_role: jobTitleRole,
      job_title_sub_role: jobTitleSubRole,
      status: status,
      job_start_date: jobStartDate,
      job_title_levels: jobLevels,
      job_description: description,
    };
    const update = {};
    if (tmp.industry !== "") update["industry"] = industry;
    if (tmp.job_title !== "") update["job_title"] = jobTitle;
    if (tmp.job_title_role !== "") update["job_title_role"] = jobTitleRole;
    if (tmp.job_title_sub_role !== "")
      update["job_title_sub_role"] = jobTitleSubRole;
    if (tmp.status !== "") update["status"] = status;
    if (tmp.job_start_date) update["job_start_date"] = dateAsDate(jobStartDate);
    if (tmp.job_title_levels !== undefined)
      update["job_title_levels"] = jobLevels;
    if (tmp.job_description !== "") update["job_description"] = description;

    fetch(`${process.env.REACT_APP_SERVER}/api/joboffer/${jobOffer?._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        updateJobOffer: { update },
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        setOpen(false);
        setIndustry("");
        setJobStartDate(new Date());
        setDescription("");
        setJobTitleRole("");
        setJobTitleSubRole("");
        setStatus("");
      });
    window.location.reload();
  };
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
            title="Edit job offer"
            edit={true}
            handleEdit={handleUpdateJobOffer}
            open={open}
            handleClose={() => setOpen(false)}
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
                    defaultValue={jobOffer?.industry}
                    label="Industry"
                    sx={{ m: 1, width: "29.5ch" }}
                    onChange={(eve) => setIndustry(eve.target.value)}
                  >
                    <MenuItem value={"Internet"}>Internet</MenuItem>
                    <MenuItem value={"Information"}>Information</MenuItem>
                    <MenuItem value={"Computer software"}>
                      Computer software
                    </MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Job title"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: "35ch" }}
                  onChange={(event) => setJobTitle(event.target.value)}
                  defaultValue={jobOffer?.job_title}
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
                  defaultValue={jobOffer?.job_title_role}
                  InputProps={{
                    startAdornment: <InputAdornment position="start" />,
                  }}
                  onChange={(eve) => setJobTitleRole(eve.target.value)}
                />
                <TextField
                  label="Job title sub role"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: "35ch" }}
                  defaultValue={jobOffer?.job_title_sub_role}
                  InputProps={{
                    startAdornment: <InputAdornment position="start" />,
                  }}
                  onChange={(eve) => setJobTitleSubRole(eve.target.value)}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Start date"
                    minDate={new Date("1990-01-01")}
                    onChange={(date) => {
                      if (date) setJobStartDate(date);
                    }}
                    value={jobStartDate}
                    renderInput={(params) => (
                      <TextField
                        required
                        {...params}
                        sx={{ m: 1, width: "32.5ch" }}
                        name="start_date"
                      />
                    )}
                  />
                </LocalizationProvider>
              </div>
              <div style={{ marginLeft: "10px" }}>
                <Typography variant="subtitle2" fontWeight="bold">
                  Job levels
                </Typography>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  {levels.map((level, index) => {
                    const checkedValue =
                      jobOffer?.job_title_levels.includes(level);
                    return (
                      <FormControlLabel
                        key={index}
                        control={
                          <Checkbox
                            defaultChecked={checkedValue}
                            onChange={() => jobLevels.push(level)}
                          />
                        }
                        label={<Typography variant="body1">{level}</Typography>}
                      />
                    );
                  })}
                </div>
              </div>
              <div style={{ margin: "10px" }}>
                {jobOffer && <EditSkillsJobOffer jobOffer={jobOffer} />}
              </div>
              <div style={{ margin: "10px" }}>
                <Typography variant="body1" fontWeight="bold" color="black">
                  Experience:
                </Typography>
                {jobOffer?.experience.map((exp, index) => {
                  return (
                    <div style={{ marginTop: "10px" }} key={index}>
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        color="black"
                      >
                        Title name:
                      </Typography>

                      <Typography variant="body2">{exp.title_name}</Typography>
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        color="black"
                      >
                        Title role:
                      </Typography>
                      <Typography variant="body2">{exp.title_role}</Typography>
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        color="black"
                      >
                        Levels:
                      </Typography>
                      {exp.title_levels.map((level, index) => {
                        return (
                          <Typography variant="body2" key={index}>
                            {level}
                          </Typography>
                        );
                      })}
                      <EditExpJobOffer
                        jobOffer={jobOffer}
                        companyName={jobOffer?.job_company_name}
                        index={index}
                      />
                      <Divider />
                    </div>
                  );
                })}
              </div>
              <TextField
                label="Job description"
                id="outlined-start-adornment"
                defaultValue={jobOffer?.job_description}
                sx={{ m: 1, width: "67ch" }}
                multiline
                rows={4}
                InputProps={{
                  startAdornment: <InputAdornment position="start" />,
                }}
                onChange={(eve) => setDescription(eve.target.value)}
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
  handleClose: () => void;
}

export default PopupForm;

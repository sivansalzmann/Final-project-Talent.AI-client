import { FC, useState } from "react";
import {
  Button,
  Step,
  Stepper,
  StepLabel,
  Stack,
  Typography,
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControlLabel,
} from "@mui/material";
import AnimateButton from "../ui-components/AnimateButton";
import { Company } from "../types/company-types";
import Checkbox from "@mui/material/Checkbox";
import { JobOffer } from "../types/jobOffer-types";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useNavigate } from "react-router-dom";

const steps = ["Job details", "Needed skills", "Summery"];

const JobOfferForm: FC<JobOfferFormProps> = ({ company, jobOffer }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [jobTitle, setJobTitle] = useState("");
  const [jobTitleRole, setJobTitleRole] = useState("");
  const [jobTitleSubRole, setJobTitleSubRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [newSkills, setNewSkills] = useState<string[]>([]);
  const [jobLevels] = useState<string[]>([]);
  const [jobStartDate, setJobStartDate] = useState<Date>(new Date());
  const [jobIndustry, setJobIndustry] = useState("Industry");
  const navigate = useNavigate();

  const handleAddSkills = (skill: string) => {
    jobSkills.push(skill);
  };

  const addNewSkill = () => {
    if (newSkill) {
      jobSkills.push(newSkill);
      newSkills.push(newSkill);
      setNewSkill("");
    }
  };

  const skills = [
    "javascript",
    "react",
    "software development",
    "cloud computing",
    "mobile devices",
    "web development",
    "mysql",
    "sql",
    "dev ops",
    "mobile applications",
    "apis",
    "python",
    "git",
    "css",
    "html 5",
    "node.js",
    "html",
    "databases",
    "java",
    "c#",
    "jquery",
    "json",
    "programming",
    "management",
    "product management",
    "user experience",
  ];

  const handleAddJobOffer = () => {
    console.log(company);
    if (company) {
      fetch(`${process.env.REACT_APP_SERVER}/api/joboffer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          addJobOffer: {
            job_company_name: company.name,
            job_company_id: company.name,
            job_title: jobTitle,
            job_title_role: jobTitleRole,
            job_title_sub_role: jobTitleSubRole,
            job_start_date: jobStartDate,
            job_description: jobDescription,
            skills: jobSkills,
            job_title_levels: jobLevels,
            status: "Waiting",
          },
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          alert("New job offer added!");
          navigate("/companyJobOffers");
        });
    }
  };

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return (
          <div>
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              sx={{ mb: 2 }}
            >
              Job offer info
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <InputLabel id="demo-simple-select-standard-label">
                  <Typography variant="body1" fontWeight={600}>
                    Job title
                  </Typography>
                </InputLabel>
                <TextField
                  required
                  label="Job title"
                  fullWidth
                  value={jobTitle}
                  onChange={(event) => {
                    setJobTitle(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <InputLabel id="demo-simple-select-standard-label">
                  <Typography variant="body1" fontWeight={600}>
                    Job title role
                  </Typography>
                </InputLabel>
                <TextField
                  required
                  label="Job title role"
                  fullWidth
                  value={jobTitleRole}
                  onChange={(event) => {
                    setJobTitleRole(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <InputLabel id="demo-simple-select-standard-label">
                  <Typography variant="body1" fontWeight={600}>
                    Job title sub role
                  </Typography>
                </InputLabel>
                <TextField
                  required
                  label="Job title sub role"
                  fullWidth
                  value={jobTitleSubRole}
                  onChange={(event) => {
                    setJobTitleSubRole(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <InputLabel id="demo-simple-select-standard-label">
                  <Typography variant="body1" fontWeight={600}>
                    Industry
                  </Typography>
                </InputLabel>
                <Select
                  fullWidth
                  value={jobIndustry}
                  label="Industry"
                  onChange={(event) => {
                    setJobIndustry(event.target.value);
                  }}
                >
                  <MenuItem value={"Internet"}>Internet</MenuItem>
                  <MenuItem value={"Information"}>Information</MenuItem>
                  <MenuItem value={"ComputerSoftware"}>
                    Computer software
                  </MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} sm={4}>
                <InputLabel id="demo-simple-select-standard-label">
                  <Typography variant="body1" fontWeight={600}>
                    Levels
                  </Typography>
                </InputLabel>
                <div>
                  <FormControlLabel
                    control={
                      <Checkbox onChange={() => jobLevels.push("Senior")} />
                    }
                    label={<Typography variant="body1">Senior</Typography>}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox onChange={() => jobLevels.push("Junior")} />
                    }
                    label={<Typography variant="body1">Junior</Typography>}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox onChange={() => jobLevels.push("Intern")} />
                    }
                    label={<Typography variant="body1">Intern</Typography>}
                  />
                </div>
              </Grid>

              <Grid item xs={12} sm={6}>
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
                        {...params}
                        sx={{ width: "31.5ch" }}
                        name="start_date"
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="demo-simple-select-standard-label">
                  <Typography variant="body1" fontWeight={600}>
                    Role description
                  </Typography>
                </InputLabel>
                <TextField
                  label="Role description"
                  multiline
                  fullWidth
                  rows={4}
                  value={jobDescription}
                  onChange={(event) => {
                    setJobDescription(event.target.value);
                  }}
                />
              </Grid>
            </Grid>
          </div>
        );
      case 1:
        return (
          <div
            style={{
              width: "90%",
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              sx={{ mb: 2 }}
            >
              Choose relevant skills to position
            </Typography>
            <div>
              {skills.map((skill, index) => {
                return (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox onChange={() => handleAddSkills(skill)} />
                    }
                    label={<Typography variant="subtitle1">{skill}</Typography>}
                  />
                );
              })}
            </div>
            <br />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="body1">Or insert skills</Typography>
              <TextField
                sx={{ width: "40%" }}
                value={newSkill}
                onChange={(event) => {
                  setNewSkill(event.target.value);
                }}
              />
              <Button
                onClick={addNewSkill}
                sx={{
                  width: "20%",
                  marginTop: "5px",
                  display: "flex",
                  justifyContent: "left",
                }}
              >
                {<Typography variant="body1">Add new skill</Typography>}
              </Button>
              {newSkills &&
                newSkills.map((skill, index) => {
                  return (
                    <div style={{ marginLeft: "1%" }}>
                      <Typography variant="subtitle2" key={index}>
                        {skill}
                      </Typography>
                    </div>
                  );
                })}
            </div>
          </div>
        );
      case 2:
        return (
          <div style={{ width: "50%", marginLeft: "5px" }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Job offer summery
            </Typography>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "100%",
                marginBottom: "5px",
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                Job title
              </Typography>

              <Typography variant="subtitle2">{jobTitle}</Typography>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "100%",
                marginBottom: "5px",
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                Job title role
              </Typography>

              <Typography variant="subtitle2">{jobTitleRole}</Typography>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "100%",
                marginBottom: "5px",
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                Job title sub role
              </Typography>

              <Typography variant="subtitle2">{jobTitleSubRole}</Typography>

              <Typography variant="h6" fontWeight="bold">
                Job start date
              </Typography>

              <Typography variant="subtitle2">
                {jobStartDate.toDateString()}
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "100%",
                marginBottom: "5px",
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                Job levels
              </Typography>

              {jobLevels.map((level) => {
                return <Typography variant="subtitle2">{level}</Typography>;
              })}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "100%",
                marginBottom: "5px",
              }}
            >
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Skills
                </Typography>
                {jobSkills.map((skill, index) => {
                  return (
                    <Typography key={index} gutterBottom variant="subtitle2">
                      {skill}
                    </Typography>
                  );
                })}
              </Grid>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "100%",
                marginBottom: "5px",
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                Job description
              </Typography>

              <Typography variant="subtitle2">{jobDescription}</Typography>
            </div>
          </div>
        );
      default:
        throw new Error("Unknown step");
    }
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
    setNewSkills([]);
    setJobStartDate(new Date());
  };

  return (
    <>
      <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>
              <Typography>{label}</Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <>
        {activeStep === steps.length ? (
          <>
            <Typography variant="subtitle1">Insert new job offer</Typography>
            <Stack direction="row" justifyContent="flex-end">
              <AnimateButton>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setActiveStep(0)}
                  sx={{ my: 3, ml: 1 }}
                >
                  Reset
                </Button>
              </AnimateButton>
            </Stack>
          </>
        ) : (
          <>
            {getStepContent(activeStep)}
            <Stack
              direction="row"
              justifyContent={activeStep !== 0 ? "space-between" : "flex-end"}
              mt={3}
            >
              {activeStep !== 0 && (
                <Button
                  onClick={handleBack}
                  sx={{ my: 3, ml: 1 }}
                  color="primary"
                >
                  Back
                </Button>
              )}
              {activeStep === steps.length - 1 ? (
                <AnimateButton>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={handleAddJobOffer}
                    sx={{ my: 3, ml: 1 }}
                  >
                    Add new job offer
                  </Button>
                </AnimateButton>
              ) : (
                <AnimateButton>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={handleNext}
                    sx={{ my: 3, ml: 1 }}
                  >
                    Next
                  </Button>
                </AnimateButton>
              )}
            </Stack>
          </>
        )}
      </>
    </>
  );
};

interface JobOfferFormProps {
  handleClose?: () => void;
  company: Company | undefined;
  jobOffer?: JobOffer;
}

export default JobOfferForm;

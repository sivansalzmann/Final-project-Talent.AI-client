import { useState } from "react";
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
import { Company, JobOffer } from "../types/candidates-types";
import Checkbox from "@mui/material/Checkbox";

const steps = ["Job details", "Needed skills", "Summery"];

const JobOfferForm = ({ company, jobOffer }: JobOfferFormProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [jobTitle, setJobTitle] = useState("");
  const [jobTitleRole, setJobTitleRole] = useState("");
  const [jobTitleSubRole, setJobTitleSubRole] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [jobDescription, setJobDescription] = useState("");
  const [jobSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [jobLevels] = useState<string[]>([]);
  const [jobIndustry, setJobIndustry] = useState("Industry");

  const handleAddSkills = (skill: string) => {
    jobSkills.push(skill);
  };

  const addNewSkill = () => {
    if (newSkill) {
      jobSkills.push(newSkill);
      setNewSkill("");
    }
  };

  const skills = [
    "C",
    "C++",
    "C#",
    "JAVA",
    "JAVA SCRIPT",
    "PYTHON",
    "Node.JS",
    "React",
    "Devops",
    "Assembly",
    "Product",
    "SQL",
    "MySQL",
  ];

  const handleAddJobOffer = () => {
    console.log(company);
    if (company) {
      fetch(`http://localhost:3000/api/joboffer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          addJobOffer: {
            job_company_name: company.name,
            job_company_id: company.name,
            job_title: jobTitle,
            job_title_role: jobTitleRole,
            job_title_sub_role: jobTitleSubRole,
            job_start_date: startDate,
            job_description: jobDescription,
            skills: jobSkills,
            job_title_levels: jobLevels,
          },
        }),
      })
        .then((response) => response.json())
        .then((result) => {});
    }
  };

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return (
          <>
            <Typography
              variant="h6"
              fontWeight="bold"
              fontFamily="Anek Odia"
              gutterBottom
              sx={{ mb: 2 }}
            >
              Job offer info
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <InputLabel id="demo-simple-select-standard-label">
                  <Typography
                    variant="body1"
                    fontWeight={600}
                    fontFamily="Anek Odia"
                  >
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
                  <Typography
                    variant="body1"
                    fontWeight={600}
                    fontFamily="Anek Odia"
                  >
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
                  <Typography
                    variant="body1"
                    fontWeight={600}
                    fontFamily="Anek Odia"
                  >
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
                  <Typography
                    variant="body1"
                    fontWeight={600}
                    fontFamily="Anek Odia"
                  >
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
                  <Typography
                    variant="body1"
                    fontWeight={600}
                    fontFamily="Anek Odia"
                  >
                    Levels
                  </Typography>
                </InputLabel>
                <div>
                  <FormControlLabel
                    control={
                      <Checkbox onChange={() => jobLevels.push("Senior")} />
                    }
                    label={
                      <Typography variant="body1" fontFamily="Anek Odia">
                        Senior
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    control={
                      <Checkbox onChange={() => jobLevels.push("Junior")} />
                    }
                    label={
                      <Typography variant="body1" fontFamily="Anek Odia">
                        Junior
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    control={
                      <Checkbox onChange={() => jobLevels.push("Intern")} />
                    }
                    label={
                      <Typography variant="body1" fontFamily="Anek Odia">
                        Intern
                      </Typography>
                    }
                  />
                </div>
              </Grid>

              <Grid item xs={12} sm={6}>
                {/* TODO: Add start date */}
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="demo-simple-select-standard-label">
                  <Typography
                    variant="body1"
                    fontWeight={600}
                    fontFamily="Anek Odia"
                  >
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
          </>
        );
      case 1:
        return (
          <>
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              fontFamily="Anek Odia"
              sx={{ mb: 2 }}
            >
              Choose relevant skills to position
            </Typography>
            <Grid item>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    width: "60%",
                  }}
                >
                  {skills.map((skill) => {
                    return (
                      <FormControlLabel
                        control={
                          <Checkbox onChange={() => handleAddSkills(skill)} />
                        }
                        label={
                          <Typography
                            variant="subtitle1"
                            fontFamily="Anek Odia"
                          >
                            {skill}
                          </Typography>
                        }
                      />
                    );
                  })}
                </div>
                <br />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="body1" fontFamily="Anek Odia">
                    Or insert skills
                  </Typography>
                  <TextField
                    sx={{ width: "40%" }}
                    value={newSkill}
                    onChange={(event) => {
                      setNewSkill(event.target.value);
                    }}
                  />
                  <Button
                    onClick={addNewSkill}
                    sx={{ width: "12%", marginTop: "5px" }}
                  >
                    {
                      <Typography variant="body1" fontFamily="Anek Odia">
                        Add new skill
                      </Typography>
                    }
                  </Button>
                </div>
              </div>
            </Grid>
          </>
        );
      case 2:
        return (
          <div style={{ width: "50%", marginLeft: "5px" }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              gutterBottom
              fontFamily="Anek Odia"
            >
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
              <Typography variant="h6" fontWeight="bold" fontFamily="Anek Odia">
                Job title
              </Typography>

              <Typography variant="subtitle2" fontFamily="Anek Odia">
                {jobTitle}
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
              <Typography variant="h6" fontWeight="bold" fontFamily="Anek Odia">
                Job title role
              </Typography>

              <Typography variant="subtitle2" fontFamily="Anek Odia">
                {jobTitleRole}
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
              <Typography variant="h6" fontWeight="bold" fontFamily="Anek Odia">
                Job title sub role
              </Typography>

              <Typography variant="subtitle2" fontFamily="Anek Odia">
                {jobTitleSubRole}
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
              <Typography variant="h6" fontWeight="bold" fontFamily="Anek Odia">
                Job levels
              </Typography>

              {jobLevels.map((level) => {
                return (
                  <Typography variant="subtitle2" fontFamily="Anek Odia">
                    {level}
                  </Typography>
                );
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
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  fontFamily="Anek Odia"
                  gutterBottom
                >
                  Skills
                </Typography>
                {jobSkills.map((skill, index) => {
                  return (
                    <Typography
                      key={index}
                      gutterBottom
                      variant="subtitle2"
                      fontFamily="Anek Odia"
                    >
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
              <Typography variant="h6" fontWeight="bold" fontFamily="Anek Odia">
                Job description
              </Typography>

              <Typography variant="subtitle2" fontFamily="Anek Odia">
                {jobDescription}
              </Typography>
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
  };

  return (
    <>
      <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>
              <Typography fontFamily="Anek Odia">{label}</Typography>
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

import React, { useState } from "react";
import {
  Button,
  Step,
  Stepper,
  StepLabel,
  Stack,
  Typography,
  Grid,
  ListItem,
  ListItemText,
  List,
  Autocomplete,
  TextField,
} from "@mui/material";
import MainCard from "../ui-components/MainCard";
import AnimateButton from "../ui-components/AnimateButton";
import { Company, JobOffer } from "../types/candidates-types";

const info = {
  full_name: "sivansss",
};

const steps = ["Job details", "Needed skills", "Summery"];

const jobSkillsOptions = [
  { label: "C", id: 1 },
  { label: "C++", id: 2 },
  { label: "Python", id: 3 },
  { label: "Js", id: 4 },
  { label: "React", id: 5 },
  { label: "Assembly", id: 6 },
  { label: "Devops", id: 7 },
];

interface JobOfferFormProps {
  handleClose?: () => void;
  company: Company | undefined;
  jobOffer?: JobOffer;
}

const skillsObj: { label: string; id: number }[][] = [];
const JobOfferForm = ({
  handleClose,
  company,
  jobOffer,
}: JobOfferFormProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [jobTitle, setJobTitle] = useState("");
  const [jobTitleRole, setJobTitleRole] = useState("");
  const [jobTitleSubRole, setJobTitleSubRole] = useState("");
  const [startDate, setStartDate] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobSkills, setJobSkills] = useState([]);

  const handleAddJobOffer = (info: Object) => {
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
            role_description: jobDescription,
            skills: jobSkills,
          },
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
        });
    }
  };

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return (
          <>
            <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
              Job offer info
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="jobTitle"
                  label="Job title"
                  fullWidth
                  autoComplete=""
                  value={jobTitle}
                  onChange={(event) => {
                    setJobTitle(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="jobTitleRole"
                  label="Job title role"
                  fullWidth
                  autoComplete=""
                  value={jobTitleRole}
                  onChange={(event) => {
                    setJobTitleRole(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="address1Basic"
                  name="jobTitleSubRole"
                  label="Job title sub role"
                  fullWidth
                  autoComplete=""
                  value={jobTitleSubRole}
                  onChange={(event) => {
                    setJobTitleSubRole(event.target.value);
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="jobStartDate"
                  label="Job start date"
                  fullWidth
                  autoComplete=""
                  value={startDate}
                  onChange={(event) => {
                    setStartDate(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="roleDescription"
                  label="Role description"
                  multiline
                  fullWidth
                  rows={4}
                  autoComplete=""
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
            <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
              Choose relevant skills to position
            </Typography>
            <Grid container spacing={3}>
              <Grid item>
                <Autocomplete
                  multiple
                  options={jobSkillsOptions}
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => <TextField {...params} />}
                  fullWidth
                  // onChange={(event, value) => skillsObj.push(value)}
                />
              </Grid>
            </Grid>
          </>
        );
      case 2:
        return (
          <>
            <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
              Job offer summery
            </Typography>
            <List disablePadding>
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary={"Job title"} />
                <Typography variant="body2">{jobTitle}</Typography>
              </ListItem>
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary={"Job title role"} />
                <Typography variant="body2">{jobTitleRole}</Typography>
              </ListItem>
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary={"Job title sub role"} />
                <Typography variant="body2">{jobTitleSubRole}</Typography>
              </ListItem>
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary={"Job start date"} />
                <Typography variant="body2">{startDate}</Typography>
              </ListItem>
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary={"Job description"} />
                <Typography variant="body2">{jobDescription}</Typography>
              </ListItem>
            </List>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Skills
                </Typography>
                {jobSkills.map((skill) => {
                  return <Typography gutterBottom>{skill}</Typography>;
                })}
              </Grid>
            </Grid>
          </>
        );
      default:
        throw new Error("Unknown step");
    }
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    if (skillsObj.length > 0) {
      const tmp = [] as any;
      skillsObj.forEach((val) => {
        val.forEach((skill) => tmp.push(skill.label));
      });
      setJobSkills(tmp);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <MainCard title="Adding new job offer">
      <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
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
            >
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ my: 3, ml: 1 }}>
                  Back
                </Button>
              )}
              {activeStep === steps.length - 1 ? (
                <AnimateButton>
                  <Button
                    variant="contained"
                    onClick={() => handleAddJobOffer(info)}
                    sx={{ my: 3, ml: 1 }}
                  >
                    Add new job offer
                  </Button>
                </AnimateButton>
              ) : (
                <AnimateButton>
                  <Button
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
    </MainCard>
  );
};

export default JobOfferForm;

import { useState } from "react";
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
  Select,
  MenuItem,
  InputLabel,
  FormControlLabel,
} from "@mui/material";
import AnimateButton from "../ui-components/AnimateButton";
import { Company, JobOffer } from "../types/candidates-types";
import Checkbox from "@mui/material/Checkbox";

const steps = ["Job details", "Needed skills", "Summery"];

const skillsObj: { label: string; id: number }[][] = [];
const JobOfferForm = ({ company, jobOffer }: JobOfferFormProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [jobTitle, setJobTitle] = useState("");
  const [jobTitleRole, setJobTitleRole] = useState("");
  const [jobTitleSubRole, setJobTitleSubRole] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [jobDescription, setJobDescription] = useState("");
  const [jobSkills, setJobSkills] = useState([]);
  const [jobIndustry, setJobIndustry] = useState("Industry");

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
                  Industry
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
                  Levels
                </InputLabel>
                <div>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Senior"
                  />
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Junior"
                  />
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Senior"
                  />
                </div>
              </Grid>

              <Grid item xs={12} sm={6}>
                {/* <DesktopDatePicker
                  label="Date desktop"
                  inputFormat="MM/dd/yyyy"
                  //value={startDate}

                  //onChange={(event) => setStartDate(event)}
                  renderInput={(params) => <TextField {...params} />}
                /> */}
              </Grid>
              <Grid item xs={12}>
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
                        control={<Checkbox />}
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
                <Typography variant="body1" fontFamily="Anek Odia">
                  Or insert skills
                </Typography>
                <TextField
                  sx={{ width: "40%" }}
                  value={jobDescription}
                  onChange={(event) => {
                    setJobDescription(event.target.value);
                  }}
                />
              </div>
            </Grid>
          </>
        );
      case 2:
        return (
          <>
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              fontFamily="Anek Odia"
              sx={{ mb: 2 }}
            >
              Job offer summery
            </Typography>
            <List disablePadding>
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary={"Job title"} />
                <Typography variant="subtitle2">{jobTitle}</Typography>
              </ListItem>
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary={"Job title role"} />
                <Typography variant="subtitle2">{jobTitleRole}</Typography>
              </ListItem>
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary={"Job title sub role"} />
                <Typography variant="subtitle2">{jobTitleSubRole}</Typography>
              </ListItem>
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary={"Job start date"} />
                <Typography variant="subtitle2">{startDate}</Typography>
              </ListItem>
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary={"Job description"} />
                <Typography variant="subtitle2">{jobDescription}</Typography>
              </ListItem>
            </List>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                  Skills
                </Typography>
                {jobSkills.map((skill) => {
                  return (
                    <Typography gutterBottom variant="subtitle2">
                      {skill}
                    </Typography>
                  );
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
                    // onClick={() => handleAddJobOffer(info)}
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

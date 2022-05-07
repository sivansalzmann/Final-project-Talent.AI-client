import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import {
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Candidate } from "../../types/candidates-types";
import { JobOffer } from "../../types/jobOffer-types";

const DialogSelect: FC<DialogSelectProps> = ({
  candidate,
  skillsSelected,
  jobOffer,
  newCandidate,
  isInterests,
  setSkills,
  setInterests,
  isSkills,
  selectSkills,
  selectInterests,
  isDegrees,
  isMajors,
  isMinors,
  setDegrees,
  setMajors,
  setMinors,
  degrees,
  selectMajors,
  selectMinors,
}) => {
  const [open, setOpen] = React.useState(false);
  const [jobSkills, setJobSkills] = useState<string[]>([]);
  const [interests, setInterestsCandidate] = useState<string[]>([]);
  const [degreesCheck, setDegreesCheck] = useState<string[]>([]);

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

  const interestsSelected = [
    "design",
    "skiing",
    "film connoisseur",
    "music snob",
    "ailurophile",
    "art",
    "photography",
    "biking",
    "cats",
    "fashion addict and artistically inclined",
    "interactive design",
    "flash",
    "css",
  ];
  const handleAddSkills = (skill: string) => {
    jobSkills.push(skill);
  };

  const handleAddInterests = (interest: string) => {
    interests.push(interest);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent<unknown>,
    reason?: string
  ) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  const updateSkillsJob = () => {
    fetch(`http://localhost:3000/api/joboffer/${jobOffer?._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        updateJobOffer: { jobSkills },
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setOpen(false);
      });
  };

  const updateSkillsCandidate = () => {
    fetch(`http://localhost:3000/api/candidate/${candidate?._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        update: { skills: jobSkills },
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        setOpen(false);
      });
  };

  const newCandidateSkills = () => {
    if (jobSkills && setSkills) {
      setSkills(jobSkills);
      selectSkills = jobSkills.slice();
      setJobSkills([]);
      setOpen(false);
    }
  };

  const newCandidateInterests = () => {
    console.log(setInterests);
    if (interests && setInterests) {
      setInterests(interests);
      selectInterests = interests.slice();
      setInterestsCandidate([]);
      setOpen(false);
    }
  };

  const newCandidateDegrees = () => {
    if (degreesCheck && setDegrees) {
      setDegrees(degreesCheck);
      setDegreesCheck([]);
      setOpen(false);
    }
    console.log(degreesCheck);
  };

  const degreesToCheck = ["MSC", "BSC"];

  const handleAddDegrees = (degree) => {
    degreesCheck.push(degree);
  };

  const [customSkill, setCustomSkill] = useState("");
  const [customSkillPresent, setCustomSkillPresent] = useState<string[]>([]);

  const [customInterest, setCustomInterest] = useState("");
  const [customInterestPresent, setCustomInterestPresent] = useState<string[]>(
    []
  );

  const [customDegree, setCustomDegree] = useState("");
  const [customDegreePresent, setCustomDegreePresent] = useState<string[]>([]);

  return (
    <div style={{ margin: "2%" }}>
      {!candidate ? (
        <Button
          onClick={handleClickOpen}
          variant="outlined"
          startIcon={<CheckBoxIcon />}
          sx={{ width: "200px", height: "40px" }}
        >
          {isInterests
            ? "interests"
            : isSkills
            ? " Skills"
            : isDegrees
            ? "Degrees"
            : isMinors
            ? "Minors"
            : "Majors"}
        </Button>
      ) : (
        <Button onClick={handleClickOpen}>
          <EditIcon />
        </Button>
      )}

      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle variant="h6">Choose skills</DialogTitle>
        <DialogContent>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
              {isSkills ? (
                <>
                  {skills.map((skill, index) => {
                    return (
                      <FormControlLabel
                        key={index}
                        control={
                          <Checkbox
                            onChange={() => handleAddSkills(skill)}
                            defaultChecked={
                              skillsSelected && skillsSelected.includes(skill)
                            }
                          />
                        }
                        label={
                          <Typography variant="subtitle1">{skill}</Typography>
                        }
                      />
                    );
                  })}
                  <Typography mt={1} mb={1} ml={1}>
                    OR
                  </Typography>
                  <div>
                    <TextField
                      sx={{ width: "25ch", mb: 1 }}
                      label="Add skill"
                      value={customSkill}
                      onChange={(e) => setCustomSkill(e.target.value)}
                    />
                    <Button
                      size="small"
                      sx={{ mt: 2 }}
                      onClick={() => {
                        handleAddSkills(customSkill);
                        setCustomSkillPresent([
                          ...customSkillPresent,
                          customSkill,
                        ]);
                        setCustomSkill("");
                      }}
                    >
                      Add
                    </Button>
                    {customSkillPresent.length > 0 &&
                      customSkillPresent.map((skill, index) => (
                        <Typography key={index} variant="subtitle2">
                          {skill}
                        </Typography>
                      ))}
                  </div>
                </>
              ) : isInterests ? (
                <>
                  {interestsSelected.map((interest, index) => {
                    return (
                      <FormControlLabel
                        key={index}
                        control={
                          <Checkbox
                            onChange={() => handleAddInterests(interest)}
                            defaultChecked={
                              skillsSelected &&
                              skillsSelected.includes(interest)
                            }
                          />
                        }
                        label={
                          <Typography variant="subtitle1">
                            {interest}
                          </Typography>
                        }
                      />
                    );
                  })}
                  <Typography mt={1} mb={1} ml={1}>
                    OR
                  </Typography>
                  <div>
                    <TextField
                      sx={{ width: "25ch", mb: 1 }}
                      label="Add interest"
                      value={customInterest}
                      onChange={(e) => setCustomInterest(e.target.value)}
                    />
                    <Button
                      size="small"
                      sx={{ mt: 2 }}
                      onClick={() => {
                        handleAddInterests(customInterest);
                        setCustomInterestPresent([
                          ...customInterestPresent,
                          customInterest,
                        ]);
                        setCustomInterest("");
                      }}
                    >
                      Add
                    </Button>
                    {customInterestPresent.length > 0 &&
                      customInterestPresent.map((interest, index) => (
                        <Typography key={index} variant="subtitle2">
                          {interest}
                        </Typography>
                      ))}
                  </div>
                </>
              ) : isDegrees ? (
                <>
                  {degreesToCheck.map((degree, index) => {
                    return (
                      <FormControlLabel
                        key={index}
                        value={degree}
                        control={
                          <Checkbox
                            size="small"
                            onChange={(e) => handleAddDegrees(e.target.value)}
                          />
                        }
                        label={
                          <Typography variant="subtitle2">{degree}</Typography>
                        }
                      />
                    );
                  })}
                  <Typography mt={1} mb={1} ml={1}>
                    OR
                  </Typography>
                  <div>
                    <TextField
                      sx={{ width: "25ch", mb: 1 }}
                      label="Add degree"
                      value={customDegree}
                      onChange={(e) => setCustomDegree(e.target.value)}
                    />
                    <Button
                      size="small"
                      sx={{ mt: 2 }}
                      onClick={() => {
                        handleAddDegrees(customDegree);
                        setCustomDegreePresent([
                          ...customDegreePresent,
                          customDegree,
                        ]);
                        setCustomDegree("");
                      }}
                    >
                      Add
                    </Button>
                    {customDegreePresent.length > 0 &&
                      customDegreePresent.map((degree, index) => (
                        <Typography key={index} variant="subtitle2">
                          {degree}
                        </Typography>
                      ))}
                  </div>
                </>
              ) : isMajors ? (
                <></>
              ) : (
                isMinors && <></>
              )}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {jobOffer ? (
            <Button onClick={updateSkillsJob}>Update</Button>
          ) : isSkills ? (
            <Button onClick={newCandidateSkills}>Add</Button>
          ) : isInterests ? (
            <Button onClick={newCandidateInterests}>Save</Button>
          ) : isDegrees ? (
            <Button onClick={newCandidateDegrees}>Save</Button>
          ) : isMajors ? (
            <Button onClick={updateSkillsCandidate}>Save</Button>
          ) : isMinors ? (
            <Button onClick={updateSkillsCandidate}>Save</Button>
          ) : (
            <Button onClick={updateSkillsCandidate}>Save</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export interface DialogSelectProps {
  candidate?: Candidate;
  skillsSelected?: string[];
  jobOffer?: JobOffer;
  isInterests?: boolean;
  newCandidate?: boolean;
  setSkills?: (jobSkills: string[]) => void;
  setInterests?: (interests: string[]) => void;
  isSkills?: boolean;
  selectSkills?: string[];
  selectInterests?: string[];
  isDegrees?: boolean;
  isMajors?: boolean;
  isMinors?: boolean;
  setDegrees?: (selectedDegrees: string[]) => void;
  setMinors?: (selectedMinors: string[]) => void;
  setMajors?: (selectedMajors: string[]) => void;
  degrees?: string[];
  selectMajors?: string[];
  selectMinors?: string[];
}

export default DialogSelect;

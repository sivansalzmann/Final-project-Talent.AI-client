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
  index,
  isUpdateSkillsCandidate,
}) => {
  const [open, setOpen] = React.useState(false);
  const [jobSkills, setJobSkills] = useState<string[]>([]);
  const [interests, setInterestsCandidate] = useState<string[]>([]);
  const [degreesCheck, setDegreesCheck] = useState<string[]>([]);
  const [majorsCheck, setMajorsCheck] = useState<string[]>([]);
  const [minorsCheck, setMinorsCheck] = useState<string[]>([]);

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
  const handleAddSkills = (skill: string, state?: boolean) => {
    if (state === false) {
      skillsSelected = skillsSelected?.filter((s) => s !== skill);
    } else {
      jobSkills.push(skill);
    }
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
        updateJobOffer: { skills: jobSkills },
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setOpen(false);
      });
  };

  const updateSkillsCandidate = () => {
    console.log(jobSkills);
    let tmp: string[] = [];
    if (skillsSelected) tmp = jobSkills.concat(skillsSelected);
    fetch(`http://localhost:3000/api/candidate/${candidate?._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        update: { skills: tmp },
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(skillsSelected);
        setOpen(false);
        //window.location.reload();
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
    console.log(index);
    if (setDegrees !== undefined && index !== undefined) {
      setDegrees(
        index,
        undefined,
        undefined,
        degreesCheck,
        undefined,
        undefined
      );
      setDegreesCheck([]);
      setOpen(false);
    }
    console.log(degreesCheck);
  };

  const newCandidateMajors = () => {
    console.log(index);
    if (setMajors !== undefined && index !== undefined) {
      setMajors(index, undefined, undefined, undefined, majorsCheck, undefined);
      setCustomMajorPresent([]);
      setOpen(false);
    }
    console.log(majorsCheck);
  };

  const newCandidateMinors = () => {
    console.log(index);
    if (setMinors !== undefined && index !== undefined) {
      console.log(selectMinors);
      setMinors(index, undefined, undefined, undefined, undefined, minorsCheck);
      setCustomMinorPresent([]);
      setOpen(false);
    }
    console.log(minorsCheck);
  };

  const degreesToCheck = ["MSC", "BSC"];

  const handleAddDegrees = (degree) => {
    degreesCheck.push(degree);
  };

  const handleAddMinors = (minor) => {
    minorsCheck.push(minor);
  };

  const handleAddMajors = (major) => {
    majorsCheck.push(major);
  };

  const [customSkill, setCustomSkill] = useState("");
  const [customSkillPresent, setCustomSkillPresent] = useState<string[]>([]);

  const [customInterest, setCustomInterest] = useState("");
  const [customInterestPresent, setCustomInterestPresent] = useState<string[]>(
    []
  );

  const [customDegree, setCustomDegree] = useState("");
  const [customMajor, setCustomMajor] = useState("");
  const [customMinor, setCustomMinor] = useState("");
  const [customMajorPresent, setCustomMajorPresent] = useState<string[]>([]);
  const [customMinorPresent, setCustomMinorPresent] = useState<string[]>([]);

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
        <DialogTitle variant="h6">
          {isSkills
            ? "Choose skills"
            : isDegrees
            ? "Choose degrees"
            : isMajors
            ? "Choose majors"
            : isInterests
            ? "Choose interests"
            : isMinors
            ? "Choose minors"
            : null}
        </DialogTitle>
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
                            onChange={(e) =>
                              handleAddSkills(skill, e.target.checked)
                            }
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
                      onClick={(e) => {
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
                        <Typography key={index} variant="subtitle2" m={1}>
                          {degree}
                        </Typography>
                      ))}
                  </div>
                </>
              ) : isMajors ? (
                <div>
                  <TextField
                    sx={{ width: "25ch", m: 1 }}
                    label="Add major"
                    value={customMajor}
                    onChange={(e) => setCustomMajor(e.target.value)}
                  />
                  <Button
                    size="small"
                    sx={{ mt: 2 }}
                    onClick={() => {
                      handleAddMajors(customMajor);
                      setCustomMajorPresent([
                        ...customMajorPresent,
                        customMajor,
                      ]);
                      setCustomMajor("");
                    }}
                  >
                    Add
                  </Button>
                  {customMajorPresent.length > 0 &&
                    customMajorPresent.map((major, index) => (
                      <Typography key={index} variant="subtitle2" m={1}>
                        {major}
                      </Typography>
                    ))}
                </div>
              ) : (
                isMinors && (
                  <div>
                    <TextField
                      sx={{ width: "25ch", m: 1 }}
                      label="Add minor"
                      value={customMinor}
                      onChange={(e) => setCustomMinor(e.target.value)}
                    />
                    <Button
                      size="small"
                      sx={{ mt: 2 }}
                      onClick={() => {
                        handleAddMinors(customMinor);
                        setCustomMinorPresent([
                          ...customMinorPresent,
                          customMinor,
                        ]);
                        setCustomMinor("");
                      }}
                    >
                      Add
                    </Button>
                    {customMinorPresent.length > 0 &&
                      customMinorPresent.map((minor, index) => (
                        <Typography key={index} variant="subtitle2" m={1}>
                          {minor}
                        </Typography>
                      ))}
                  </div>
                )
              )}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {jobOffer ? (
            <Button onClick={updateSkillsJob}>Update</Button>
          ) : isSkills && !isUpdateSkillsCandidate ? (
            <Button onClick={newCandidateSkills}>Add</Button>
          ) : isInterests ? (
            <Button onClick={newCandidateInterests}>Save</Button>
          ) : isDegrees ? (
            <Button onClick={newCandidateDegrees}>Save</Button>
          ) : isUpdateSkillsCandidate ? (
            <Button onClick={updateSkillsCandidate}>Update</Button>
          ) : isMinors ? (
            <Button onClick={newCandidateMinors}>Save</Button>
          ) : (
            <Button onClick={newCandidateMajors}>Save</Button>
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
  setDegrees?: (
    i: number,
    e?:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    date?: { name: string; value: string },
    degrees?: string[],
    majors?: string[],
    minors?: string[]
  ) => void;
  setMinors?: (
    i: number,
    e?:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    date?: { name: string; value: string },
    degrees?: string[],
    majors?: string[],
    minors?: string[]
  ) => void;
  setMajors?: (
    i: number,
    e?:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    date?: { name: string; value: string },
    degrees?: string[],
    majors?: string[],
    minors?: string[]
  ) => void;
  degrees?: string[];
  selectMajors?: string[];
  selectMinors?: string[];
  index?: number;
  isUpdateSkillsCandidate?: boolean;
}

export default DialogSelect;

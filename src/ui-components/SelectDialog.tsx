import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";

export default function DialogSelect({
  candidate,
  skillsSelected,
  jobOffer,
  interests,
}) {
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState<number | string>("");
  const [jobSkills] = useState<string[]>([]);

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

  return (
    <div style={{ margin: "2%" }}>
      {!candidate ? (
        <Button
          onClick={handleClickOpen}
          variant="outlined"
          startIcon={<CheckBoxIcon />}
          sx={{ width: "150px", height: "40px" }}
        >
          {interests ? "interests" : " Skills"}
        </Button>
      ) : (
        <Button onClick={handleClickOpen}>
          <EditIcon />
        </Button>
      )}

      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography variant="h6" fontFamily="Anek Odia">
            Choose skills
          </Typography>
        </DialogTitle>
        <DialogContent>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
              {!interests
                ? skills.map((skill, index) => {
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
                          <Typography
                            variant="subtitle1"
                            fontFamily="Anek Odia"
                          >
                            {skill}
                          </Typography>
                        }
                      />
                    );
                  })
                : interestsSelected.map((skill) => {
                    return (
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={() => handleAddSkills(skill)}
                            defaultChecked={
                              skillsSelected && skillsSelected.includes(skill)
                            }
                          />
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
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {jobOffer ? (
            <Button onClick={updateSkillsJob}>Update</Button>
          ) : (
            <Button onClick={updateSkillsCandidate}>Save</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

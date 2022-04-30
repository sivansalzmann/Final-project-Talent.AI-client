import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";

export default function DialogSelect({ candidate, skillsSelected }) {
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
  const handleAddSkills = (skill: string) => {
    jobSkills.push(skill);
  };
  const handleChange = (event: SelectChangeEvent<typeof age>) => {
    setAge(Number(event.target.value) || "");
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

  return (
    <div style={{ margin: "2%" }}>
      {!candidate ? (
        <Button
          onClick={handleClickOpen}
          variant="outlined"
          startIcon={<CheckBoxIcon />}
          sx={{ width: "150px", height: "40px" }}
        >
          Skills
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
              {skills.map((skill) => {
                return (
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={() => handleAddSkills(skill)}
                        checked={
                          skillsSelected && skillsSelected.includes(skill)
                        }
                      />
                    }
                    label={
                      <Typography variant="subtitle1" fontFamily="Anek Odia">
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
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

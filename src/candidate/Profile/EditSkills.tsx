import {
  Button,
  Checkbox,
  Dialog,
  FormControlLabel,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import { Candidate } from "../../types/candidates-types";
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";

const EditSkills: FC<EditSkillsProps> = ({ candidate }) => {
  const skillsList = [
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
  const [skillsModel, setSkillsModel] = useState(false);
  const [skills, setSkills] = useState<string[]>(candidate.skills);
  let [skillsInput, setSkillsInput] = useState<string[]>(candidate.skills);
  const [customSkills, setCustomSkill] = useState("");
  const skillsTmp = skillsList.concat(skills);
  const [customSkillPresent, setCustomSkillPresent] = useState<string[]>([]);
  const editSkills = () => {
    fetch(`${process.env.REACT_APP_SERVER}/api/candidate/${candidate?._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        update: {
          skills: skillsInput.concat(customSkillPresent),
        },
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setSkillsModel(false);
        window.location.reload();
      });
  };

  return (
    <>
      <IconButton onClick={() => setSkillsModel(true)}>
        <EditIcon fontSize="small" color="primary" />
      </IconButton>
      <Dialog open={skillsModel} onClose={() => setSkillsModel(false)}>
        <div style={{ margin: "5%" }}>
          <Typography variant="h6" color="black" m={1}>
            Edit skills
          </Typography>
          {skillsTmp.map((skill, index) => {
            return (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    value={skill}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSkillsInput([...skills, e.target.value]);
                      } else {
                        console.log(skillsInput);
                        skillsInput = skillsInput.filter((s) => {
                          return s !== skill;
                        });
                      }
                    }}
                    defaultChecked={
                      candidate.skills && candidate.skills.includes(skill)
                    }
                  />
                }
                label={<Typography variant="subtitle1">{skill}</Typography>}
              />
            );
          })}
          <Typography m={1}>OR</Typography>
          <TextField
            sx={{ width: "25ch", mb: 1 }}
            label="Add skill"
            value={customSkills}
            onChange={(e) => setCustomSkill(e.target.value)}
          />
          <Button
            size="small"
            sx={{ m: 1 }}
            onClick={(e) => {
              setCustomSkillPresent([...customSkillPresent, customSkills]);
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

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              margin: "1%",
            }}
          >
            <Button
              startIcon={<SendIcon />}
              variant="contained"
              sx={{
                width: "20%",
              }}
              onClick={editSkills}
            >
              <Typography variant="body2" mt={0.5} color="white">
                Send
              </Typography>
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

interface EditSkillsProps {
  candidate: Candidate;
}

export default EditSkills;

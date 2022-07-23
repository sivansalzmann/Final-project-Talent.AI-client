import {
  Button,
  Checkbox,
  Dialog,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { JobOffer } from "../types/jobOffer-types";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const EditSkillsJobOffer: FC<EditSkillsJobOfferProps> = ({ jobOffer }) => {
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
  const [skills] = useState<string[]>(jobOffer.skills);
  const [skillsInput, setSkillsInput] = useState<string[]>(jobOffer.skills);
  const [customSkills, setCustomSkill] = useState("");
  const skillsTmp = skillsList
    .filter((item) => !skills.includes(item))
    .concat(skills);
  const [customSkillPresent, setCustomSkillPresent] = useState<string[]>([]);

  const editSkillsJobOffer = () => {
    fetch(`${process.env.REACT_APP_SERVER}/api/joboffer/${jobOffer._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        updateJobOffer: {
          skills: skillsInput.concat(customSkillPresent),
        },
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        setSkillsModel(false);
        window.location.reload();
      });
  };

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<CheckBoxIcon />}
        sx={{ width: "200px", height: "40px", marginTop: "10px" }}
        size="small"
        onClick={() => {
          setSkillsModel(true);
        }}
      >
        Edit skills
      </Button>
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
                        setSkillsInput([...skillsInput, e.target.value]);
                      } else {
                        setSkillsInput(
                          skillsInput.filter((s) => {
                            return s !== skill;
                          })
                        );
                      }
                    }}
                    defaultChecked={
                      jobOffer.skills && jobOffer.skills.includes(skill)
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
              onClick={editSkillsJobOffer}
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

interface EditSkillsJobOfferProps {
  jobOffer: JobOffer;
}

export default EditSkillsJobOffer;

import {
  Box,
  Button,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  IconButton,
  Dialog,
  TextField,
  InputAdornment,
} from "@mui/material";
import Avatar from "../../ui-components/Avatar";
import SubCard from "../../ui-components/SubCard";
import PhonelinkRingTwoToneIcon from "@mui/icons-material/PhonelinkRingTwoTone";
import PinDropTwoToneIcon from "@mui/icons-material/PinDropTwoTone";
import { FC, useState } from "react";
import FactoryIcon from "@mui/icons-material/Factory";
import { Candidate } from "../../types/candidates-types";
import { Cookie } from "universal-cookie";
import { capitalizeFirstLetter } from "../../app-utils";
import EditCandidateEducation from "./EditCandidateEducation";
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import EditCandidateExp from "./EditCandidateExp";
import EditSkills from "./EditSkills";

const CandidateProfile: FC<CandidateProfileProps> = ({ candidate, user }) => {
  const [personalInfo, setPersonalInfo] = useState(false);
  const [personalInfoContent, setPersonalInfoContant] = useState("");

  const handleEditPeronalInfo = () => {
    setPersonalInfo(true);
  };

  const editPersonalInfo = () => {
    fetch(`${process.env.REACT_APP_SERVER}/api/candidate/${candidate?._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        update: {
          personalInfo: personalInfoContent,
        },
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setPersonalInfo(false);
        window.location.reload();
      });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div style={{ borderColor: "white", width: "41%" }}>
            <SubCard
              title={
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Avatar alt="User 1" src={user.avatar} />
                  </Grid>
                  <Grid item xs zeroMinWidth>
                    <Typography align="left" variant="h6">
                      {capitalizeFirstLetter(candidate && candidate.first_name)}
                      &nbsp;
                      {capitalizeFirstLetter(candidate && candidate.last_name)}
                    </Typography>
                    <Typography
                      align="left"
                      variant="subtitle2"
                      fontWeight={300}
                    >
                      {candidate && capitalizeFirstLetter(candidate.job_title)}
                    </Typography>
                  </Grid>
                </Grid>
              }
            >
              <List component="nav" aria-label="main mailbox folders">
                <ListItemButton>
                  <ListItemIcon>
                    <FactoryIcon sx={{ fontSize: "1.3rem" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle2">Industry</Typography>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Typography variant="subtitle2" align="right">
                      {capitalizeFirstLetter(candidate?.industry)}
                    </Typography>
                  </ListItemSecondaryAction>
                </ListItemButton>
                <Divider />
                <ListItemButton>
                  <ListItemIcon>
                    <PhonelinkRingTwoToneIcon sx={{ fontSize: "1.3rem" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography variant="subtitle2">Email</Typography>}
                  />
                  <ListItemSecondaryAction>
                    <Typography variant="subtitle2" align="right">
                      {user.email}
                    </Typography>
                  </ListItemSecondaryAction>
                </ListItemButton>
                <Divider />
                <ListItemButton>
                  <ListItemIcon>
                    <PinDropTwoToneIcon sx={{ fontSize: "1.3rem" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle2">
                        Current company
                      </Typography>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Typography variant="subtitle2" align="right">
                      {capitalizeFirstLetter(candidate?.job_company_name)}
                    </Typography>
                  </ListItemSecondaryAction>
                </ListItemButton>
              </List>
            </SubCard>
          </div>
          <div style={{ width: "55%" }}>
            <SubCard
              title={
                <Typography variant="h6" color="black" fontWeight="bold">
                  About me
                </Typography>
              }
              secondary={
                <IconButton onClick={handleEditPeronalInfo}>
                  <EditIcon fontSize="small" color="primary" />
                </IconButton>
              }
            >
              <Grid container direction="column" spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    {candidate.personalInfo}
                  </Typography>
                </Grid>
              </Grid>
            </SubCard>
          </div>
        </div>
        <div style={{ marginTop: "5%" }}>
          <SubCard
            title={
              <Typography variant="h6" color="black" fontWeight="bold">
                Skills
              </Typography>
            }
            secondary={
              // <DialogSelect
              //   isUpdateSkillsCandidate
              //   candidate={candidate}
              //   skillsSelected={candidate?.skills}
              //   isSkills
              // />
              <EditSkills candidate={candidate} />
            }
          >
            <Grid container spacing={2}>
              {candidate?.skills.map((skill, index) => {
                return (
                  <Grid item xs={12} md={6} key={index}>
                    <Typography variant="body2">{skill}</Typography>
                  </Grid>
                );
              })}
            </Grid>
          </SubCard>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div style={{ marginTop: "5%", width: "48%" }}>
            <SubCard
              title={
                <Typography variant="h6" color="black" fontWeight="bold">
                  Education
                </Typography>
              }
            >
              {candidate &&
                candidate.education.map((education, index) => {
                  return (
                    <Grid container direction="column" key={index}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="h6" ml={1}>
                          {education.degrees[0]}
                        </Typography>
                        <EditCandidateEducation
                          index={index}
                          candidate={candidate}
                        />
                      </div>
                      <Grid container justifyContent="space-between" m={1}>
                        <Grid item xs={12} sm={8}>
                          {education.start_date && (
                            <>
                              <Typography
                                variant="subtitle1"
                                color="text.primary"
                                mt={1}
                              >
                                Start date:
                              </Typography>
                            </>
                          )}
                          {education.end_date && (
                            <>
                              <Typography variant="subtitle2">
                                {education.start_date}
                              </Typography>
                              <Typography
                                variant="subtitle1"
                                color="text.primary"
                                mt={1}
                              >
                                <b>End date:</b>
                              </Typography>
                              <Typography variant="subtitle2">
                                {education.end_date}
                              </Typography>
                            </>
                          )}
                          {education.majors.length > 0 && (
                            <>
                              <Typography
                                variant="subtitle1"
                                color="text.primary"
                                mt={1}
                              >
                                <b>Majors:</b>
                              </Typography>
                              {education.majors.map((major) => {
                                return (
                                  <Typography variant="subtitle2" key={major}>
                                    {major}
                                  </Typography>
                                );
                              })}
                            </>
                          )}
                          {education.minors.length > 0 && (
                            <Typography
                              variant="subtitle2"
                              color="text.primary"
                              mt={1}
                            >
                              <b>Minors:</b>
                            </Typography>
                          )}
                          {education.minors.map((minor) => {
                            return (
                              <Typography
                                variant="subtitle2"
                                color="text.primary"
                                key={minor}
                              >
                                {minor}
                              </Typography>
                            );
                          })}
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Typography
                            variant="subtitle1"
                            color="text.primary"
                            mt={1}
                          >
                            <b>School type:</b>
                          </Typography>
                          <Typography variant="subtitle2">
                            {education.school_type}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="text.primary"
                            mt={1}
                          >
                            <b>School name:</b>
                          </Typography>
                          <Typography variant="subtitle2">
                            {education.school_name}
                          </Typography>
                          {education.degrees.length > 0 && (
                            <>
                              <Typography
                                variant="subtitle1"
                                color="text.primary"
                                mt={1}
                              >
                                <b>Degrees:</b>
                              </Typography>
                              {education.degrees.map((degree) => {
                                return (
                                  <Typography
                                    variant="subtitle2"
                                    color="text.primary"
                                    key={degree}
                                  >
                                    {degree}
                                  </Typography>
                                );
                              })}
                            </>
                          )}
                          {education.gpa && (
                            <>
                              <Typography
                                variant="subtitle1"
                                color="text.primary"
                                mt={1}
                              >
                                <b>Gpa:</b>
                              </Typography>
                              <Typography variant="subtitle2">
                                {education.gpa}
                              </Typography>
                            </>
                          )}
                        </Grid>
                      </Grid>
                      <Divider sx={{ margin: "1%" }} />
                    </Grid>
                  );
                })}
            </SubCard>
          </div>
          <div style={{ marginTop: "5%", width: "48%" }}>
            <SubCard
              title={
                <Typography variant="h6" color="black" fontWeight="bold">
                  Experience
                </Typography>
              }
            >
              {candidate &&
                candidate.experience.map((exp, index) => {
                  return (
                    <Grid container direction="column" key={index}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="h6" ml={1}>
                          {exp.title_name}
                        </Typography>
                        <EditCandidateExp index={index} candidate={candidate} />
                      </div>
                      <Grid container justifyContent="space-between" m={1}>
                        <Grid item xs={12} sm={8}>
                          <Typography
                            variant="subtitle1"
                            color="text.primary"
                            mt={1}
                          >
                            <b>Company:</b>
                          </Typography>
                          <Typography variant="subtitle2">
                            {exp.company_name}
                          </Typography>
                          {exp.title_levels.length > 0 && (
                            <Typography
                              variant="subtitle1"
                              mt={1}
                              color="text.primary"
                            >
                              <b>Levels:</b>
                            </Typography>
                          )}
                          {exp.title_levels.map((level) => {
                            return (
                              <Typography variant="subtitle2" key={level}>
                                {level}
                              </Typography>
                            );
                          })}
                          <Typography
                            variant="subtitle1"
                            color="text.primary"
                            mt={1}
                          >
                            <b>Company industry:</b>
                          </Typography>
                          <Typography variant="subtitle2">
                            {exp.company_industry}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          {exp.title_role && (
                            <>
                              <Typography
                                variant="subtitle1"
                                color="text.primary"
                                mt={1}
                              >
                                <b>Title role:</b>
                              </Typography>
                              <Typography variant="subtitle2">
                                {exp.title_role}
                              </Typography>
                            </>
                          )}
                          <Typography
                            variant="subtitle1"
                            color="text.primary"
                            mt={1}
                          >
                            <b>start date:</b>
                          </Typography>
                          <Typography variant="subtitle2">
                            {exp.start_date}
                          </Typography>

                          {exp.end_date ? (
                            <>
                              <Typography
                                variant="subtitle1"
                                color="text.primary"
                                mt={1}
                              >
                                <b>End date:</b>
                              </Typography>
                              <Typography variant="subtitle2">
                                {exp.end_date}
                              </Typography>
                            </>
                          ) : (
                            <Typography variant="subtitle2">
                              Current job
                            </Typography>
                          )}
                        </Grid>
                      </Grid>
                      <Divider sx={{ margin: "1%" }} />
                    </Grid>
                  );
                })}
            </SubCard>
          </div>
        </div>
      </div>

      {personalInfo && (
        <Dialog open={personalInfo} onClose={() => setPersonalInfo(false)}>
          <div style={{ margin: "5%" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                margin: "10px",
              }}
            >
              <Typography variant="h6" color="black">
                Edit personal info
              </Typography>
              <IconButton>
                <CloseIcon
                  fontSize="small"
                  color="disabled"
                  onClick={() => setPersonalInfo(false)}
                />
              </IconButton>
            </div>
            <TextField
              label="Personal info"
              sx={{ m: 1 }}
              multiline
              rows={4}
              defaultValue={candidate.personalInfo}
              fullWidth
              InputProps={{
                startAdornment: <InputAdornment position="start" />,
              }}
              onChange={(eve) => setPersonalInfoContant(eve.target.value)}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "1%",
              }}
            >
              <Button
                startIcon={<SendIcon />}
                variant="contained"
                onClick={editPersonalInfo}
              >
                <Typography variant="body2" mt={0.5} color="white">
                  Send
                </Typography>
              </Button>
            </div>
          </div>
        </Dialog>
      )}
    </>
  );
};

export interface CandidateProfileProps {
  candidate: Candidate;
  user: Cookie;
}

export default CandidateProfile;

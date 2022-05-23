import {
  Box,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@mui/material";
import Avatar from "../../ui-components/Avatar";
import SubCard from "../../ui-components/SubCard";
import PhonelinkRingTwoToneIcon from "@mui/icons-material/PhonelinkRingTwoTone";
import PinDropTwoToneIcon from "@mui/icons-material/PinDropTwoTone";
import { FC } from "react";
import FactoryIcon from "@mui/icons-material/Factory";
import DialogSelect from "../Forms/SelectDialog";
import { Candidate } from "../../types/candidates-types";
import { Cookie } from "universal-cookie";

const CandidateProfile: FC<CandidateProfileProps> = ({ candidate, user }) => {
  return (
    <Grid container spacing={3}>
      <Grid item lg={4} xs={12} sx={{ borderColor: "white" }}>
        <SubCard
          title={
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Avatar alt="User 1" src={user.avatar} />
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography align="left" variant="h6">
                  {candidate && candidate.first_name}{" "}
                  {candidate && candidate.last_name}
                </Typography>
                <Typography align="left" variant="subtitle2" fontWeight={300}>
                  {candidate && candidate.job_title}
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
                primary={<Typography variant="subtitle1">Industry</Typography>}
              />
              <ListItemSecondaryAction>
                <Typography variant="subtitle2" align="right">
                  {candidate?.industry}
                </Typography>
              </ListItemSecondaryAction>
            </ListItemButton>
            <Divider />
            <ListItemButton>
              <ListItemIcon>
                <PhonelinkRingTwoToneIcon sx={{ fontSize: "1.3rem" }} />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="subtitle1">Email</Typography>}
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
                  <Typography variant="subtitle1">Current company</Typography>
                }
              />
              <ListItemSecondaryAction>
                <Typography variant="subtitle2" align="right">
                  {candidate?.job_company_name}
                </Typography>
              </ListItemSecondaryAction>
            </ListItemButton>
          </List>
        </SubCard>
      </Grid>
      <Grid item lg={8} xs={12}>
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <SubCard title={<Typography variant="h6">About me</Typography>}>
              <Grid container direction="column" spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    {candidate.personalInfo}
                  </Typography>
                </Grid>
              </Grid>
            </SubCard>
          </Grid>

          <Grid item>
            <SubCard title={<Typography variant="h6">Education</Typography>}>
              {candidate &&
                candidate.education.map((education, index) => {
                  return (
                    <Grid container direction="column" key={index}>
                      <Grid container justifyContent="space-between" m={1}>
                        <Grid item xs={12} sm={8}>
                          <Typography variant="subtitle1">
                            {education.start_date}-{education.end_date}
                          </Typography>
                          {education.majors.map((major) => {
                            return (
                              <Typography variant="subtitle2">
                                {major}
                              </Typography>
                            );
                          })}
                          {education.minors.map((minor) => {
                            return (
                              <Typography
                                variant="subtitle2"
                                color="text.secondary"
                              >
                                {minor}
                              </Typography>
                            );
                          })}
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Typography variant="subtitle1" fontWeight={600}>
                            {education.school_type}
                          </Typography>
                          <Typography variant="subtitle2">
                            {education.school_name}
                          </Typography>
                          {education.degrees.map((degree) => {
                            return (
                              <Typography
                                variant="subtitle2"
                                color="text.primary"
                              >
                                {degree}
                              </Typography>
                            );
                          })}
                        </Grid>
                      </Grid>
                      <Divider sx={{ margin: "1%" }} />
                    </Grid>
                  );
                })}
            </SubCard>
          </Grid>
          <Grid item>
            <SubCard title={<Typography variant="h6">Experience</Typography>}>
              {candidate &&
                candidate.experience.map((exp, index) => {
                  return (
                    <Grid container direction="column" key={index}>
                      <Grid container justifyContent="space-between" m={1}>
                        <Grid item xs={12} sm={8}>
                          <Typography variant="h6" mb={1}>
                            {exp.title_name}
                          </Typography>
                          <Typography variant="subtitle2">
                            {exp.company_name}
                          </Typography>

                          {exp.title_levels.map((level) => {
                            return (
                              <Typography variant="subtitle2">
                                {level}
                              </Typography>
                            );
                          })}
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Typography variant="subtitle2">
                            {exp.title_role}
                          </Typography>
                          <Typography variant="subtitle2">
                            start date: {exp.start_date}
                          </Typography>
                          {exp.end_date ? (
                            <Typography variant="subtitle2">
                              end date: {exp.end_date}
                            </Typography>
                          ) : (
                            <Typography variant="subtitle2" fontWeight={600}>
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
          </Grid>
          <Grid item>
            <SubCard
              title={<Typography variant="h6">Skills</Typography>}
              secondary={
                <DialogSelect
                  isUpdateSkillsCandidate
                  candidate={candidate}
                  skillsSelected={candidate?.skills}
                  isSkills
                />
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
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export interface CandidateProfileProps {
  candidate: Candidate;
  user: Cookie;
}

export default CandidateProfile;

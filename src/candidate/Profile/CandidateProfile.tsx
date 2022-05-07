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
} from "@mui/material";
import Avatar from "../../ui-components/Avatar";
import SubCard from "../../ui-components/SubCard";
import EditIcon from "@mui/icons-material/Edit";
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
      <Grid item lg={4} xs={12}>
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
          <Grid item xs={12}>
            <SubCard
              title={<Typography>About me</Typography>}
              secondary={
                <Button>
                  <EditIcon />
                </Button>
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
          </Grid>
          <Grid item xs={12}>
            <SubCard
              title={<Typography>Education</Typography>}
              secondary={
                <Button>
                  <EditIcon />
                </Button>
              }
            >
              <Grid container direction="column" spacing={1}>
                {candidate &&
                  candidate.education.map((education, index) => {
                    return (
                      <div key={index}>
                        <Grid item xs={12}>
                          <Grid container>
                            <Grid item xs={12} sm={4}>
                              <Typography variant="subtitle1">
                                {education.start_date}-{education.end_date}
                              </Typography>
                              <Typography variant="subtitle2">
                                {education.majors[0]}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                              <Typography variant="subtitle1" fontWeight={600}>
                                {education.school_type}
                              </Typography>
                              <Typography variant="subtitle2">
                                {education.school_name}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Box sx={{ display: { xs: "block", sm: "none" } }}>
                          <Grid item xs={12}>
                            <Divider />
                          </Grid>
                        </Box>
                      </div>
                    );
                  })}
              </Grid>
            </SubCard>
          </Grid>
          <Grid item xs={12}>
            <SubCard
              title={<Typography>Employment</Typography>}
              secondary={
                <Button>
                  <EditIcon />
                </Button>
              }
            >
              {candidate &&
                candidate.experience.map((exp, index) => {
                  return (
                    <Grid container direction="column" spacing={2} key={index}>
                      <Grid item xs={12}>
                        <Grid container>
                          <Grid item xs={12} sm={4}>
                            <Typography variant="subtitle1">
                              {exp.current_job
                                ? "Current job"
                                : `${exp.end_date}-${exp.start_date}`}
                            </Typography>
                            <Typography variant="subtitle2">
                              {exp.title_levels[0]}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={8}>
                            <Typography variant="subtitle1" fontWeight={600}>
                              {exp.title_name},{exp.title_role}
                            </Typography>
                            <Typography variant="subtitle2">
                              {exp.company_name},{exp.company_location_name}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Box sx={{ display: { xs: "block", sm: "none" } }}>
                        <Grid item xs={12}>
                          <Divider />
                        </Grid>
                      </Box>
                    </Grid>
                  );
                })}
            </SubCard>
          </Grid>
          <Grid item xs={12}>
            <SubCard
              title={<Typography>Skills</Typography>}
              secondary={
                <DialogSelect
                  candidate={candidate}
                  skillsSelected={candidate?.skills}
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

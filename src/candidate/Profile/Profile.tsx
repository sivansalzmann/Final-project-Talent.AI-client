// material-ui
import {
  Box,
  Button,
  CardContent,
  Chip,
  Divider,
  Grid,
  LinearProgress,
  LinearProgressProps,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";

// project imports
import Avatar from "../../ui-components/Avatar";
import SubCard from "../../ui-components/SubCard";

// assets
import EditIcon from "@mui/icons-material/Edit";
import PhonelinkRingTwoToneIcon from "@mui/icons-material/PhonelinkRingTwoTone";
import PinDropTwoToneIcon from "@mui/icons-material/PinDropTwoTone";
import MailTwoToneIcon from "@mui/icons-material/MailTwoTone";
import { useEffect, useState } from "react";
import { Candidate } from "../../types/candidates-types";
import FactoryIcon from "@mui/icons-material/Factory";

// progress
function LinearProgressWithLabel({ value, ...others }: LinearProgressProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          mr: 1,
        }}
      >
        <LinearProgress value={value} {...others} />
      </Box>
      <Box
        sx={{
          minWidth: 35,
        }}
      >
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          value!
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

// personal details table
/** names Don&apos;t look right */
function createData(
  name: string,
  calories?: string,
  fat?: string,
  carbs?: string,
  protein?: string
) {
  return { name, calories, fat, carbs, protein };
}

const Profile = ({ user }) => {
  const [candidate, setCandidate] = useState<Candidate>();
  useEffect(() => {
    fetch(`http://localhost:3000/api/candidate?googleID=${user.user.googleID}`)
      .then((response) => response.json())
      .then((result) => {
        console.log(result[0]);
        setCandidate(result[0]);
      });
  }, [user.user.googleID]);

  const rows = [
    createData("Full Name", ":", candidate?.full_name),
    createData("Gender", ":", candidate?.gender),
    createData("Industry", ":", candidate?.industry),
    createData("Birth date", ":", candidate?.birth_date),
    createData("Birth year", ":", candidate?.birth_year),
    createData("Email", ":", user.user.email),
  ];

  return (
    <Grid container spacing={3}>
      <Grid item lg={4} xs={12}>
        <SubCard
          title={
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Avatar alt="User 1" src={user.user.avatar} />
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography align="left" variant="body1" fontWeight={550}>
                  {candidate && candidate.full_name}
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
                primary={<Typography variant="subtitle1">Phone</Typography>}
              />
              <ListItemSecondaryAction>
                <Typography variant="subtitle2" align="right">
                  (+99) 9999 999 999
                </Typography>
              </ListItemSecondaryAction>
            </ListItemButton>
            <Divider />
            <ListItemButton>
              <ListItemIcon>
                <PinDropTwoToneIcon sx={{ fontSize: "1.3rem" }} />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="subtitle1">Location</Typography>}
              />
              <ListItemSecondaryAction>
                <Typography variant="subtitle2" align="right">
                  Melbourne
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
              title="About me"
              secondary={
                <Button>
                  <EditIcon />
                </Button>
              }
            >
              <Grid container direction="column" spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="body2">
                    Hello,I’m Anshan Handgun Creative Graphic Designer & User
                    Experience Designer based in Website, I create digital
                    Products a more Beautiful and usable place. Morbid accusant
                    ipsum. Nam nec tellus at.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Personal Details</Typography>
                </Grid>
                <Divider sx={{ pt: 1 }} />
                <Grid item xs={12}>
                  <TableContainer>
                    <Table
                      sx={{
                        "& td": {
                          borderBottom: "none",
                        },
                      }}
                      size="small"
                    >
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow key={row.name}>
                            <TableCell variant="head">{row.name}</TableCell>
                            <TableCell>{row.calories}</TableCell>
                            <TableCell>{row.fat}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </SubCard>
          </Grid>
          <Grid item xs={12}>
            <SubCard
              title="Education"
              secondary={
                <Button>
                  <EditIcon />
                </Button>
              }
            >
              <Grid container direction="column" spacing={1}>
                {candidate &&
                  candidate.education.map((education) => {
                    return (
                      <>
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
                              <Typography variant="subtitle1">
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
                      </>
                    );
                  })}
              </Grid>
            </SubCard>
          </Grid>
          <Grid item xs={12}>
            <SubCard
              title="Employment"
              secondary={
                <Button>
                  <EditIcon />
                </Button>
              }
            >
              {candidate &&
                candidate.experience.map((exp) => {
                  return (
                    <Grid container direction="column" spacing={2}>
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
                            <Typography variant="subtitle1">
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
              title="Skills"
              secondary={
                <Button>
                  <EditIcon />
                </Button>
              }
            >
              <Grid container spacing={2}>
                {candidate?.skills.map((skill) => {
                  return (
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2">{skill}</Typography>
                      {/* <LinearProgressWithLabel
                        color="primary"
                        variant="determinate"
                        value={70}
                      /> */}
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

export default Profile;

// material-ui
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
import DialogSelect from "../../ui-components/SelectDialog";

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
        setCandidate(result[0]);
      });
  }, [user.user.googleID]);

  const rows = [
    createData("Full Name", candidate?.full_name),
    createData("Gender", candidate?.gender),
    createData("Industry", candidate?.industry),
    createData("Birth date", candidate?.birth_date),
    createData("Birth year", candidate?.birth_year),
    createData("Email", user.user.email),
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
                <Typography
                  align="left"
                  variant="h6"
                  sx={{ fontFamily: "Anek Odia" }}
                >
                  {candidate && candidate.full_name}
                </Typography>
                <Typography
                  align="left"
                  variant="subtitle2"
                  fontWeight={300}
                  sx={{ fontFamily: "Anek Odia" }}
                >
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
                primary={
                  <Typography
                    variant="subtitle1"
                    sx={{ fontFamily: "Anek Odia" }}
                  >
                    Industry
                  </Typography>
                }
              />
              <ListItemSecondaryAction>
                <Typography
                  variant="subtitle2"
                  align="right"
                  sx={{ fontFamily: "Anek Odia" }}
                >
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
                primary={
                  <Typography
                    variant="subtitle1"
                    sx={{ fontFamily: "Anek Odia" }}
                  >
                    Phone
                  </Typography>
                }
              />
              <ListItemSecondaryAction>
                <Typography
                  variant="subtitle2"
                  align="right"
                  sx={{ fontFamily: "Anek Odia" }}
                >
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
                primary={
                  <Typography
                    variant="subtitle1"
                    sx={{ fontFamily: "Anek Odia" }}
                  >
                    Location
                  </Typography>
                }
              />
              <ListItemSecondaryAction>
                <Typography
                  variant="subtitle2"
                  align="right"
                  sx={{ fontFamily: "Anek Odia" }}
                >
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
              title={
                <Typography variant="h5" sx={{ fontFamily: "Anek Odia" }}>
                  About me
                </Typography>
              }
              secondary={
                <Button>
                  <EditIcon />
                </Button>
              }
            >
              <Grid container direction="column" spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="body2" sx={{ fontFamily: "Anek Odia" }}>
                    Hello,I’m Anshan Handgun Creative Graphic Designer & User
                    Experience Designer based in Website, I create digital
                    Products a more Beautiful and usable place. Morbid accusant
                    ipsum. Nam nec tellus at.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    sx={{ fontFamily: "Anek Odia" }}
                  >
                    Personal Details
                  </Typography>
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
                            <TableCell variant="head">
                              <Typography
                                sx={{ fontFamily: "Anek Odia" }}
                                variant="subtitle2"
                              >
                                {row.name}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                sx={{ fontFamily: "Anek Odia" }}
                                variant="subtitle2"
                              >
                                {row.calories}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                sx={{ fontFamily: "Anek Odia" }}
                                variant="subtitle2"
                              >
                                {row.fat}
                              </Typography>
                            </TableCell>
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
              title={
                <Typography variant="h5" sx={{ fontFamily: "Anek Odia" }}>
                  Education
                </Typography>
              }
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
                              <Typography
                                variant="subtitle1"
                                sx={{ fontFamily: "Anek Odia" }}
                              >
                                {education.start_date}-{education.end_date}
                              </Typography>
                              <Typography
                                variant="subtitle2"
                                sx={{ fontFamily: "Anek Odia" }}
                              >
                                {education.majors[0]}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                              <Typography
                                variant="subtitle1"
                                fontWeight={600}
                                sx={{ fontFamily: "Anek Odia" }}
                              >
                                {education.school_type}
                              </Typography>
                              <Typography
                                variant="subtitle2"
                                sx={{ fontFamily: "Anek Odia" }}
                              >
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
              title={
                <Typography variant="h5" sx={{ fontFamily: "Anek Odia" }}>
                  Employment
                </Typography>
              }
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
                            <Typography
                              variant="subtitle1"
                              sx={{ fontFamily: "Anek Odia" }}
                            >
                              {exp.current_job
                                ? "Current job"
                                : `${exp.end_date}-${exp.start_date}`}
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              sx={{ fontFamily: "Anek Odia" }}
                            >
                              {exp.title_levels[0]}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={8}>
                            <Typography
                              variant="subtitle1"
                              fontWeight={600}
                              sx={{ fontFamily: "Anek Odia" }}
                            >
                              {exp.title_name},{exp.title_role}
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              sx={{ fontFamily: "Anek Odia" }}
                            >
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
              title={
                <Typography variant="h5" sx={{ fontFamily: "Anek Odia" }}>
                  Skills
                </Typography>
              }
              secondary={
                <DialogSelect candidate={true} skillsSelected={undefined} />
              }
            >
              <Grid container spacing={2}>
                {candidate?.skills.map((skill) => {
                  return (
                    <Grid item xs={12} md={6}>
                      <Typography
                        variant="body2"
                        sx={{ fontFamily: "Anek Odia" }}
                      >
                        {skill}
                      </Typography>
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

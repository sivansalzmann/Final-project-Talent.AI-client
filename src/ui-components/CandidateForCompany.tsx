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
import SubCard from "./SubCard";
import PhonelinkRingTwoToneIcon from "@mui/icons-material/PhonelinkRingTwoTone";
import PinDropTwoToneIcon from "@mui/icons-material/PinDropTwoTone";
import { FC, useState } from "react";
import FactoryIcon from "@mui/icons-material/Factory";
import { Candidate } from "../types/candidates-types";
import { capitalizeFirstLetter } from "../app-utils";

const CandidateForCompany: FC<CandidateForCompanyProps> = ({ candidate }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ borderColor: "white" }}>
        <SubCard
          title={
            <Grid container spacing={2} alignItems="center">
              <Grid item xs zeroMinWidth>
                <Typography align="left" variant="h6" color="black">
                  {capitalizeFirstLetter(candidate && candidate.first_name)}
                  &nbsp;
                  {capitalizeFirstLetter(candidate && candidate.last_name)}
                </Typography>
                <Typography align="left" variant="subtitle2" fontWeight={300}>
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
                primary={<Typography variant="subtitle2">Industry</Typography>}
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
                  <a href={candidate.email}> {candidate.email}</a>
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
                  <Typography variant="subtitle2">Current company</Typography>
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
      <div style={{ marginTop: "5%" }}>
        <SubCard
          title={
            <Typography variant="h6" color="black" fontWeight="bold">
              Skills
            </Typography>
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

      <div style={{ marginTop: "5%" }}>
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
      <div style={{ marginTop: "5%" }}>
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
                        <Typography variant="subtitle2">Current job</Typography>
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
  );
};

export interface CandidateForCompanyProps {
  candidate: Candidate;
}

export default CandidateForCompany;

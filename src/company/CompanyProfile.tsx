import {
  CardContent,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@mui/material";
import SubCard from "../ui-components/SubCard";
import PhonelinkRingTwoToneIcon from "@mui/icons-material/PhonelinkRingTwoTone";
import PinDropTwoToneIcon from "@mui/icons-material/PinDropTwoTone";
import MailTwoToneIcon from "@mui/icons-material/MailTwoTone";
import { Company } from "../types/company-types";
import { FC, useEffect, useState } from "react";
import JobsList from "../job-offers/JobsList";
import JobsOffers from "../job-offers/JobsOffers";
import { JobOffer } from "../types/jobOffer-types";
import ItemsList from "../ui-components/ItemsList";
import { capitalizeFirstLetter } from "../app-utils";

const CompanyProfile: FC<CompanyProfileProps> = ({ company }) => {
  const [jobOffers, setJobOffers] = useState<JobOffer[]>([]);

  useEffect(() => {
    if (company) {
      fetch(
        `${process.env.REACT_APP_SERVER}/api/joboffer?job_company_name=${company.name}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((result) => {
          setJobOffers(result);
          console.log(result);
        });
    }
  }, [company]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <SubCard
        sx={{ width: "45%", height: "100%" }}
        title={
          <Grid container spacing={2} alignItems="center">
            <Grid item xs zeroMinWidth>
              <Typography align="center" variant="h5" fontWeight="bold">
                {company.name && capitalizeFirstLetter(company.name)}
              </Typography>
              <Typography align="center" variant="subtitle2">
                {company.headline && capitalizeFirstLetter(company.headline)}
              </Typography>
            </Grid>
          </Grid>
        }
      >
        <List component="nav" aria-label="main mailbox folders">
          <ListItemButton>
            <ListItemIcon>
              <MailTwoToneIcon sx={{ fontSize: "1rem" }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body1" color="text.primary">
                  Industry
                </Typography>
              }
            />
            <ListItemSecondaryAction>
              <Typography variant="body1" align="right">
                {company && company.industry}
              </Typography>
            </ListItemSecondaryAction>
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemIcon>
              <PhonelinkRingTwoToneIcon sx={{ fontSize: "1rem" }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body1" color="text.primary">
                  Website
                </Typography>
              }
            />
            <ListItemSecondaryAction>
              <Typography variant="body1" align="right">
                {company && company.website}
              </Typography>
            </ListItemSecondaryAction>
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemIcon>
              <PinDropTwoToneIcon sx={{ fontSize: "1rem" }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body1" color="text.primary">
                  Location
                </Typography>
              }
            />
            <ListItemSecondaryAction>
              <Typography variant="body1" align="right">
                {company.location.country &&
                  capitalizeFirstLetter(company.location.country)}
              </Typography>
            </ListItemSecondaryAction>
          </ListItemButton>
        </List>
        <CardContent>
          <Grid container spacing={0}>
            <Grid item xs={6}>
              <Typography align="center" variant="body1" fontWeight={600}>
                {company && company.employee_count}
              </Typography>
              <Typography align="center" variant="subtitle2">
                Employees
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="center" variant="body1" fontWeight={600}>
                {company && company.founded}
              </Typography>
              <Typography align="center" variant="subtitle2">
                Founded
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </SubCard>
      <SubCard
        sx={{ width: "50%" }}
        title={
          <Grid container spacing={2} alignItems="center">
            <Grid item xs zeroMinWidth>
              <Typography align="center" variant="h5" fontWeight="bold">
                Open job offers
              </Typography>
            </Grid>
          </Grid>
        }
      >
        <ItemsList jobs={jobOffers} company buttons={false} />
      </SubCard>
    </div>
  );
};

export interface CompanyProfileProps {
  company: Company;
}

export default CompanyProfile;

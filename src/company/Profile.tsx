// material-ui
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

import { Company } from "../types/candidates-types";

interface CompanyProps {
  company: Company;
}
const Profile = ({ company }: CompanyProps) => {
  return (
    <Grid container spacing={3}>
      <Grid item lg={20} xs={12}>
        <SubCard
          title={
            <Grid container spacing={2} alignItems="center">
              <Grid item xs zeroMinWidth>
                <Typography
                  align="center"
                  variant="h5"
                  fontWeight="bold"
                  color="secondary"
                >
                  {company.name}
                </Typography>
                <Typography align="center" variant="subtitle2">
                  {company.headline}
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
                primary={<Typography variant="subtitle2">Industry</Typography>}
              />
              <ListItemSecondaryAction>
                <Typography variant="subtitle2" align="right">
                  {company.industry}
                </Typography>
              </ListItemSecondaryAction>
            </ListItemButton>
            <Divider />
            <ListItemButton>
              <ListItemIcon>
                <PhonelinkRingTwoToneIcon sx={{ fontSize: "1rem" }} />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="subtitle2">Website</Typography>}
              />
              <ListItemSecondaryAction>
                <Typography variant="subtitle2" align="right">
                  {company.website}
                </Typography>
              </ListItemSecondaryAction>
            </ListItemButton>
            <Divider />
            <ListItemButton>
              <ListItemIcon>
                <PinDropTwoToneIcon sx={{ fontSize: "1rem" }} />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="subtitle2">Location</Typography>}
              />
              <ListItemSecondaryAction>
                <Typography variant="subtitle2" align="right">
                  {company.location.country}
                </Typography>
              </ListItemSecondaryAction>
            </ListItemButton>
          </List>
          <CardContent>
            <Grid container spacing={0}>
              <Grid item xs={6}>
                <Typography align="center" variant="body1" fontWeight="bold">
                  {company.employee_count}
                </Typography>
                <Typography align="center" variant="subtitle2">
                  Employees
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="center" variant="body1" fontWeight="bold">
                  {company.founded}
                </Typography>
                <Typography align="center" variant="subtitle2">
                  Founded
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </SubCard>
      </Grid>
    </Grid>
  );
};

export default Profile;

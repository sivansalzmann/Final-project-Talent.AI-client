import { useTheme } from "@mui/material/styles";
import { Avatar, Card, Grid, Typography } from "@mui/material";
import { gridSpacing } from "../types/constant";
import { Candidate } from "../types/candidates-types";
import PopUpForms from "../forms/PopupForms";

interface candidateProfile {
  candidate: Candidate;
}
const UserDetailsCard = ({ candidate }: candidateProfile) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        p: 2,
        border: `1px solid${theme.palette.grey[100]}`,
      }}
    >
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Typography
            variant="h4"
            component="div"
            align="center"
            color="secondary"
            fontWeight="bold"
          >
            {candidate.full_name}
          </Typography>
          <Typography variant="subtitle2" align="center">
            {candidate.job_title}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" fontWeight="bold">
            Gender
          </Typography>
          <Typography variant="subtitle2">{candidate.gender}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={6}>
              <Typography variant="body1" fontWeight="bold">
                Current employee
              </Typography>
              <Typography variant="subtitle2">
                {candidate.job_company_id}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" fontWeight="bold">
                Industry
              </Typography>
              <Typography variant="subtitle2">{candidate.industry}</Typography>
            </Grid>
            <PopUpForms formType={"cv"} candidate={candidate} />
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default UserDetailsCard;

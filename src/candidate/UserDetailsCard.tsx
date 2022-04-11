import { useTheme } from "@mui/material/styles";
import { Card, Grid, Typography } from "@mui/material";
import { gridSpacing } from "../types/constant";
import { Candidate } from "../types/candidates-types";

interface candidateProfile {
  candidate: Candidate;
}
const UserDetailsCard = ({ candidate }: candidateProfile) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        p: 2,
        border:
          theme.palette.mode === "dark"
            ? "1px solid transparent"
            : `1px solid${theme.palette.grey[100]}`,
      }}
    >
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            {/* <Grid item xs zeroMinWidth>
              <Avatar alt={candidate.full_name} size="lg" src={""} />
            </Grid> */}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3" component="div">
            {candidate.full_name}
          </Typography>
          <Typography variant="caption">{candidate.job_title}</Typography>
        </Grid>
        {/* <Grid item xs={12}>
          <Typography
            variant="subtitle2"
            sx={{ color: theme.palette.grey[700] }}
          >
            {candidate.job_company_name}
          </Typography>
        </Grid> */}
        <Grid item xs={12}>
          <Typography variant="caption">Gender</Typography>
          <Typography variant="h6">{candidate.gender}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={6}>
              <Typography variant="caption">Current employee</Typography>
              <Typography variant="h6">{candidate.job_company_id}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption">Industry</Typography>
              <Typography variant="h6">{candidate.industry}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default UserDetailsCard;

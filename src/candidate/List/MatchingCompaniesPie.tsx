// material-ui
import { Grid, Typography } from "@mui/material";

// third-party
import Chart, { Props as ChartProps } from "react-apexcharts";

// project imports
import MainCard from "../../ui-components/MainCard";

const MatchingCompaniesPie = ({ chartData }: { chartData: ChartProps }) => (
  <MainCard sx={{ border: "1px solid #6288D8 " }}>
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <Typography variant="subtitle1">Matching companies</Typography>
      </Grid>
      <Grid item>
        <Chart {...chartData} />
      </Grid>
    </Grid>
  </MainCard>
);

export default MatchingCompaniesPie;

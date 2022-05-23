import { Grid, Typography } from "@mui/material";
import { FC } from "react";
import Chart, { Props as ChartProps } from "react-apexcharts";
import MainCard from "../../ui-components/MainCard";

const MatchingCompaniesPie: FC<MatchingCompaniesPieProps> = ({ chartData }) => (
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

export interface MatchingCompaniesPieProps {
  chartData: ChartProps;
}

export default MatchingCompaniesPie;

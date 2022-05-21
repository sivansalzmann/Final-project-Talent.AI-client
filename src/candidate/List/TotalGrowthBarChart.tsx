import React, { FC } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Grid, MenuItem, TextField, Typography } from "@mui/material";

// third-party
import ApexCharts from "apexcharts";
import Chart from "react-apexcharts";

// project imports
import MainCard from "../../ui-components/MainCard";

// chart data
import chartData from "./chart";

const status = [
  {
    value: "today",
    label: "Today",
  },
  {
    value: "month",
    label: "This Month",
  },
  {
    value: "year",
    label: "This Year",
  },
];

// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const TotalGrowthBarChart: FC = () => {
  const [value, setValue] = React.useState("today");

  return (
    <>
      <MainCard>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Grid container direction="column" spacing={1}>
                  <Grid item>
                    <Typography variant="subtitle2">Total Growth</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h3">$2,324.00</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <TextField
                  id="standard-select-currency"
                  select
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                >
                  {status.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Chart {...chartData} />
          </Grid>
        </Grid>
      </MainCard>
    </>
  );
};

export default TotalGrowthBarChart;

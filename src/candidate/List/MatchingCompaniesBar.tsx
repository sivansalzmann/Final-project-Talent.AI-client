import React, { FC } from "react";
import { Box, Grid, Typography } from "@mui/material";
import Chart, { Props as ChartProps } from "react-apexcharts";
import MainCard from "../../ui-components/MainCard";
import { GenericCardProps } from "../../types/helpers";
import { MatchCompaniesData } from "../../types/candidates-types";

const MatchingCompaniesBar: FC<AnalyticsChartCardProps> = ({
  title,
  chartData,
  listData,
}) => {
  let listItem;
  if (listData) {
    listItem = listData.forEach((item, index) => (
      <Grid item key={index} sm={12}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>{item.name}</Grid>
          <Grid item>
            <Typography variant="subtitle2">{item.data}%</Typography>
          </Grid>
        </Grid>
      </Grid>
    ));
  }

  return (
    <MainCard sx={{ border: "1px solid #6288D8 " }}>
      <Grid container justifyContent="space-between" alignItems="center">
        {title && (
          <Grid item>
            <Typography variant="subtitle1" color="secondary" fontWeight="bold">
              {title}
            </Typography>
          </Grid>
        )}
      </Grid>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Chart {...chartData} />
      </div>
    </MainCard>
  );
};

interface AnalyticsChartCardProps extends GenericCardProps {
  title: string;
  chartData: ChartProps;
  listData: MatchCompaniesData[];
}

export default MatchingCompaniesBar;

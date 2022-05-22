import React, { FC, useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import ReactApexChart, { Props as ChartProps } from "react-apexcharts";
import { Candidate } from "../../types/candidates-types";

export interface ObjData {
  data: number[];
}

const ApexBarChart: FC<ApexBarChartProps> = ({ candidate }) => {
  const [bar, setBar] = useState<Map<string, number>>(new Map());
  const theme = useTheme();

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_SERVER}/api/candidate/forAlgo/${candidate?._id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        setBar(result.data);
      });
  }, [candidate?._id]);

  const series: ApexAxisChartSeries = [
    { name: "", data: Object.values(bar) as number[] },
  ];

  const barChartOptions: ChartProps = {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      zoom: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      fixed: {
        position: "top",
      },
      y: {
        formatter(val: number) {
          return `${val} %`;
        },
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    legend: {
      show: true,
      fontFamily: `'Roboto', sans-serif`,
      position: "bottom",
      offsetX: 10,
      offsetY: 10,
      labels: {
        useSeriesColors: false,
      },
      markers: {
        width: 16,
        height: 16,
        radius: 5,
      },
      itemMargin: {
        horizontal: 15,
        vertical: 8,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: Array.from(Object.keys(bar)),
    },
    fill: {
      opacity: 0.5,
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={barChartOptions}
        type="bar"
        height={350}
        series={series}
      />
    </div>
  );
};

export interface ApexBarChartProps {
  candidate: Candidate;
}

export default ApexBarChart;

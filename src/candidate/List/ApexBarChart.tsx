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
      style: {
        fontFamily: "Anek Odia",
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
    fill: {
      colors: [
        // "#F3B415",
        // "#F27036",
        // "#663F59",
        // "#6A6E94",
        // "#4E88B4",
        "#00A7C6",
        // "#18D8D8",
        // "#A9D794",
        // "#46AF78",
        // "#A93F55",
        // "#8C5E58",
        // "#2176FF",
      ],
      opacity: 0.5,
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
      fontFamily: "Anek Odia",
      offsetX: 10,
      offsetY: 10,
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
    yaxis: {
      labels: {
        style: {
          fontSize: "15px",
          fontFamily: "Anek Odia",
        },
      },
    },
    xaxis: {
      categories: Array.from(Object.keys(bar)),
      labels: {
        style: {
          fontSize: "12px",
          fontFamily: "Anek Odia",
        },
      },
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

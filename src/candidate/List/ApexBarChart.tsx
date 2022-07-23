import { FC, useEffect, useState } from "react";
import ReactApexChart, { Props as ChartProps } from "react-apexcharts";
import { Candidate } from "../../types/candidates-types";
import { capitalizeFirstLetter } from "../../app-utils";

export interface ObjData {
  data: number[];
}

const ApexBarChart: FC<ApexBarChartProps> = ({ candidate }) => {
  const [bar, setBar] = useState<Map<string, number>>(new Map());

  const [order, setOrder] = useState<string[]>([]);

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
        setOrder(result.order);
      });
  }, [candidate?._id]);

  const series: ApexAxisChartSeries = [
    { name: "", data: Object.values(bar) as number[] },
  ];

  const orderCapital = order.map((o) => {
    return capitalizeFirstLetter(o);
  });

  const orderIndex = orderCapital.map((o, index) => {
    return o + " :   " + (index + 1);
  });

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
          return `${val}`;
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
      colors: ["#00A7C6"],
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
      categories: orderIndex,
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

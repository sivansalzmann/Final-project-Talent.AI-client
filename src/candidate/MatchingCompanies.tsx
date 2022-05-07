import Page from "../dashboard/Page";
import MatchingCompaniesBar from "./List/MatchingCompaniesBar";
import { Props as ChartProps } from "react-apexcharts";
import { ReactComponent as Amazon } from "../assets/icons8-amazon.svg";
import { ReactComponent as Microsoft } from "../assets/icons8-microsoft.svg";
import AppleIcon from "@mui/icons-material/Apple";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import MatchingCompaniesList from "./List/MatchingCompaniesList";
import { Typography } from "@mui/material";
import MatchingCompaniesPie from "./List/MatchingCompaniesPie";
import { FC } from "react";

const listData = [
  {
    color: "",
    icon: <AppleIcon sx={{ color: "none" }} />,
    value: 66.6,
  },
  {
    color: "",
    icon: <Amazon />,
    value: 29.7,
  },
  {
    color: "",
    icon: <FacebookIcon />,
    value: 32.8,
  },
  {
    color: "",
    icon: <GoogleIcon />,
    value: 50.2,
  },
  {
    color: "",
    icon: <Microsoft fontSize="small" />,
    value: 50.2,
  },
];
const MatchingCompanies: FC = () => {
  const companiesDataBar: ChartProps = {
    height: 300,
    type: "bar",
    options: {
      chart: {
        id: "percentage-chart",
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {
        bar: {
          columnWidth: "55%",
          distributed: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 0,
      },
      xaxis: {
        categories: ["Apple", "Amazon", "Facebook", "Google", "Microsoft"],
      },
    },
    series: [
      {
        name: "Matching",
        data: [10, 20, 30, 40, 50],
      },
    ],
  };

  const companiesDataPie: ChartProps = {
    height: 300,
    type: "pie",
    options: {
      chart: {
        id: "satisfaction-chart",
      },
      labels: ["Apple", "Amazon", "Facebook", "Google", "Microsoft"],
      legend: {
        show: true,
        position: "bottom",
        fontFamily: "inherit",
        labels: {
          colors: "inherit",
        },
      },
      dataLabels: {
        enabled: true,
        dropShadow: {
          enabled: false,
        },
      },
      theme: {
        monochrome: {
          enabled: true,
        },
      },
    },
    series: [10, 20, 30, 40, 50],
  };

  return (
    <Page title={"Matching companies to you"}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <Typography variant="h5" fontWeight={300} marginBottom={1}>
          Companies by rate
        </Typography>
        <MatchingCompaniesList />
        <div
          style={{
            marginTop: "3%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div style={{ width: "45%" }}>
            <Typography variant="h5" fontWeight={300} marginBottom={1}>
              Companies by bar
            </Typography>
            <MatchingCompaniesBar
              title={""}
              chartData={companiesDataBar}
              listData={listData}
            />
          </div>
          <div style={{ width: "45%" }}>
            <Typography variant="h5" fontWeight={300} marginBottom={1}>
              Companies by pie
            </Typography>
            <MatchingCompaniesPie chartData={companiesDataPie} />
          </div>
        </div>
      </div>
    </Page>
  );
};

export default MatchingCompanies;

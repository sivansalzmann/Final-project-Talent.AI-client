import Page from "../dashboard/Page";
import MatchingCompaniesBar from "./List/MatchingCompaniesBar";
import { Props as ChartProps } from "react-apexcharts";
import MatchingCompaniesList from "./List/MatchingCompaniesList";
import { Typography } from "@mui/material";
import MatchingCompaniesPie from "./List/MatchingCompaniesPie";
import { FC, useEffect, useState } from "react";
import { Cookie } from "universal-cookie";
import { Company } from "../types/company-types";

const MatchingCompanies: FC<MatchingCompaniesProps> = ({ user }) => {
  const tmp: Map<string, number> = new Map([
    ["apple", 6.896551724137931],
    ["salesforce", 3.4482758620689653],
    ["ibm", 6.896551724137931],
    ["tesla", 6.896551724137931],
    ["microsoft", 6.896551724137931],
    ["oracle", 13.793103448275861],
    ["facebook", 17.24137931034483],
    ["twitter", 10.344827586206897],
    ["amazon", 10.344827586206897],
    ["uber", 6.896551724137931],
    ["adobe", 3.4482758620689653],
    ["google", 6.896551724137931],
  ]);
  const tmp1: Map<string, number> = new Map();
  tmp1.set("apple", 6.896551724137931);

  // const tmp = [
  //   { name: "apple", value: 6.896551724137931 },
  //   { name: "salesforce", value: 3.4482758620689653 },
  //   { name: "ibm", value: 6.896551724137931 },
  //   { name: "tesla", value: 6.896551724137931 },
  //   { name: "microsoft", value: 6.896551724137931 },
  //   { name: "oracle", value: 13.793103448275861 },
  //   { name: "facebook", value: 17.24137931034483 },
  //   { name: "twitter", value: 10.344827586206897 },
  //   { name: "amazon", value: 10.344827586206897 },
  //   { name: "uber", value: 6.896551724137931 },
  //   { name: "adobe", value: 3.4482758620689653 },
  //   { name: "google", value: 6.896551724137931 },
  // ];
  // const iAmAMap = new Map<string, number>(tmp.map((x) => [x.name, x.value]));
  // console.log(Object.keys(iAmAMap));
  // const newArr1 = [...tmp]; // create an Array literal and use the spread syntax on it
  // const newArr2 = Array.from(tmp);
  let keys = Array.from(tmp.keys());
  let values = Array.from(tmp.values());

  const companiesDataPie: ChartProps = {
    height: 450,
    type: "pie",
    options: {
      chart: {
        id: "satisfaction-chart",
      },
      labels: keys,
      legend: {
        show: true,
        position: "bottom",
        fontFamily: "inherit",
        // labels: {
        //   colors: "inherit",
        // },
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
    series: values,
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
          Companies rate for you
        </Typography>
        <MatchingCompaniesList user={user} />
        <div
          style={{
            marginTop: "3%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div style={{ width: "100%" }}>
            <MatchingCompaniesPie chartData={companiesDataPie} />
          </div>
        </div>
      </div>
    </Page>
  );
};

export interface MatchingCompaniesProps {
  user: Cookie;
}

export default MatchingCompanies;

import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { gridSpacing } from "../types/constant";
import { Candidate, JobOffer } from "../types/candidates-types";
import CandidateDetails from "./CandidateDetails";
import MatchingJobsToCandidate from "./MatchingJobsToCandidate";
import AnalyticsChartCard from "../ui-components/AnalyticsChartCard";
import JobsList from "../job-offers/JobsList";
import { Props as ChartProps } from "react-apexcharts";
import { ReactComponent as Amazon } from "../assets/icons8-amazon.svg";
import { ReactComponent as Microsoft } from "../assets/icons8-microsoft.svg";
import AppleIcon from "@mui/icons-material/Apple";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";

const CandidateDashboard = () => {
  useEffect(() => {
    fetch(`http://localhost:3000/api/candidate/62383eeefac2bb1e3100248c`)
      .then((response) => response.json())
      .then((result) => {
        setCandidate(result);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/api/jobOffer`)
      .then((response) => response.json())
      .then((result) => {
        const jobs = result.filter((jobOffer: JobOffer) => {
          return jobOffer.candidates_id.find(
            (id) => id === "62383eeefac2bb1e3100248c"
          );
        });
        console.log(jobs);
        setJobOffers(jobs);
      });
  }, []);

  const [candidate, setCandidate] = useState<Candidate>();
  const [jobOffers, setJobOffers] = useState([] as any[]);

  const [, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  // useEffect(() => {
  //   fetch(`http://localhost:3003/matchingCompanies/62383eeefac2bb1e3100248f`)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(response.statusText);
  //       }
  //       return response.json();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  const companiesData: ChartProps = {
    height: 224,
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

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={8}>
            <MatchingJobsToCandidate jobs={jobOffers} />
          </Grid>
          <Grid item md={4} xs={12}>
            {candidate ? <CandidateDetails candidate={candidate} /> : null}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={8}>
            {candidate ? <JobsList candidate={candidate} /> : null}
          </Grid>
          <Grid item md={4} xs={12}>
            <AnalyticsChartCard
              chartData={companiesData}
              title="Matching companies to you"
              dropData={{
                title: "Weekly",
                options: [
                  {
                    value: 1,
                    label: "1 Week",
                  },
                  {
                    value: 104,
                    label: "2 Years",
                  },
                  {
                    value: 12,
                    label: "3 Monthes",
                  },
                  {
                    value: 12,
                    label: "3 Monthes",
                  },
                ],
              }}
              listData={[
                {
                  color: "",
                  icon: <AppleIcon />,
                  value: 66.6,
                },
                {
                  color: "",
                  icon: <Amazon />, // change to company
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
              ]}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CandidateDashboard;

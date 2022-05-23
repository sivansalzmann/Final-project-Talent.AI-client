import { Grid, LinearProgress, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Candidate } from "../../types/candidates-types";

const CompaniesRate: FC<CompaniesRateProps> = ({ candidate }) => {
  const [bar, setBar] = useState<Map<string, number>>(new Map());

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

  return (
    <Grid container spacing={3}>
      {Object.entries(bar)
        .reverse()
        .map((item) => {
          return (
            <Grid item xs={12}>
              <Grid container alignItems="center" spacing={1}>
                <Grid item sm zeroMinWidth>
                  <Typography variant="body2">{item[0]}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" align="right">
                    {item[1] + "%"}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <LinearProgress
                    variant="determinate"
                    value={item[1]}
                    color="primary"
                  />
                </Grid>
              </Grid>
            </Grid>
          );
        })}
    </Grid>
  );
};

export interface CompaniesRateProps {
  candidate: Candidate;
}

export default CompaniesRate;

import Page from "../dashboard/Page";
import { Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Cookie } from "universal-cookie";
import { Candidate } from "../types/candidates-types";
import ApexBarChart from "./List/ApexBarChart";

const MatchingCompanies: FC<MatchingCompaniesProps> = ({ user }) => {
  const [candidate, setCandidate] = useState<Candidate>();

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_SERVER}/api/candidate?googleID=${user.googleID}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((result: Candidate) => {
        setCandidate(result[0]);
      });
  }, [user.googleID]);

  return (
    <Page title={"Matching companies for you"}>
      <Typography variant="h5" fontWeight={300} marginBottom={1}>
        Companies ranking
      </Typography>
      <Typography variant="body2" fontWeight={300} mt={2}>
        Matching companies orderd by distance values
      </Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <div style={{ marginTop: "2%" }}>
          {candidate && <ApexBarChart candidate={candidate} />}
        </div>
      </div>
    </Page>
  );
};

export interface MatchingCompaniesProps {
  user: Cookie;
}

export default MatchingCompanies;

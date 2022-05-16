import {
  Avatar,
  Box,
  CardContent,
  Grid,
  Typography,
  Link,
  Button,
  Dialog,
} from "@mui/material";
import MainCard from "../../ui-components/MainCard";
import { FC, useEffect, useState } from "react";
import { Company } from "../../types/company-types";
import { JobOffer } from "../../types/jobOffer-types";
import CloseIcon from "@mui/icons-material/Close";
import JobOfferCard from "../../job-offers/JobOfferCard";
import { Cookie } from "universal-cookie";
import { Candidate } from "../../types/candidates-types";
import ItemsList from "../../ui-components/ItemsList";

const MatchingCompaniesList: FC<MatchingCompaniesListProps> = ({ user }) => {
  const [companies, setCompanies] = useState<Company[]>();
  const [companyJobs, setCompanyJobs] = useState<JobOffer[]>();
  const [candidate, setCandidate] = useState<Candidate>();

  useEffect(() => {
    fetch(`http://localhost:3000/api/company`)
      .then((response) => response.json())
      .then((result) => {
        setCompanies(result);
      });
  }, []);

  const handleCompanyJobs = (company: Company) => {
    fetch(`http://localhost:3000/api/joboffer?job_company_name=${company.name}`)
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          setCompanyJobs(result);
          console.log(result);
        }
      });
  };

  useEffect(() => {
    console.log(user);
    fetch(`http://localhost:3000/api/candidae?googleID=${user.googleID}`)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setCandidate(result);
      });
  }, [user, user.googleID]);

  return (
    <>
      <MainCard title="" content={false} sx={{ border: "1px solid #6288D8 " }}>
        <CardContent>
          <Grid container spacing={3} maxWidth={1200}>
            {companies?.map((company, index) => {
              return (
                <Grid item xs={12} key={index}>
                  <Button
                    onClick={() => handleCompanyJobs(company)}
                    fullWidth
                    sx={{ display: "flex", flexDirection: "row" }}
                  >
                    <Grid container spacing={6}>
                      <Grid item>
                        <Box sx={{ position: "relative" }}>
                          <Avatar />
                        </Box>
                      </Grid>
                      <Grid item xs>
                        <Typography
                          align="left"
                          component="div"
                          variant="subtitle1"
                        >
                          {company.name}
                        </Typography>
                        <Typography
                          align="left"
                          component="div"
                          variant="subtitle2"
                        >
                          {company.industry}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography align="left" variant="caption">
                          <Link
                            href={company.linkedin_url}
                            variant="body2"
                            underline="none"
                          >
                            Linkedin page of {company.name}
                          </Link>
                        </Typography>
                      </Grid>
                    </Grid>
                  </Button>
                </Grid>
              );
            })}
          </Grid>
        </CardContent>
      </MainCard>

      {companyJobs && (
        <Dialog open={true}>
          <div
            style={{
              display: "flex",
              margin: "1%",
              flexDirection: "column",
              borderRadius: "50px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                margin: "1%",
              }}
            >
              <Typography variant="h5"></Typography>
              <CloseIcon sx={{ display: "flex", justifyContent: "right" }} />
            </div>
            {companyJobs &&
              candidate &&
              companyJobs.map((job, index) => {
                if (!job.candidates_id.includes(candidate._id)) {
                  return (
                    <ItemsList
                      jobs={companyJobs}
                      key={index}
                      candidate={candidate}
                    />
                  );
                }
                return <></>;
              })}
          </div>
        </Dialog>
      )}
    </>
  );
};

export interface MatchingCompaniesListProps {
  user: Cookie;
}

export default MatchingCompaniesList;

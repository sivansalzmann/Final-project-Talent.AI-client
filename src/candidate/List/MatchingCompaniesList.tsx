import {
  Avatar,
  Box,
  CardContent,
  Grid,
  Typography,
  Link,
  Button,
  Dialog,
  IconButton,
  CircularProgress,
} from "@mui/material";
import MainCard from "../../ui-components/MainCard";
import { FC, useEffect, useState } from "react";
import { Company } from "../../types/company-types";
import { JobOffer } from "../../types/jobOffer-types";
import CloseIcon from "@mui/icons-material/Close";
import JobOfferCard from "../../job-offers/JobOfferCard";
import { Cookie } from "universal-cookie";
import { Candidate } from "../../types/candidates-types";

const MatchingCompaniesList: FC<MatchingCompaniesListProps> = ({ user }) => {
  const [companies, setCompanies] = useState<Company[]>();
  const [companyJobs, setCompanyJobs] = useState<JobOffer[]>();
  const [candidate, setCandidate] = useState<Candidate>();
  const [jobOffers, setJobsOffers] = useState<JobOffer[]>();
  const [wait, setWait] = useState(true);

  useEffect(() => {
    fetch(`http://52.215.114.42:3000/api/company`)
      .then((response) => response.json())
      .then((result: Company[]) => {
        let tmp: Company[] = [];
        result.forEach((r) => {
          jobOffers?.forEach((j) => {
            if (j.job_company_name === r.name) {
              if (!tmp.includes(r)) {
                tmp.push(r);
              }
            }
          });
        });
        setCompanies(tmp);
        setWait(false);
      });
  }, [jobOffers]);

  useEffect(() => {
    fetch(`http://52.215.114.42:3000/api/jobOffer`)
      .then((response) => response.json())
      .then((result) => {
        setJobsOffers(result);
      });
  }, []);

  const handleCompanyJobs = (company: Company) => {
    fetch(
      `http://52.215.114.42:3000/api/joboffer?job_company_name=${company.name}`
    )
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
    fetch(`http://52.215.114.42:3000/api/candidate?googleID=${user.googleID}`)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setCandidate(result);
      });
  }, [user, user.googleID]);

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      {wait ? (
        <div
          style={{
            marginLeft: "50%",
            marginTop: "2%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CircularProgress />
          <Typography variant="subtitle1">Loading...</Typography>
        </div>
      ) : (
        <MainCard
          title=""
          content={false}
          sx={{ border: "1px solid #6288D8 " }}
        >
          <CardContent>
            <Grid container spacing={3} maxWidth={1200}>
              {companies?.map((company, index) => {
                return (
                  <Grid item xs={12} key={index}>
                    <Button
                      onClick={() => {
                        handleOpen();
                        handleCompanyJobs(company);
                      }}
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
      )}
      {companyJobs && (
        <Dialog open={open} onClose={handleClose}>
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
              <Typography></Typography>
              <IconButton onClick={handleClose}>
                <CloseIcon sx={{ display: "flex", justifyContent: "right" }} />
              </IconButton>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
                margin: "3%",
                borderRadius: "20px",
              }}
            >
              {companyJobs &&
                candidate &&
                companyJobs.map((job, index) => {
                  if (!job.candidates_id.includes(candidate._id)) {
                    return (
                      <JobOfferCard
                        jobOffer={job}
                        key={index}
                        candidate={candidate}
                      />
                    );
                  }
                  return <></>;
                })}
            </div>
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

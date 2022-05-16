import { FC, useEffect, useState } from "react";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Candidate } from "../types/candidates-types";
import { JobOffer } from "../types/jobOffer-types";

const JobsList: FC<JobListProps> = ({ candidate }) => {
  const [jobOffers, setJobsOffers] = useState<JobOffer[]>();

  useEffect(() => {
    fetch(`http://52.215.114.42:3000/api/joboffer`)
      .then((response) => response.json())
      .then((result) => {
        const filterJobs = result.filter(
          (c: { status: string }) =>
            c.status === "Not have applications" || c.status === "In progress"
        );
        if (filterJobs) {
          setJobsOffers(filterJobs);
        }
      });
  }, []);

  const handleUpdateJobOffer = (jobOffer: JobOffer) => {
    fetch(`http://52.215.114.42:3000/api/joboffer/${jobOffer._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        updateJobOffer: { candidates_id: candidate?._id },
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        alert("Good luck!");
      });
  };

  return (
    <div>
      <TableContainer>
        <Table aria-labelledby="tableTitle">
          <TableBody>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Company</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Job title</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Role</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Sub role</TableCell>
            </TableRow>
            {jobOffers
              ? jobOffers.map((job) => {
                  return (
                    <TableRow hover>
                      <TableCell>{job.job_company_name}</TableCell>
                      <TableCell component="th" scope="row">
                        <Typography
                          variant="subtitle1"
                          sx={{
                            color: "grey.900",
                          }}
                        >
                          {job.job_title}
                        </Typography>
                        <Typography variant="caption">
                          {job.job_start_date}
                        </Typography>
                      </TableCell>
                      <TableCell>{job.job_title_role}</TableCell>
                      <TableCell>{job.job_title_sub_role}</TableCell>

                      <TableCell>
                        <IconButton
                          color="primary"
                          size="large"
                          onClick={() => handleUpdateJobOffer(job)}
                        >
                          <SendIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export interface JobListProps {
  candidate: Candidate;
}

export default JobsList;

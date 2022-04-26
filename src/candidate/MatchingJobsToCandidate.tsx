import React from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Collapse,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { JobOffer } from "../types/candidates-types";
import MainCard from "../ui-components/MainCard";
import SubCard from "../ui-components/SubCard";
import ItemsList from "../ui-components/ItemsList";

const MatchingJobsToCandidate = ({ jobs }: MatchingJobsToCandidateProps) => {
  return (
    <div>
      <ItemsList jobs={jobs} company={false} candidates={undefined} />
      {/* <TableContainer sx={{ width: "100%" }}>
        <Table aria-labelledby="tableTitle">
          <TableBody>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Company</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Job title</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Role</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Sub role</TableCell>
            </TableRow>
            {jobs
              ? jobs.map((job) => {
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
                        {/* <IconButton
                          color="primary"
                          size="large"
                          onClick={() => handleUpdateJobOffer(job)}
                        >
                          <SendIcon />
                        </IconButton> */}
      {/* </TableCell>
                    </TableRow>
                  );
                })
              : null}
          </TableBody>
        </Table>
      </TableContainer> */}
      {/* </MainCard> */}
    </div>
  );
};

interface MatchingJobsToCandidateProps {
  jobs: JobOffer[];
}
export default MatchingJobsToCandidate;

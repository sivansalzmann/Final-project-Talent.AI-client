import React from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { JobOffer } from "../types/candidates-types";
import MainCard from "../ui-components/MainCard";
import SubCard from "../ui-components/SubCard";

function Row({ row }: { row: JobOffer }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow hover sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell sx={{ pl: 3 }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.job_company_name}
        </TableCell>
        <TableCell>{row.job_title}</TableCell>
        <TableCell>{row.job_title_sub_role}</TableCell>
        <TableCell>{row.job_start_date}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {open && (
              <Box sx={{ margin: 1 }}>
                <TableContainer>
                  <SubCard
                    sx={{
                      bgcolor:
                        theme.palette.mode === "dark" ? "dark.800" : "grey.50",
                      mb: 2,
                    }}
                    title="History"
                    content={false}
                  >
                    <Table size="small" aria-label="purchases">
                      <TableHead>
                        <TableRow>
                          <TableCell>Date submitted</TableCell>
                          <TableCell>ID</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {/* {row.history?.map(
                          (historyRow: {
                            date: string;
                            customerId: string;
                            amount: number;
                          }) => (
                            <TableRow hover key={historyRow.date}>
                              <TableCell component="th" scope="row">
                                {historyRow.date}
                              </TableCell>
                              <TableCell>{historyRow.customerId}</TableCell>
                              <TableCell>{historyRow.amount}</TableCell>
                            </TableRow>
                          )
                        )} */}
                      </TableBody>
                    </Table>
                  </SubCard>
                </TableContainer>
              </Box>
            )}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

interface MatchingJobsToCandidateProps {
  jobs: JobOffer[];
}
const MatchingJobsToCandidate = ({ jobs }: MatchingJobsToCandidateProps) => {
  return (
    <MainCard content={false} title="Your applications">
      <TableContainer>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ pl: 3 }} />
              <TableCell>Company</TableCell>
              <TableCell>Job title</TableCell>
              <TableCell>Job description</TableCell>
              <TableCell>Start date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((job) => (
              <Row key={job.job_offer_ID} row={job} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MainCard>
  );
};
export default MatchingJobsToCandidate;

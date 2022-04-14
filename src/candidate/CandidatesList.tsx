import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Candidate, JobOffer } from "../types/candidates-types";

interface UserCardProps {
  candidates: Candidate[];
  jobOffer: JobOffer;
}
const CandidatesList = ({ candidates, jobOffer }: UserCardProps) => {
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (candidates.length > 0) {
    return (
      <>
        {candidates.map((candidate) => {
          return (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {candidate.full_name}
                  </Typography>
                  <Typography variant="subtitle2">
                    {candidate.gender}
                  </Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="subtitle2">
                  Current employee: {candidate.job_company_name}
                </Typography>
                {/* TODO: add more details */}
              </AccordionDetails>
            </Accordion>
          );
        })}
      </>
    );
  } else {
    return (
      <Typography sx={{ marginLeft: "20px" }}>
        Don't have candidates to this position yet
      </Typography>
    );
  }
};

export default CandidatesList;

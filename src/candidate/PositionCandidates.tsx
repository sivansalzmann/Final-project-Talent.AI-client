import { useState } from "react";
import {
  Grid,
  IconButton,
  Modal,
  Typography,
  CircularProgress,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CandidatesList from "./CandidatesList";
import MainCard from "../ui-components/MainCard";
import { gridSpacing } from "../types/constant";
import { Candidate, JobOffer } from "../types/candidates-types";

interface PositionCandidatesProps {
  jobOffer: JobOffer | null;
}

const PositionCandidates = ({ jobOffer }: PositionCandidatesProps) => {
  const handleClosePopUp = () => {
    setOpen(false);
  };

  const [candidates, setCandidates] = useState<Candidate[]>();
  const [open, setOpen] = useState(false);
  const [wait, setWait] = useState(true);

  const tmp = () => {
    setOpen(true);
    console.log(jobOffer);
    fetch(`http://localhost:3000/api/candidate`)
      .then((response) => response.json())
      .then((result) => {
        console.log(jobOffer?.candidates_id);
        const x = result.filter((candidate: Candidate) =>
          jobOffer?.candidates_id.includes(candidate?._id)
        );
        if (x) {
          setWait(false);
          setCandidates(x);
        }
        //  setCandidates(x);

        //console.log(x);
      });
  };
  return (
    <>
      <IconButton size="large" onClick={tmp}>
        <PersonIcon />
      </IconButton>
      <Modal
        open={open}
        sx={{
          width: "80%",
          height: "100%",
          marginLeft: "10%",
          marginTop: "1%",
          overflowY: "auto",
        }}
        onClose={handleClosePopUp}
      >
        <MainCard
          title={
            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              spacing={1}
            >
              <Grid item>
                <Typography variant="subtitle2" fontWeight="bold">
                  Candidates for {jobOffer?.job_title}
                </Typography>
              </Grid>
              {/* Add here filter to distance */}
            </Grid>
          }
          content={false}
        >
          {wait ? (
            <div
              style={{
                marginLeft: "50%",
                marginTop: "2%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CircularProgress /> Loading...
            </div>
          ) : null}
          {candidates && jobOffer ? (
            <CandidatesList candidates={candidates} jobOffer={jobOffer} />
          ) : null}
          <Grid item xs={12} sx={{ p: 3 }}>
            <Grid
              container
              justifyContent="space-between"
              spacing={gridSpacing}
            ></Grid>
          </Grid>
        </MainCard>
      </Modal>
    </>
  );
};

export default PositionCandidates;

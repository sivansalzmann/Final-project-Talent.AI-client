import { useState } from "react";
import {
  Modal,
  Typography,
  CircularProgress,
  Button,
  Divider,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CandidatesList from "./CandidatesList";
import { Candidate, JobOffer } from "../types/candidates-types";

interface PositionCandidatesProps {
  jobOffer: JobOffer;
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
        console.log(result);
        console.log(jobOffer.candidates_id);
        const x = result.filter((candidate: Candidate) =>
          jobOffer.candidates_id.includes(candidate?._id)
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
      <Button
        variant="outlined"
        size="small"
        startIcon={<PersonIcon />}
        sx={{ minWidth: 250, margin: "5px" }}
        onClick={tmp}
      >
        Candidates
      </Button>

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
        <div style={{ backgroundColor: "white", borderRadius: "10px" }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            margin="10px"
            fontFamily="Anek Odia"
          >
            Candidates for {jobOffer?.job_title}
          </Typography>
          <Divider />
          {wait ? (
            <div
              style={{
                marginLeft: "50%",
                marginTop: "2%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CircularProgress />{" "}
              <Typography variant="subtitle1" fontFamily="Anek Odia">
                Loading...
              </Typography>
            </div>
          ) : null}
          {candidates && jobOffer ? (
            <CandidatesList candidates={candidates} jobOffer={jobOffer} />
          ) : null}
        </div>
      </Modal>
    </>
  );
};

export default PositionCandidates;

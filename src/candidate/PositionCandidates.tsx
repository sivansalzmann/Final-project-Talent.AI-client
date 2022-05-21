import { FC, useState } from "react";
import {
  Modal,
  Typography,
  CircularProgress,
  Button,
  Divider,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CandidatesList from "./CandidatesList";
import { Candidate } from "../types/candidates-types";
import { JobOffer } from "../types/jobOffer-types";

const PositionCandidates: FC<PositionCandidatesProps> = ({ jobOffer }) => {
  const handleClosePopUp = () => {
    setOpen(false);
  };

  const [candidates, setCandidates] = useState<Candidate[]>();
  const [open, setOpen] = useState(false);
  const [wait, setWait] = useState(true);

  const setCandidatesPosition = () => {
    setOpen(true);
    fetch(`${process.env.REACT_APP_SERVER}/api/candidate`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        const results = result.filter((candidate: Candidate) =>
          jobOffer.candidates_id.includes(candidate?._id)
        );
        if (results) {
          setWait(false);
          console.log(results);
          setCandidates(results);
        }
      });
  };
  return (
    <>
      <Button
        variant="outlined"
        size="small"
        startIcon={<PersonIcon />}
        sx={{ minWidth: 250, margin: "5px" }}
        onClick={setCandidatesPosition}
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
          <Typography variant="h6" fontWeight="bold" margin="10px">
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
              <CircularProgress />
              <Typography variant="subtitle1">Loading...</Typography>
            </div>
          ) : null}
          {candidates && jobOffer && (
            <CandidatesList candidates={candidates} jobOffer={jobOffer} />
          )}
        </div>
      </Modal>
    </>
  );
};

export interface PositionCandidatesProps {
  jobOffer: JobOffer;
}

export default PositionCandidates;

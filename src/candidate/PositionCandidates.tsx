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
    fetch(
      `${process.env.REACT_APP_SERVER}/api/jobOffer/rankCandidates/${jobOffer._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          candidates: jobOffer.candidates_id,
        }),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("here");
        if (result) {
          setWait(false);
          console.log(result);
          setCandidates(result);
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
          width: "50%",
          height: "80%",
          marginLeft: "25%",
          marginTop: "2%",
          overflowY: "auto",
          borderRadius: "10px",
        }}
        onClose={handleClosePopUp}
      >
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
          }}
        >
          <div style={{ height: "10px" }}></div>
          <Typography variant="h5" fontWeight="bold" m={1}>
            Candidates for {jobOffer?.job_title}
          </Typography>
          <Divider />
          <Typography variant="subtitle1" fontWeight="bold" m={1}>
            Info....
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

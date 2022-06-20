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
import { capitalizeFirstLetter } from "../app-utils";
import { styled } from "@mui/system";

const PositionCandidates: FC<PositionCandidatesProps> = ({ jobOffer }) => {
  const handleClosePopUp = () => {
    setOpen(false);
  };

  const [candidates, setCandidates] = useState<Candidate[]>();
  const [open, setOpen] = useState(false);
  const [wait, setWait] = useState(true);
  const [gender, setGender] = useState(false);
  const [age, setAge] = useState(false);
  const [waitList, setWaitList] = useState(false);

  console.log(gender);

  const setCandidatesPosition = () => {
    setOpen(true);
    console.log(jobOffer);
    if (jobOffer.candidates_id.length > 1) {
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
            bias: {
              gender: gender,
              age: age,
            },
          }),
        }
      )
        .then((response) => response.json())
        .then((result) => {
          if (result) {
            setWait(false);
            setWaitList(true);
            console.log(result);
            setCandidates(result);
            console.log(result);
          }
        });
    } else {
      setWait(false);
      setCandidates([]);
    }
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
          width: "70%",
          height: "80%",
          marginLeft: "15%",
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
            Candidates for {capitalizeFirstLetter(jobOffer?.job_title)}
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
            <CandidatesList
              candidates={candidates}
              jobOffer={jobOffer}
              setGender={setGender}
              setAge={setAge}
              setCandidatesPosition={setCandidatesPosition}
              waitList={waitList}
              setWaitList={setWaitList}
            />
          )}
        </div>
      </Modal>
    </>
  );
};

const WaitContainer = styled("div")({
  marginLeft: "50%",
  marginTop: "2%",
  display: "flex",
  flexDirection: "column",
});

export interface PositionCandidatesProps {
  jobOffer: JobOffer;
}

export default PositionCandidates;

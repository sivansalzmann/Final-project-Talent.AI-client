import React, { FC } from "react";
import { CircularProgress, Divider, Typography } from "@mui/material";
import { Candidate } from "../types/candidates-types";
import ItemsList from "../ui-components/ItemsList";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { JobOffer } from "../types/jobOffer-types";
import { styled } from "@mui/system";

const CandidatesList: FC<UserCardProps> = ({
  candidates,
  setGender,
  setAge,
  setCandidatesPosition,
  waitList,
  setWaitList,
}) => {
  if (candidates.length > 0) {
    return (
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle1" m={1.5}>
            Want to ignore certain features in the candidate rating?
          </Typography>
          {setGender && setAge && setCandidatesPosition && (
            <div style={{ display: "flex", marginInlineStart: "15px" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    onChange={(e) => {
                      setWaitList(false);
                      setGender(e.target.checked);
                      setCandidatesPosition();
                    }}
                  />
                }
                label={
                  <Typography variant="subtitle1" mt={0.8}>
                    ignore gender
                  </Typography>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    onChange={(e) => {
                      setWaitList(false);
                      setAge(e.target.checked);
                      setCandidatesPosition();
                    }}
                  />
                }
                label={
                  <Typography variant="subtitle1" mt={0.8}>
                    Ignore age
                  </Typography>
                }
              />
            </div>
          )}
        </div>
        <Divider />
        {!waitList ? (
          <WaitContainer>
            <CircularProgress />
            <Typography variant="subtitle1">Loading...</Typography>
          </WaitContainer>
        ) : (
          <ItemsList
            jobs={undefined}
            company={true}
            candidates={candidates}
            candidate={undefined}
          />
        )}
      </>
    );
  } else {
    return (
      <Typography sx={{ marginLeft: "20px", marginTop: "10px" }}>
        There is not candidates to this position yet
      </Typography>
    );
  }
};

const WaitContainer = styled("div")({
  marginLeft: "50%",
  marginTop: "2%",
  display: "flex",
  flexDirection: "column",
});

interface UserCardProps {
  candidates: Candidate[];
  jobOffer: JobOffer;
  setGender?: (gender: boolean) => void;
  setAge?: (age: boolean) => void;
  setCandidatesPosition?: () => void;
  waitList: boolean;
  setWaitList: (wait: boolean) => void;
}
export default CandidatesList;

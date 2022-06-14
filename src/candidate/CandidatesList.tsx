import React, { FC } from "react";
import { Divider, Typography } from "@mui/material";
import { Candidate } from "../types/candidates-types";
import ItemsList from "../ui-components/ItemsList";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { JobOffer } from "../types/jobOffer-types";

const CandidatesList: FC<UserCardProps> = ({
  candidates,
  setGender,
  setAge,
  setCandidatesPosition,
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
        <ItemsList
          jobs={undefined}
          company={true}
          candidates={candidates}
          candidate={undefined}
        />
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
interface UserCardProps {
  candidates: Candidate[];
  jobOffer: JobOffer;
  setGender?: (gender: boolean) => void;
  setAge?: (age: boolean) => void;
  setCandidatesPosition?: () => void;
}
export default CandidatesList;

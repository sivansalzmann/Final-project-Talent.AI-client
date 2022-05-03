import React from "react";
import { Divider, Typography } from "@mui/material";
import { Candidate, JobOffer } from "../types/candidates-types";
import ItemsList from "../ui-components/ItemsList";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const CandidatesList = ({ candidates, jobOffer }: UserCardProps) => {
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
          <Typography variant="subtitle1" fontFamily="Anek Odia" m={1.5}>
            Want to ignore certain features in the candidate rating?
          </Typography>
          <div style={{ display: "flex", marginInlineStart: "15px" }}>
            <FormControlLabel
              control={<Checkbox size="small" />}
              label={
                <Typography variant="subtitle2" fontFamily="Anek Odia" mt={0.8}>
                  ignore gender
                </Typography>
              }
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label={
                <Typography variant="subtitle2" fontFamily="Anek Odia" mt={0.8}>
                  Ignore age
                </Typography>
              }
            />
          </div>
        </div>
        <Divider />
        {/* <ItemsList
          jobs={undefined}
          company={false}
          candidates={candidates}
          candidate={undefined}
        /> */}
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
interface UserCardProps {
  candidates: Candidate[];
  jobOffer: JobOffer;
}
export default CandidatesList;

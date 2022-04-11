import { CardActions } from "@mui/material";
import { Candidate } from "../types/candidates-types";
import MainCard from "../ui-components/MainCard";
import UserDetailsCard from "./UserDetailsCard";
import PopUpForms from "../forms/PopupForms";

interface candidateProps {
  candidate: Candidate;
}
const CandidateDetails = ({ candidate }: candidateProps) => (
  <MainCard title="Personal details" content={false}>
    <UserDetailsCard candidate={candidate} />
    <CardActions sx={{ justifyContent: "flex-end" }}>
      <PopUpForms formType={"cv"} candidate={candidate} />
    </CardActions>
  </MainCard>
);

export default CandidateDetails;

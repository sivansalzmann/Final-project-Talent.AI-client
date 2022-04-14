import { CardActions } from "@mui/material";
import { Candidate } from "../types/candidates-types";
import MainCard from "../ui-components/MainCard";
import UserDetailsCard from "./UserDetailsCard";

interface candidateProps {
  candidate: Candidate;
}
const CandidateDetails = ({ candidate }: candidateProps) => (
  <MainCard title="Personal details" content={false}>
    <UserDetailsCard candidate={candidate} />
  </MainCard>
);

export default CandidateDetails;

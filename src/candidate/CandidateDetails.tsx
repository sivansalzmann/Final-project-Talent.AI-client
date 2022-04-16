import { CardActions } from "@mui/material";
import Page from "../dashboard/Page";
import { Candidate } from "../types/candidates-types";
import MainCard from "../ui-components/MainCard";
import Profile1 from "./Profile";
import UserDetailsCard from "./UserDetailsCard";

const CandidateDetails = ({ user }) => (
  <Page title="Personal Profile">
    <Profile1 user={user} />
  </Page>
);

export default CandidateDetails;

import { Company } from "../types/candidates-types";
import Profile from "./Profile";

interface PopularCandidatesProps {
  isLoading: boolean;
  company: Company;
}

const CompanyCard = ({ isLoading, company }: PopularCandidatesProps) => {
  return <Profile />;
};

export default CompanyCard;

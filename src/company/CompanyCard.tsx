import MainCard from "../ui-components/MainCard";
import CompanyHelpCard from "./CompanyHelpCard";

import { Company } from "../types/candidates-types";
import Profile from "./Profile";

interface PopularCandidatesProps {
  isLoading: boolean;
  company: Company;
}

const CompanyCard = ({ isLoading, company }: PopularCandidatesProps) => {
  return (
    <>
      {isLoading ? (
        <CompanyHelpCard />
      ) : (
        <MainCard content={false}>
          <Profile company={company} />
        </MainCard>
      )}
    </>
  );
};

export default CompanyCard;

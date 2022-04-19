import MainCard from "../ui-components/MainCard";
import CompanyHelpCard from "./CompanyHelpCard";

import { Company } from "../types/candidates-types";
import Profile from "./Profile";
import Page from "../dashboard/Page";

const CompanyDetails = ({ user }) => {
  return (
    <Page title={"Company"}>
      {/* <MainCard content={false}> */}
      <Profile />
      {/* </MainCard> */}
    </Page>
  );
};

export default CompanyDetails;

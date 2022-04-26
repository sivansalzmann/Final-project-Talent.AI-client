import AddNewJobOffer from "./AddNewJobOffer";
import Page from "../dashboard/Page";
import JobOfferForm from "./JobOfferForm";

const AddNewJobOfferContainer = ({ user }) => {
  return (
    <Page title={"Add new job offer"}>
      <JobOfferForm company={undefined} />
    </Page>
  );
};

export default AddNewJobOfferContainer;

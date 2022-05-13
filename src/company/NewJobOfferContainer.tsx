import { FC, useEffect, useState } from "react";
import { Cookie } from "universal-cookie";
import Page from "../dashboard/Page";
import { Company } from "../types/company-types";
import JobOfferForm from "./JobOfferForm";

const AddNewJobOfferContainer: FC<AddNewJobOfferContainerProps> = ({
  user,
}) => {
  const [comapny, setCompany] = useState<Company>();
  const [wait, setWait] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/api/company/${user.companyName}`)
      .then((response) => response.json())
      .then((result) => {
        setWait(false);
        setCompany(result);
        console.log(result);
      });
  }, [user.companyName]);

  return (
    <Page title={"Add new job offer"}>
      {wait && <JobOfferForm company={comapny} />}
    </Page>
  );
};

export interface AddNewJobOfferContainerProps {
  user: Cookie;
}

export default AddNewJobOfferContainer;

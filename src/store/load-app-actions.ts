import {
  setStoreCompany,
  setStoreCompanyName,
  setWait,
} from "./app-store-actions";

export const chooseCompany = (company: string) => {
  console.log(company);
  setStoreCompanyName(company);
  fetch(`https://52.215.114.42:3000/api/company?company_name=${company}`)
    .then((response) => response.json())
    .then((result) => {
      setStoreCompany(result);
    });
};

export const loadJobs = (company: string) => {
  fetch(`https://52.215.114.42:3000/api/joboffer?job_company_name=${company}`)
    .then((response) => response.json())
    .then((result) => {
      setWait(false);
      setJobOffers(result);
    });
};
function setJobOffers(result: any) {
  throw new Error("Function not implemented.");
}

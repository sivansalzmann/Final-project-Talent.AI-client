import { Company } from "../types/company-types";
import AppStore from "./app-store";

export const setStoreCompany = (company: any) => {
  AppStore.company = company;
};

export const setStoreCompanyName = (companyName: any) => {
  AppStore.companyName = companyName;
};

export const setIsCompany = () => {
  AppStore.isUserCompany = true;
};

export const setWait = (wait: boolean) => {
  AppStore.wait = wait;
};

export const setJobs = (jobs: any[]) => {
  AppStore.jobOffers = jobs;
};

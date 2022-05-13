import { Company } from "../types/company-types";
import { createStore, Nullable } from "./store-utils";

const AppStore = createStore<AppStoreState>(
  {
    company: null,
    companyName: "",
    isUserCompany: false,
    wait: true,
    jobOffers: [],
  },
  "App Store"
);

export interface AppStoreState {
  company: Nullable<any>;
  companyName: string;
  isUserCompany: boolean;
  wait: boolean;
  jobOffers: any;
}

export default AppStore;

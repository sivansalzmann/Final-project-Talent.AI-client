import { Cookie } from "universal-cookie";
import { Candidate } from "../types/candidates-types";
import { createAsyncState } from "./async-loading-utils";
import { createStore, Nullable } from "./store-utils";

const AppStore = createStore<AppStoreState>(
  {
    user: null,
    candidate: null,
    loading: createAsyncState(),
  },
  "App Store"
);

interface AppStoreState {
  user: Cookie;
  candidate: Nullable<Candidate>;
  loading: ReturnType<typeof createAsyncState>;
}

export default AppStore;

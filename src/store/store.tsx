import { Cookie } from "universal-cookie";
import { createStore } from "./store-utils";

const AppStore = createStore<AppStoreState>(
  {
    user: null,
  },
  "App Store"
);

interface AppStoreState {
  user: Cookie;
}

export default AppStore;

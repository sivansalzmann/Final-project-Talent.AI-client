import { Cookie } from "universal-cookie";
import AppStore from "./store";

export const setUser = (user: Cookie) => {
  AppStore.user = user;
};

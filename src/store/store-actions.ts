import { Cookie } from "universal-cookie";
import { Candidate } from "../types/candidates-types";
import { Mutable } from "./Mutable";
import AppStore from "./store";

export const setUser = (user: Cookie) => {
  AppStore.user = user;
};

export const setCandidate = (payload: Candidate) => {
  AppStore.candidate = payload;
};

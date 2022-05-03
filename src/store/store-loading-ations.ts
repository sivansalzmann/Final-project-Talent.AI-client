import { Candidate } from "../types/candidates-types";
import { createSimpleAsyncAction } from "./async-loading-utils";
import { makeMutable } from "./Mutable";
import AppStore from "./store";
import { setCandidate } from "./store-actions";

export const loadCandidate = createSimpleAsyncAction(
  async (googleID: string) => {
    await fetch(`http://localhost:3000/api/candidate?googleID=${googleID}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((result) => {
        setCandidate(result[0]);
      });
  },
  AppStore.loading
);

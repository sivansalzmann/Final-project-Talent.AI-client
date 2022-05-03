import { Nullable } from "./store-utils";

export type OneOfValues<T> = T[keyof T];

export const createAsyncState = (): AsyncLoadingState => {
  return {
    status: LoadingStatus.Idle,
    err: null,
  };
};

export const LoadingStatus = {
  Idle: "idle",
  Pending: "pending",
  Success: "success",
  Error: "error",
} as const;

type AsyncLoadingState = {
  status: OneOfValues<typeof LoadingStatus>;
  err: Nullable<Error>;
};

export const createSimpleAsyncAction =
  <T extends Array<unknown>, U>(
    asyncFunction: (...args: T) => U,
    asyncState: AsyncLoadingState
  ) =>
  async (...args: T) => {
    asyncState.status = LoadingStatus.Pending;
    try {
      await asyncFunction(...args);
      asyncState.status = LoadingStatus.Success;
    } catch (err) {
      console.log(err);
      asyncState.err = err as Error;
      asyncState.status = LoadingStatus.Error;
    }
  };

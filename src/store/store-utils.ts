import { proxy } from "valtio";

export const createStore: <T extends ObjectOf<T>>(
  initialObject: T,
  storeName: string
) => T = (initialObject, storeName: string) => {
  const store = proxy(initialObject);
  return store;
};

// https://github.com/typescript-eslint/typescript-eslint/issues/2720#issuecomment-729762246
type ObjectOf<T> = { [P in keyof T]: T[P] };

export type Nullable<T> = T | null;

type Mutable<T> = {
  -readonly [k in keyof T]: T[k];
};

import { proxy } from "valtio";

export const createStore: <T extends ObjectOf<T>>(
  initialObject: T,
  storeName: string
) => T = (initialObject, storeName: string) => {
  const store = proxy(initialObject);
  return store;
};

// http://github.com/typescript-eslint/typescript-eslint/issues/2720#issuecomment-729762246
type ObjectOf<T> = { [P in keyof T]: T[P] };

export type Nullable<T> = T | null;

export type Mutable<Type> = {
  -readonly [Key in keyof Type]: Type[Key];
};

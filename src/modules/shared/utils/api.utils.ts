import { Store } from "redux";

let internalStore: Store;

export const init = (store : Store) => {
  internalStore = store;
}
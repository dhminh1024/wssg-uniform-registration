import type { StoreApi, UseBoundStore } from "zustand";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ANY = any;

export type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S
) => {
  const store = _store as WithSelectors<typeof _store>;
  store.use = {};

  const storeKeys = Object.keys(store.getState());

  // eslint-disable-next-line no-restricted-syntax
  for (const k of storeKeys) {
    (store.use as ANY)[k] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};

export default createSelectors;

// import type { DefaultGenerics, MakeGenerics } from "@tanstack/react-location";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ANY = any;

export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type ActionMap<M extends { [index: string]: ANY }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

// export type SearchGenerics<S = Record<string, string>> = MakeGenerics<
//   DefaultGenerics & {
//     Search: S;
//   }
// >;

import { type FC } from "react";

const DISPLAY_NAME = "Home";

const Component: FC = () => {
  return (
    <>
      <h1>Home Page</h1>
    </>
  );
};

Component.displayName = DISPLAY_NAME;

export { Component };

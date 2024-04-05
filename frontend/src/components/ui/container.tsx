import { type FC } from "react";

export const Container: FC<React.PropsWithChildren> = ({ children }) => {
  return <div className="container mx-auto px-5">{children}</div>;
};

export default Container;

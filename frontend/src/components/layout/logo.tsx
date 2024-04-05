import { type FC } from "react";

export type LogoProps = {
  className?: string;
};

export const Logo: FC<LogoProps> = ({ className }) => {
  return (
    <img
      alt="Wellspring"
      className={className}
      // src={"/static/logo/ws-logo-full.png"}
      src={"/assets/uniform_registration/frontend/ws-logo-full.png"}
    />
  );
};

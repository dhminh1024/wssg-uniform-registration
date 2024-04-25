import { ASSET_URL } from "@/app/config";
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
      src={`${ASSET_URL}/ws-logo-full.png`}
    />
  );
};

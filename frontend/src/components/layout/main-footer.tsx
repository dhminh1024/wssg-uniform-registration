import { type FC } from "react";

export type MainFooterProps = {
  className?: string;
};

export const MainFooter: FC<MainFooterProps> = () => {
  return (
    <div className="fixed bottom-0 border-t-2 h-8 w-full flex items-center justify-center bg-white">
      <p className="text-center text-muted-foreground">
        WSSG Digital Learning Team{" "}
        <span className="hidden md:inline">©️ 2024 Wellspring Saigon</span>
      </p>
    </div>
  );
};

export default MainFooter;

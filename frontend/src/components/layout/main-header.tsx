import { useContext, type FC } from "react";
import Container from "../ui/container";
import { Logo } from "./logo";
import { Button } from "../ui/button";
import { AuthContext } from "@/context/auth-provider";

export type MainHeaderProps = {
  className?: string;
};

export const MainHeader: FC<MainHeaderProps> = () => {
  const { logout } = useContext(AuthContext);
  return (
    <Container>
      <div className="flex items-center justify-between border-b border-gray-50 px-1 py-1.5">
        <div className={"w-4/12"}>
          <Logo className="h-24" />
        </div>
        <div className={"hidden w-4/12 justify-center lg:flex"}>
          <h3 className="text-xl font-semibold">
            WSSG Uniform Registration 2024
          </h3>
        </div>
        <div className={"flex flex-1 items-center justify-end space-x-4"}>
          <Button onClick={logout}>Sign Out</Button>
        </div>
      </div>
    </Container>
  );
};

export default MainHeader;

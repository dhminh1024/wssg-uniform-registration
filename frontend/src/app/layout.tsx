import MainHeader from "@/components/layout/main-header";
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div>
      <MainHeader />
      <Outlet />
      <Toaster />

      <footer>Footer</footer>
    </div>
  );
};

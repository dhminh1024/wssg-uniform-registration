import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { FullPageLoader } from "@/components/state/full-page-loader";
import { AuthContext } from "@/context/auth-provider";

export const ProtectedRoute = () => {
  const { currentUser, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <FullPageLoader />;
  } else if (!currentUser || currentUser === "Guest") {
    return <Navigate to="/sign-in" />;
  }
  return <Outlet />;
};

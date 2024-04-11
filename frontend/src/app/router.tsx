import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  useRouteError,
} from "react-router-dom";
import { ProtectedRoute } from "./protected-route";
import { MainLayout } from "./layout";
import * as Sentry from "@sentry/react";
import { Button } from "@/components/ui/button";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const GlobalError = () => {
  const error = useRouteError();
  Sentry.captureException(error);

  return (
    <div className="flex flex-col gap-6 items-center min-h-[100vh]">
      <Alert className="my-2 w-[500px]" variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Something went wrong!</AlertTitle>
        <AlertDescription>
          Please try again or contact digital.learning@wellspringsaigon.edu.vn
          for support
        </AlertDescription>
      </Alert>
      <h1></h1>
      <Button onClick={() => window.location.replace("/")}>Back to home</Button>
    </div>
  );
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* <Route element={<ErrorBoundaryLayout />}> */}
      <Route path="/sign-in" lazy={() => import("@/app/auth/sign-in/page")} />
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="/" element={<MainLayout />}>
          <Route
            index
            lazy={() => import("@/app/home/page")}
            errorElement={<GlobalError />}
          />
        </Route>
      </Route>
      {/* </Route> */}
    </>
  ),
  {
    basename: `/${import.meta.env.VITE_BASE_NAME}` ?? "",
  }
);

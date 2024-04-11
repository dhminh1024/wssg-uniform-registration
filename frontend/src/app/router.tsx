import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { ProtectedRoute } from "./protected-route";
import { MainLayout } from "./layout";
import { GlobalError } from "@/components/state/global-error";

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

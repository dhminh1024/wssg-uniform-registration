import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { ProtectedRoute } from "./protected-route";
import { MainLayout } from "./layout";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/sign-in" lazy={() => import("@/app/auth/sign-in/page")} />
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="/" element={<MainLayout />}>
          <Route index lazy={() => import("@/app/home/page")} />
        </Route>
      </Route>
    </>
  ),
  {
    basename: `/${import.meta.env.VITE_BASE_NAME}` ?? "",
  }
);

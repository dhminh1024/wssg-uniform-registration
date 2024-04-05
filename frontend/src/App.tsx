import { FullPageLoader } from "@/components/state/full-page-loader";
import { FrappeProvider } from "frappe-react-sdk";
import { Suspense, type FC } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
import { AuthProvider } from "./context/auth-provider";

const App: FC = () => {
  const getSiteName = () => {
    if (
      // @ts-expect-error This is necessary to access the frappe property on the window object.
      window.frappe?.boot?.versions?.frappe &&
      // @ts-expect-error This is necessary to access the frappe property on the window object.
      (window.frappe.boot.versions.frappe.startsWith("15") ||
        // @ts-expect-error This is necessary to access the frappe property on the window object.
        window.frappe.boot.versions.frappe.startsWith("16"))
    ) {
      // @ts-expect-error This is necessary to access the frappe property on the window object.
      return window.frappe?.boot?.sitename ?? import.meta.env.VITE_SITE_NAME;
    }
    return import.meta.env.VITE_SITE_NAME;
  };
  return (
    <Suspense fallback={<FullPageLoader />}>
      <FrappeProvider
        // url={import.meta.env.VITE_FRAPPE_PATH ?? ""}
        enableSocket={true}
        socketPort={import.meta.env.VITE_SOCKET_PORT}
        siteName={getSiteName()}
      >
        <AuthProvider>
          <RouterProvider
            router={router}
            fallbackElement={<FullPageLoader className="w-screen" />}
          />
        </AuthProvider>
      </FrappeProvider>
    </Suspense>
  );
};

export default App;

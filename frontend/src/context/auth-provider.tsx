import { useFrappePostCall, useSWRConfig } from "frappe-react-sdk";
import React, { createContext, useEffect, useState } from "react";

interface Employee {
  name: string;
  employee_code: string;
  full_name: string;
  employee_type: string;
  title: string;
  email: string;
  gender: string;
  avatar: string;
  bonus: number;
  budget: number;
}

interface AuthContextProps {
  isLoading: boolean;
  currentUser: Employee | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
  currentUser: null,
  isLoading: false,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [currentUser, setCurrentUser] = useState<string>("");
  const { mutate } = useSWRConfig();
  const { call: login, loading: loadingLogin } = useFrappePostCall(
    "uniform_registration.api.auth.sign_in"
  );
  const { call: getCurrentUser, loading: isLoadingCurrentUser } =
    useFrappePostCall("uniform_registration.api.auth.get_current_user");

  useEffect(() => {
    const user_id = localStorage.getItem("currentUser");
    if (!user_id) {
      return;
    }
    getCurrentUser({ user_id })
      .then((data) => {
        setCurrentUser(data.message[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("currentUser");
    setCurrentUser("");

    await mutate(() => true, undefined, false);

    //Reload the page so that the boot info is fetched again
    const URL = import.meta.env.VITE_BASE_NAME
      ? `${import.meta.env.VITE_BASE_NAME}`
      : ``;
    window.location.replace(`/sign-in?redirect-to=${URL}`);
    // window.location.reload()
  };

  const handleLogin = async (username: string, password: string) => {
    return login({ email: username, password })
      .then((data) => {
        setCurrentUser(data.message);
        localStorage.setItem("currentUser", data.message);
        const URL = import.meta.env.VITE_BASE_NAME
          ? `/${import.meta.env.VITE_BASE_NAME}`
          : ``;
        window.location.replace(`${URL}/`);
      })
      .catch((error) => {
        throw error;
      });
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading: loadingLogin || isLoadingCurrentUser,
        login: handleLogin,
        logout: handleLogout,
        currentUser: currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

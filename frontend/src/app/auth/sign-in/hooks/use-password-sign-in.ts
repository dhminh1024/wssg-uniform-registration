import { AuthContext } from "@/context/auth-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { FrappeError } from "frappe-react-sdk";
import { useCallback, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const validationSchema = z.object({
  email: z.string(), //.email("Invalid email address"),
  password: z.string(),
});

export const usePasswordSignIn = () => {
  const [error, setError] = useState<FrappeError | null>(null);
  const { login } = useContext(AuthContext);

  const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      email: "minh.do@wellspringsaigon.edu.vn",
      password: "W00919",
    },
  });

  const handlePasswordSignIn = useCallback(
    async (values: z.infer<typeof validationSchema>) => {
      try {
        await login(values.email, values.password);
      } catch (error) {
        setError(error as FrappeError);
      }
    },
    [login]
  );

  return {
    form,
    error,
    handlePasswordSignIn,
  };
};

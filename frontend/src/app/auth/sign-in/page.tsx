import { type FC } from "react";
import { usePasswordSignIn } from "./hooks/use-password-sign-in";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ErrorBanner } from "@/components/state/error-banner";
import { Logo } from "@/components/layout/logo";

const DISPLAY_NAME = "SignIn";

const Component: FC = () => {
  const { form, error: loginError, handlePasswordSignIn } = usePasswordSignIn();
  return (
    <div className="flex h-screen w-screen flex-1 flex-col justify-between px-2 lg:px-0">
      <div className="m-auto w-64 flex flex-col">
        <Logo className="mb-6" />

        <h3 className="text-2xl font-semibold tracking-tight text-center">
          Đăng ký đồng phục
        </h3>
        <p className="text-xl text-muted-foreground text-center mb-6">
          Uniform Registration
        </p>

        {loginError && <ErrorBanner error={loginError} />}

        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(handlePasswordSignIn)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field, formState: { isSubmitting } }) => (
                <FormItem>
                  <FormLabel htmlFor="input-email">
                    Email{requiredIndicator}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="input-email"
                      required
                      disabled={isSubmitting}
                      placeholder="Your email address"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field, formState: { isSubmitting } }) => (
                <FormItem>
                  <FormLabel htmlFor="input-password">
                    Password{requiredIndicator}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="input-password"
                      required
                      disabled={isSubmitting}
                      placeholder="••••••••"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={form.formState.isSubmitting}>
              Sign in
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

Component.displayName = DISPLAY_NAME;

export { Component };

const requiredIndicator = <span className="ml-0.5 text-red-500">*</span>;

import { type FC } from "react";
import { usePasswordSignIn } from "./hooks/use-password-sign-in";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ErrorBanner } from "@/components/state/error-banner";
import { Logo } from "@/components/layout/logo";
import LanguageDropdownSwitcher from "@/components/language-dropdown-switcher";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";

const DISPLAY_NAME = "SignIn";

const Component: FC = () => {
  const { t } = useTranslation();
  const { form, error: loginError, handlePasswordSignIn } = usePasswordSignIn();

  return (
    <div className="flex h-screen w-screen flex-1 flex-col justify-between px-2 lg:px-0">
      <div className="m-auto w-[400px] flex flex-col">
        <Logo className="mb-6" />

        <h3 className="text-2xl font-semibold tracking-tight text-center">
          Đăng ký đồng phục
        </h3>
        <p className="text-xl text-muted-foreground text-center mb-6">
          Uniform Registration
        </p>

        {loginError && <ErrorBanner error={loginError} />}

        <div className="flex flex-col gap-4">
          <Label>{t("Language")}</Label>
          <LanguageDropdownSwitcher />
        </div>

        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(handlePasswordSignIn)}
          >
            <div></div>
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
                    {/* Mã số nhân viên | Employee Code {requiredIndicator} */}
                    {t("Employee Code")} {requiredIndicator}
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
                  <FormDescription>
                    <span>{t("Example")}: "W00123"</span>
                    <span> ({t("With capitalized W")})</span>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={form.formState.isSubmitting}>
              {t("Sign in")}
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

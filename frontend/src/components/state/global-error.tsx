import { type FC } from "react";
import * as Sentry from "@sentry/react";
import { Button } from "@/components/ui/button";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useRouteError } from "react-router-dom";

export type GlobalErrorProps = {
  className?: string;
};

export const GlobalError: FC<GlobalErrorProps> = () => {
  const { t } = useTranslation();
  const error = useRouteError();
  if (import.meta.env.MODE !== "development" && error) {
    Sentry.captureException(error);
  }

  return (
    <div className="flex flex-col gap-6 items-center min-h-[100vh]">
      <Alert className="my-2 w-[500px]" variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{t("Something went wrong")}</AlertTitle>
        <AlertDescription>
          {t("Something went wrong description")}
        </AlertDescription>
      </Alert>
      <h1></h1>
      <Button onClick={() => window.location.replace("/")}>Back to home</Button>
    </div>
  );
};

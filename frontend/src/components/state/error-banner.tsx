import { FrappeError } from "frappe-react-sdk";
import { useMemo } from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { useTranslation } from "react-i18next";
import { AlertCircle } from "lucide-react";

interface ParsedErrorMessage {
  message: string;
  title?: string;
  indicator?: string;
}

export const ErrorBanner = ({ error }: { error: FrappeError }) => {
  const { t } = useTranslation();

  const messages = useMemo(() => {
    if (!error) return [];
    let eMessages: ParsedErrorMessage[] = error?._server_messages
      ? JSON.parse(error?._server_messages)
      : [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    eMessages = eMessages.map((m: any) => {
      try {
        return JSON.parse(m);
      } catch (e) {
        return m;
      }
    });

    if (eMessages.length === 0) {
      // Get the message from the exception by removing the exc_type
      const indexOfFirstColon = error?.exception?.indexOf(":");
      if (indexOfFirstColon) {
        const exception = error?.exception?.slice(indexOfFirstColon + 1);
        if (exception) {
          eMessages = [
            {
              message: exception,
              title: "Error",
            },
          ];
        }
      }

      if (eMessages.length === 0) {
        eMessages = [
          {
            message: error?.message,
            title: "Error",
            indicator: "red",
          },
        ];
      }
    }
    return eMessages;
  }, [error]);

  if (messages.length === 0 || !error) return null;

  return (
    <Alert className="my-2" variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {messages.map((m, i) => (
          <div key={i}>{t(m.message)}</div>
        ))}
      </AlertDescription>
    </Alert>
  );
};

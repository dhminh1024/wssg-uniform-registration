import { FrappeError } from "frappe-react-sdk";

interface ParsedErrorMessage {
  message: string;
  title?: string;
  indicator?: string;
}

export const getServerErrors = (error: FrappeError) => {
  if (!error) return "";
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
      return error?.message;
    }
  }
  return eMessages.map((m) => m.message).join(", ");
};

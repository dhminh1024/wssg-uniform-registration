import React from "react";
import ReactDOM from "react-dom/client";
import "./core/locales/i18n";

import "./globals.css";
import App from "./App";

import { initSentry } from "@/lib/sentry";
initSentry();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

import { useEffect } from "react";

import * as Sentry from "@sentry/react";
import {
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from "react-router-dom";

function initSentry() {
  Sentry.init({
    dsn: "https://35f2650ad6b50ed4f5ef461bae28ad53@o4507065479069696.ingest.us.sentry.io/4507065481035776",

    integrations: [
      new Sentry.BrowserTracing({
        // See docs for support of different versions of variation of react router
        // https://docs.sentry.io/platforms/javascript/guides/react/configuration/integrations/react-router/
        routingInstrumentation: Sentry.reactRouterV6Instrumentation(
          useEffect,
          useLocation,
          useNavigationType,
          createRoutesFromChildren,
          matchRoutes
        ),
      }),
    ],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    tracesSampleRate: 1.0,

    // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
    tracePropagationTargets: [
      "localhost",
      // /^http:\/\/.*?\.platform\.coderschool\.vn/,
    ],

    // This sets the sample rate to be 10%. You may want this to be 100% while
    // in development and sample at a lower rate in production
    replaysSessionSampleRate: 0.1,
    // If the entire session is not sampled, use the below sample rate to sample
    // sessions when an error occurs.
    replaysOnErrorSampleRate: 1.0,

    ignoreErrors: [
      "NetworkError",
      "Forbidden resource",
      "NotAllowedError",
      "jwt expired",
      "Large Render Blocking Asset",
      "ResizeObserver loop completed with undelivered notifications.",
      "Importing a module script failed.",
      "Unable to preload CSS",
      "Failed to fetch dynamically imported module",
      "Failed to fetch",
    ],
  });
}

export { initSentry };

/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode, useEffect } from "react";
import { hydrateRoot } from "react-dom/client";
import Posthog from "posthog-js";

declare global {
  interface Window {
    ENV: {
      POSTHOG_API_KEY: string;
    };
  }
}

function PosthogInit() {
  const POSTHOG_API_KEY = window.ENV?.POSTHOG_API_KEY;

  useEffect(() => {
    if (!POSTHOG_API_KEY) {
      return;
    }

    Posthog.init(POSTHOG_API_KEY, {
      api_host: "https://us.i.posthog.com",
      person_profiles: "identified_only",
      autocapture: false,
    });
  }, [POSTHOG_API_KEY]);

  return null;
}

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <RemixBrowser />
      <PosthogInit />
    </StrictMode>,
  );
});

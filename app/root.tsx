import { useEffect } from "react";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation
} from "@remix-run/react";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import Posthog from "posthog-js";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: "https://cdn.jsdelivr.net/npm/bulma@1.0.2/css/bulma.min.css",
  },
];

type LoaderData = {
  ENV: {
    POSTHOG_API_KEY: string | undefined;
  };
};

export const loader: LoaderFunction = () => {
  return {
    ENV: {
      POSTHOG_API_KEY: process.env.POSTHOG_API_KEY,
    },
  };
};

export function Layout({ children }: { children: React.ReactNode }) {
  const { ENV } = useLoaderData<LoaderData>();

  return (
    <html lang="en" data-theme="light">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <script
          src="https://kit.fontawesome.com/94bf71cc46.js"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>
        {children}
        <ScrollRestoration />
        {ENV && (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html: `window.ENV = ${JSON.stringify(ENV)}`,
              }}
            />
            <Scripts />
          </>
        )}
      </body>
    </html>
  );
}

export default function App() {
  const location = useLocation();

  useEffect(() => {
    Posthog.capture("$pageview");
  }, [location]);

  return <Outlet />;
}

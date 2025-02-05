import type { HeadersFunction, LinksFunction } from "@vercel/remix";
import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Analytics } from "@vercel/analytics/react";

import stylesUrl from "~/styles/input.css?url";
import { HOUR, MINUTE } from "./utils/time";

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

// Currently in order to make any change to the site, a redeploy is needed, in
// which case Vercel will purge the production cache anyways.
const CACHE_CONTROL = [
  `max-age=${5 * MINUTE}`,
  // This avoids the server being invoked more than once per hour which would be
  // inefficient. This could in theory be set to some value higher, but then it
  // makes testing in preview environments more difficult. I might even remove
  // this amount of caching by detecting a PROD environment variable from Vercel
  // in order to be able to run automated tests with Cypress on a preview
  // deploy.
  // Reference https://vercel.com/docs/concepts/projects/environment-variables
  // Something like: VERCEL_ENV === "production" ? [...]: []
  `s-maxage=${1 * HOUR}`,
  `stale-while-revalidate`,
].join(", ");
export const headers: HeadersFunction = () => {
  return {
    "Cache-Control":
      process.env.NODE_ENV === "development" ? "" : CACHE_CONTROL,
  };
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-black text-neutral-100">
        <div className="space-y-2 grid grid-flow-row auto-rows-min">
          <header className="border-neutral-700 border-b-2 flex flex-wrap px-4 py-2 space-x-6">
            {/* TODO add a "skip to main content anchor" */}
            <Link to="/" className="text-red-400 font-medium italic">
              {"Graham McGregor"}
            </Link>
            <nav aria-label="Main navigation" className="flex-1">
              <ul className="flex flex-row space-x-6 justify-end">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/writing">Writing</Link>
                </li>
                <li>
                  <a href="/rss.xml">RSS</a>
                </li>
              </ul>
            </nav>
          </header>

          <div className="px-4 overflow-hidden">
            <Outlet />
          </div>

          <footer className="px-4 py-2 border-t-2 border-neutral-700">
            <div>
              <p className="text-center">
                All Materials &copy; Graham McGregor
              </p>
            </div>
            <nav aria-label="Social links">
              <ul className="flex flex-row space-x-6 justify-center px-6 py-2">
                <li>
                  <a href="https://github.com/graham42">GitHub</a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/grahammcgregorx/">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </nav>
          </footer>
        </div>

        <ScrollRestoration />
        <Scripts />
        <Analytics />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

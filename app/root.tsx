import {
  HeadersFunction,
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "remix";
import type { LinksFunction } from "remix";

import globalStylesUrl from "~/styles/global.css";
import { HOUR, MINUTE } from "./utils/time";
import { useUnregisterAllServiceWorkers } from "./utils/service-worker-cleanup";

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: globalStylesUrl }];
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
    "Cache-Control": CACHE_CONTROL,
  };
};

export default function App() {
  useUnregisterAllServiceWorkers();
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

// https://remix.run/docs/en/v1/api/conventions#errorboundary
export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <Document title="Error!">
      <Layout>
        <div>
          <h1>There was an error</h1>
          <p>{error.message}</p>
          <hr />
          <p>
            {
              // XXX fix this
            }
            Hey, developer, you should replace this with what you want your
            users to see.
          </p>
        </div>
      </Layout>
    </Document>
  );
}

// https://remix.run/docs/en/v1/api/conventions#catchboundary
export function CatchBoundary() {
  let caught = useCatch();

  let message;
  switch (caught.status) {
    case 404:
      message = (
        <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      );
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout>
        <h1>
          {caught.status}: {caught.statusText}
        </h1>
        {message}
      </Layout>
    </Document>
  );
}

function Document({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header className="remix-app__header">
        <div className="container remix-app__header-content">
          {/* <Link to="/">{"Graham's Website"}</Link> */}
          <div></div>
          <nav aria-label="Main navigation" className="remix-app__header-nav">
            <ul>
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
        </div>
        <div
          className="container remix-app__header-content"
          style={{ paddingTop: 16 }}
        >
          <div></div>
          <nav aria-label="Social links" className="remix-app__header-nav">
            <ul
              style={{
                justifyContent: "center",
                padding: 0,
              }}
            >
              <li>
                <a href="https://twitter.com/graham42x">Twitter</a>
              </li>
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
        </div>
      </header>
      <div className="remix-app__main">
        <div className="container remix-app__main-content">{children}</div>
      </div>
      <footer className="remix-app__footer">
        <div className="container remix-app__footer-content">
          <p>All Materials &copy; Graham McGregor</p>
        </div>
      </footer>
    </div>
  );
}

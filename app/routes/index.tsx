import type { HeadersFunction, MetaFunction } from "remix";
import { HOUR, MINUTE } from "~/utils/time";

export const headers: HeadersFunction = () => {
  return {
    "Cache-Control": [
      // Check in with the CDN every 5 minutes in case there's an update
      `max-age=${5 * MINUTE}`,
      // The CDN copy can be served for up to a week, but if it's more than an
      // hour out of date, serve the stale copy and revalidate with the server.
      // The most urgent use case I have for this page is that I publish an
      // update to this page and in order to do that currently I would need to
      // redeploy, in which case Vercel will purge the production cache anyways.
      `s-maxage=${1 * HOUR}`,
      `stale-while-revalidate`,
    ].join(", "),
  };
};

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: "Graham McGregor",
    description: "Graham McGregor's website and blog",
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  return (
    <div className="remix__page">
      <main>
        <h1>Graham McGregor</h1>
        <h2>About Me</h2>
        {/* TODO insert picture */}
        <p>
          Graham is a Software Developer currently working at Trend Micro
          building the next generation of continuous delivery for Cloud One. He
          cares deeply about building high quality tools to improve developer
          experience.
        </p>
        <p>
          Graham lives in Ontario, Canada. He enjoys cooking, indoor rock
          climbing, board games, Dungeons &amp; Dragons, and playing piano.
        </p>
      </main>
    </div>
  );
}

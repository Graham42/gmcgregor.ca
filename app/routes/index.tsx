import type { MetaFunction } from "remix";

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
          Graham McGregor is an enthusiastic Software Developer, currently
          working at Trend Micro building the next generation of continuos
          delivery for Cloud One. He cares deeply about building high quality
          tools to improve developer experience.
        </p>
        <p>
          Graham lives in Ontario, Canada. He enjoys cooking, indoor rock
          climbing, board games, Dungeons &amp; Dragons, and playing piano.
        </p>
      </main>
    </div>
  );
}

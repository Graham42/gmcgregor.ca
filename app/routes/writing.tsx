import { Link, useLoaderData, Outlet } from "remix";

// Import all your posts from the app/routes/posts directory. Since these are
// regular route modules, they will all be available for individual viewing
// at /posts/a, for example.
import * as postA from "./writing/first-post.mdx";
// import * as postB from "./posts/b.md";
// import * as postC from "./posts/c.md";

function postFromModule(mod: any) {
  return {
    slug: mod.filename.replace(/\.mdx?$/, ""),
    ...mod.attributes.meta,
  };
}

// https://remix.run/docs/en/v1/guides/mdx
export function loader() {
  // Return metadata about each of the posts for display on the index page.
  // Referencing the posts here instead of in the Index component down below
  // lets us avoid bundling the actual posts themselves in the bundle for the
  // index page.
  return [
    //
    postFromModule(postA),
    // postFromModule(postB),
    // postFromModule(postC),
  ];
}

export default function Writing() {
  const posts = useLoaderData();

  return (
    <div className="remix__page">
      <main>
        <h1>Writing!</h1>
        <ul>
          {posts.map((post: any) => (
            <li key={post.slug}>
              <Link to={post.slug}>{post.title}</Link>
              {post.description && <p>{post.description}</p>}
            </li>
          ))}
        </ul>
        <Outlet />
      </main>
    </div>
  );
}

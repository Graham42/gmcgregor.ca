import { Link, useLoaderData } from "remix";

// Import all your posts from the app/routes/posts directory. Since these are
// regular route modules, they will all be available for individual viewing
// at /posts/a, for example.
import * as postA from "./2019-03-18-why-do-s3-buckets-return-403-for-not-found.mdx";
import * as postB from "./2019-05-09-git-branch-housekeeping.mdx";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    postFromModule(postB),
    // postFromModule(postC),
  ];
}

export default function PostList() {
  const posts = useLoaderData();

  return (
    <>
      <h1>Writing!</h1>
      <ul>
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          posts.map((post: any) => (
            <li key={post.slug}>
              <Link to={post.slug}>{post.title}</Link>
              {post.description && <p>{post.description}</p>}
            </li>
          ))
        }
        <li>
          <a href="https://medium.com/@Graham42x/inline-data-with-a-content-security-policy-ab30dde2feb3">
            Inline Data With a Content Security Policy
          </a>
        </li>
      </ul>
    </>
  );
}

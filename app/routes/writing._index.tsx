import type { LinksFunction, MetaFunction } from "@vercel/remix";
import { json } from "@vercel/remix";
import { Link, useLoaderData } from "@remix-run/react";
import { getPosts, isBlogPost } from "~/utils/posts";

export const links: LinksFunction = () => {
  return [
    //
    {
      rel: "alternate",
      type: "application/rss+xml",
      href: "/rss.xml",
      title: "RSS Feed for Graham McGregor's Writing",
    },
  ];
};

export const meta: MetaFunction = () => {
  return [
    {
      title: "Writing by Graham",
      description: "Blog posts and other writing by Graham McGregor",
    },
  ];
};

// https://remix.run/docs/en/v1/guides/mdx
export function loader() {
  return json(getPosts());
}

export default function PostList() {
  const posts = useLoaderData<typeof loader>();

  return (
    <main className="max-w-prose">
      <h1>Writing by Graham</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.title}>
            {isBlogPost(post) ? (
              <Link to={post.slug}>{post.title}</Link>
            ) : (
              <a href={post.permalink}>{post.title}</a>
            )}
            <p>{post.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}

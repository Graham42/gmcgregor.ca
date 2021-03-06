import { Link, LinksFunction, MetaFunction, useLoaderData } from "remix";
import { getPosts, isBlogPost, Post } from "~/utils/posts";

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
  return {
    title: "Writing by Graham",
    description: "Blog posts and other writing by Graham McGregor",
  };
};

// https://remix.run/docs/en/v1/guides/mdx
export function loader() {
  return getPosts();
}

export default function PostList() {
  const posts = useLoaderData<Array<Post>>();

  return (
    <>
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
    </>
  );
}

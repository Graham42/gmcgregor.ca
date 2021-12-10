// Import all your posts from the app/routes/posts directory. Since these are
// regular route modules, they will all be available for individual viewing
// at /posts/a, for example.
import * as postA from "../routes/writing/2019-03-18-why-do-s3-buckets-return-403-for-not-found.mdx";
import * as postB from "../routes/writing/2019-05-09-git-branch-housekeeping.mdx";

// XXX TODO make this typesafe, or throw 5xx error that can be monitored
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function postFromModule(mod: any): BlogPost {
  let post = {
    slug: mod.filename.replace(/\.mdx?$/, ""),
    published: mod.attributes.published,
    tags: mod.attributes.tags,
    ...mod.attributes.meta,
  };
  if (
    !(post?.published instanceof Date) ||
    !post?.tags ||
    !post?.title ||
    !post?.description
  ) {
    throw new Error(`Invalid post ${mod.filename}`);
  }
  return post;
}

interface AbstractPost {
  /** The original date the article was published */
  published: Date;
  /** The last date the article was updated */
  lastUpdated?: Date;
  title: string;
  /** A one sentence summary of the post */
  description: string;
  /**
   * A list of topics that this post relates to. Consider labels for topics that
   * I might write about again, not too specific, but specific enough.
   */
  tags: string[];
}
interface BlogPost extends AbstractPost {
  slug: string;
}
interface ExternalArticle extends AbstractPost {
  permalink: string;
}
export type Post = BlogPost | ExternalArticle;

export function isBlogPost(post: Post): post is BlogPost {
  let maybePost = post as Partial<BlogPost>;
  return Boolean(maybePost.slug);
}

export function isExternalPost(post: Post): post is ExternalArticle {
  let maybePost = post as Partial<ExternalArticle>;
  return Boolean(maybePost.permalink);
}

export function getPosts(): Array<Post> {
  const externalList: ExternalArticle[] = [
    {
      permalink:
        "https://medium.com/@Graham42x/inline-data-with-a-content-security-policy-ab30dde2feb3",
      title: "Inline Data With a Content Security Policy",
      description:
        "How to implement a strong Content Security Policy (CSP) and still pass data from the server to the client without inline JavaScript, or needing the data to come from an API.",
      published: new Date("2018-02-22"),
      tags: ["tech", "security", "web-dev"],
    },
  ];
  return sortPostsNewToOld([
    //
    postFromModule(postA),
    postFromModule(postB),
    ...externalList,
  ]);
}

/**
 * Get all tags for all posts
 */
export function getAllTags() {
  let tags = getPosts()
    .map((post) => post.tags)
    .flat();
  let uniqueTags = [...new Set(tags)];
  return uniqueTags;
}

/**
 * returns a shallow copy of an array of Posts in order from newest to oldest
 */
function sortPostsNewToOld(posts: Array<Post>): Array<Post> {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
  return [...posts].sort((a, b) =>
    // if postA was published _after_ postB, then it should have a lower order
    // in the array
    a.published > b.published
      ? -1
      : // if postA was published _before_ postB, then it should have a higher
      // order in the array
      a.published < b.published
      ? 1
      : 0,
  );
}

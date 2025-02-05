import type { LoaderFunction } from "@vercel/remix";
import { json } from "@vercel/remix";
import { getPosts, isExternalPost } from "~/utils/posts";
import Negotiator from "negotiator";

function escapeCdata(s: string) {
  return s.replace(/]]>/g, "]]]]><![CDATA[>");
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export const loader: LoaderFunction = async ({ request }) => {
  const posts = getPosts();

  const host =
    request.headers.get("X-Forwarded-Host") ?? request.headers.get("host");
  if (!host) {
    throw json(
      {
        error:
          "Could not determine domain URL. Missing header 'X-Forwarded-Host' or 'Host'.",
      },
      400
    );
  }
  const protocol = host.includes("localhost") ? "http" : "https";
  const domain = `${protocol}://${host}`;

  let { searchParams } = new URL(request.url);
  let filterTags = searchParams.get("tags")?.split(",") || [];
  // TODO use tags in urls that need it

  const writingUrl = `${domain}/writing`;

  // Some notes on RSS - See https://www.rssboard.org/rss-specification
  // Validate at https://validator.w3.org/feed/check.cgi
  // <![CDATA[]]> - means character data, string content that _could_ be
  // interpretted as XML, but should _not_
  // <ttl> is Time To Live - how many minutes a channel can be cached
  // Atom feed spec is at https://datatracker.ietf.org/doc/html/rfc4287

  // TODO add <image> under channel - https://www.rssboard.org/rss-specification#ltimagegtSubelementOfLtchannelgt
  // TODO add <category> for tags

  const rssString = `
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <atom:link href="${
          request.url
        }" rel="self" type="application/rss+xml" />
        <title>${escapeHtml("Graham McGregor's Writing")}</title>
        <link>${writingUrl}</link>
        <description>Blog posts and other articles by Graham McGregor</description>
        <language>en-us</language>
        <copyright>All Materials Copyright Graham McGregor</copyright>
        <webMaster>webmaster@gmcgregor.ca (Graham McGregor)</webMaster>
        <docs>https://www.rssboard.org/rss-specification</docs>
        <ttl>60</ttl>
        ${posts
          .filter(
            (post) =>
              filterTags.length === 0 ||
              post.tags.some((postTag) => filterTags.includes(postTag))
          )
          .map((post) => {
            const postLink = isExternalPost(post)
              ? post.permalink
              : `${writingUrl}/${post.slug}`;
            const postGuid = postLink;
            return `
              <item>
                <title><![CDATA[${escapeCdata(post.title)}]]></title>
                <description><![CDATA[${escapeHtml(
                  post.description
                )}]]></description>
                <pubDate>${post.published.toUTCString()}</pubDate>
                <link>${postLink}</link>
                <guid>${postGuid}</guid>
              </item>
            `.trim();
          })
          .join("\n")}
      </channel>
    </rss>`
    .trim()
    // remove all leading whitespace, etc. to save content size
    .replace(/^\s*/gm, "")
    // remove all trailing whitespace
    .replace(/>\s*$/gm, ">");

  // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept
  const contentNegotiator = new Negotiator({
    headers: Object.fromEntries(request.headers.entries()),
  });
  // TODO should this include application/atom+xml ?
  // what makes something an ATOM feed?
  const contentType =
    // Try and use the content type that is being asked for
    contentNegotiator.mediaType(["application/rss+xml", "application/xml"]) ||
    // otherwise fallback to the most widely compatible option
    "application/xml";

  return new Response(rssString, {
    // TODO review https://fishbowl.pastiche.org/2002/10/21/http_conditional_get_for_rss_hackers
    // TODO review cache settings
    headers: {
      "Cache-Control": `public, max-age=${60 * 10}, s-maxage=${60 * 60 * 24}`,
      "Content-Type": contentType,
      "Content-Length": String(Buffer.byteLength(rssString)),
    },
  });
};

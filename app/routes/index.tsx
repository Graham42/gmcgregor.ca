import { MetaFunction, LinksFunction, Link } from "remix";

import stylesUrl from "../styles/index.css";
import AboutMeShortContent from "../content/about-me-short-3rd.md";

export let meta: MetaFunction = () => {
  return {
    title: "Graham McGregor's site",
  };
};

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export default function Index() {
  return (
    <main>
      <h1>Graham McGregor</h1>
      <nav>
        <Link to="/about">About</Link>
        <Link to="/writing">Writing</Link>
      </nav>
      <div>
        <h2>About Me</h2>
        <AboutMeShortContent />
      </div>
      <div>
        <h2>Recent Posts</h2>
        {/* For loop posts */}
      </div>
    </main>
  );
}

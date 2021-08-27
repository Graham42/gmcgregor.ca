import { MetaFunction, LinksFunction } from "remix";

import stylesUrl from "../styles/index.css";

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
    <div style={{ padding: 20 }}>
      <h1>Welcome to Graham McGregor's site!</h1>
      <p>
        This site is currently under construction. Thanks for your patience!
      </p>
    </div>
  );
}

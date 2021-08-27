import { MetaFunction } from "remix";

export let meta: MetaFunction = () => {
  return {
    title: "Graham McGregor's blog",
  };
};

export default function Index() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Graham McGregor's Blog</h1>
      <p>
        This site is currently under construction. Thanks for your patience!
      </p>
    </div>
  );
}

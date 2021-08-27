import type { MetaFunction } from "remix";
import { MINUTE, YEAR } from "../util/time";

export let meta: MetaFunction = () => {
  return {
    title: "Page Not Found - Graham McGregor's site",
    description:
      "We couldn't find the page you're looking for, please check the URL",
  };
};

export let headers = () => {
  return {
    "Cache-Control": [
      `public`,
      `max-age=${15 * MINUTE}`,
      `s-maxage=${1 * YEAR}`,
      `stale-while-revalidate=${1 * YEAR}`,
    ].join(", "),
  };
};

export default function FourOhFour() {
  return (
    <main>
      <h1>404 Page Not Found</h1>
      <p>Uh oh! We couldn't find the page you're looking for.</p>
      {/*
      // TODO https://github.com/Graham42/gmcgregor.ca/issues/2
      <p>
        If you want, you can{" "}
        <a href={googleFormsErrorReportLink}>submit an error report</a> and tell
        us what you were looking for.
      </p> */}
    </main>
  );
}

// this file needs to exist so legacy /blog/X posts can redirect
import { LoaderFunction, redirect } from "remix";
export const loader: LoaderFunction = ({ request }) => {
  let target = request.url.replace(/\/blog\/?/, "/writing/");
  return redirect(target, 301);
};

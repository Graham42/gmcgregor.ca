import { LoaderFunction, redirect } from "remix";
export const loader: LoaderFunction = ({ request }) => {
  let target = request.url.replace(/\/blog\/?/, "/writing/");
  return redirect(target, 301);
};

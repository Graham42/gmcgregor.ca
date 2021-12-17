import { Outlet } from "remix";

export default function Writing() {
  return (
    <main className="max-w-prose">
      <Outlet />
    </main>
  );
}

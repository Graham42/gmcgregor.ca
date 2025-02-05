import { Outlet } from "@remix-run/react";

export default function Writing() {
  return (
    <main className="max-w-prose">
      <Outlet />
    </main>
  );
}

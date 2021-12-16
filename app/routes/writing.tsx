import { Outlet } from "remix";

export default function Writing() {
  return (
    <div>
      <main className="max-w-prose">
        <Outlet />
      </main>
    </div>
  );
}

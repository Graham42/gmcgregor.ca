import { Outlet } from "remix";

export default function Writing() {
  return (
    <div className="remix__page">
      <main>
        <Outlet />
      </main>
    </div>
  );
}

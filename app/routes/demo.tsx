import { Outlet } from "@remix-run/react";

export default function Layout() {
  return (
    <>
      <div className="p-4 -mt-4">
        <div className="py-2">
          <Outlet />
        </div>
      </div>
    </>
  );
}

import { Link, Outlet } from "@remix-run/react";
import { Typography } from "~/lib/ui/typogrphy";

export default function Layout() {
  return (
    <>
      <div style={{ padding: 16, marginBottom: 8, background: "#dddddd" }}>
        <Link to="/">Home</Link>
      </div>

      <div className="p-4 -mt-4">
        <Typography variant="h2">Demo</Typography>
        <div className="py-2">
          <Outlet />
        </div>
      </div>
    </>
  );
}

import { Link, Outlet } from "@remix-run/react";

export default function Layout() {
  return (
    <>
      <div style={{ padding: 16, marginBottom: 8, background: "#dddddd" }}>
        <Link to="/">Home</Link>
      </div>

      <div>
        <h1 style={{ fontSize: "1.5rem", marginBlock: 16 }}>Demo</h1>
        <Outlet />
      </div>
    </>
  );
}

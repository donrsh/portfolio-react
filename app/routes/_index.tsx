import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix SPA" },
    { name: "description", content: "Welcome to Remix (SPA Mode)!" },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>React Portfolio</h1>
      <p>
        This site serves as a portfolio of my react skill.
        <br />
        It is based on <a href="https://vitejs.dev/">Vite</a> and{" "}
        <a href="https://remix.run/">Remix</a>, and also an app under my{" "}
        <a href="https://github.com/donrsh/web-apps-workspace/tree/main">
          web apps workspace
        </a>{" "}
        project.
      </p>

      <h2>Demos</h2>
      <ul>
        <li>
          <Link to="/demo/use-toggler">
            react hook: <code>useToggler</code>
          </Link>
        </li>
        <li>
          <Link to="/demo/useTmpAuthorization-zustand">
            react hook: <code>useTmpAuthorization</code> (impl w/ zustand)
          </Link>
        </li>
      </ul>
    </div>
  );
}

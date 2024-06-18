import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { type ComponentProps } from "react";

export const meta: MetaFunction = () => {
  return [{ title: "Donrsh | React Portfolio" }];
};

const ExternalLink = (props: ComponentProps<"a">) => {
  return (
    <a {...props} target="_blank" rel="noreferrer">
      {props.children!}
    </a>
  );
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>React Portfolio</h1>
      <p>
        This site serves as a portfolio of my{" "}
        <ExternalLink href="https://react.dev/">React</ExternalLink> skill.
        <br />
        It is based on{" "}
        <ExternalLink href="https://vitejs.dev/">Vite</ExternalLink> and{" "}
        <ExternalLink href="https://remix.run/">Remix</ExternalLink>, and also
        an app under my{" "}
        <ExternalLink href="https://github.com/donrsh/web-apps-workspace/tree/main">
          web apps workspace
        </ExternalLink>{" "}
        project.
        <br />
        This site is a{" "}
        <ExternalLink href="https://web.dev/articles/what-are-pwas?hl=zh-tw">
          Progress Web App (PWA)
        </ExternalLink>{" "}
        as well. You can install it to your mobile devices.
      </p>

      <h2>Demos</h2>
      <ul>
        <li>
          <Link to="/demo/useToggler">
            react hook: <code>useToggler</code>
          </Link>
        </li>
        <li>
          <Link to="/demo/useTmpAuthorization-zustand">
            react hook: <code>useTmpAuthorization</code> (impl w/ zustand)
          </Link>
        </li>
        <li>
          <Link to="/demo/useAnimateOnUpdate">
            react hook: <code>useAnimateOnUpdate</code>
          </Link>
        </li>
      </ul>

      <h2>Applets</h2>
      <ul>
        <li>
          <Link to="/applet/fullscreen-emoji">Full Screen Emoji</Link>
        </li>
      </ul>
    </div>
  );
}

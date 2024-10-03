import type { MetaFunction } from "@remix-run/node";
import { Link as RemixLink } from "@remix-run/react";
import { type ComponentProps } from "react";
import { Separator } from "~/lib/ui/separator";
import { Typography } from "~/lib/ui/typogrphy";
import { Link } from "~/lib/ui/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/lib/ui/accordion";

export const meta: MetaFunction = () => {
  return [{ title: "Donrsh | React Portfolio" }];
};

const ExternalLink = (props: ComponentProps<"a">) => {
  return (
    <Link {...props} target="_blank" rel="noreferrer">
      {props.children!}
    </Link>
  );
};

export default function Index() {
  return (
    <div className="p-4 ">
      <Typography variant="muted" className="leading-relaxed mb-2">
        This site serves as a portfolio of my{" "}
        <ExternalLink href="https://react.dev/">React</ExternalLink> skill. It
        is based on <ExternalLink href="https://vitejs.dev/">Vite</ExternalLink>{" "}
        and <ExternalLink href="https://remix.run/">Remix</ExternalLink> (in{" "}
        <ExternalLink href="https://remix.run/docs/en/main/guides/spa-mode">
          SPA mode
        </ExternalLink>
        ), and also an app under my{" "}
        <ExternalLink href="https://github.com/donrsh/web-apps-workspace/tree/main">
          web apps workspace
        </ExternalLink>{" "}
        project.
        <br />
      </Typography>

      <Typography variant="muted" className="leading-relaxed">
        This site is a{" "}
        <ExternalLink href="https://web.dev/articles/what-are-pwas?hl=zh-tw">
          Progress Web App (PWA)
        </ExternalLink>{" "}
        as well. You can install it to your mobile devices.
      </Typography>

      <Separator className="my-4" />

      <Accordion type="multiple" defaultValue={["demos", "applets", "ux"]}>
        <AccordionItem value="demos">
          <AccordionTrigger className="text-lg">Demos (4)</AccordionTrigger>
          <AccordionContent>
            <Typography variant="ul">
              <li>
                react hook:{" "}
                <Link asChild>
                  <RemixLink to="/demo/useToggler">
                    <code>useToggler</code>
                  </RemixLink>
                </Link>
              </li>
              <li>
                react hook:{" "}
                <Link asChild>
                  <RemixLink to="/demo/useTmpAuthorization-zustand">
                    <code>useTmpAuthorization</code>
                  </RemixLink>
                </Link>{" "}
                (impl w/ zustand)
              </li>
              <li>
                react hook:{" "}
                <Link asChild>
                  <RemixLink to="/demo/useAnimateOnUpdate">
                    <code>useAnimateOnUpdate</code>
                  </RemixLink>
                </Link>
              </li>
              <li>
                react hook:{" "}
                <Link asChild>
                  <RemixLink to="/demo/useHorizontalScroll">
                    <code>useHorizontalScroll</code>
                  </RemixLink>
                </Link>
              </li>
            </Typography>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="applets">
          <AccordionTrigger className="text-lg">Applets (1)</AccordionTrigger>
          <AccordionContent>
            <Typography variant="ul">
              <li>
                <Link asChild>
                  <RemixLink to="/applet/fullscreen-emoji">
                    Full Screen Emoji
                  </RemixLink>
                </Link>
              </li>
            </Typography>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="ux">
          <AccordionTrigger className="text-lg">UX (2)</AccordionTrigger>
          <AccordionContent>
            <Typography variant="ul">
              <li>
                <Link asChild>
                  <RemixLink to="/ux/auto-focus-when-scrolling">
                    Auto Focus when Scrolling
                  </RemixLink>
                </Link>
              </li>
              <li>
                <Link asChild>
                  <RemixLink to="/ux/handle-image-input">
                    Handle Image Input
                  </RemixLink>
                </Link>
              </li>
            </Typography>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

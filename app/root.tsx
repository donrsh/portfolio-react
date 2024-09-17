import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { ThemeModeProvider } from "~/components/provider/theme-mode";
import { AppHeader } from "./components/ui/app-header";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="manifest"
          href={`${import.meta.env.BASE_URL}app.webmanifest`}
        />
        <link
          rel="shortcut icon"
          href={`${import.meta.env.BASE_URL}react-favicon.png`}
          type="image/x-icon"
        />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <ThemeModeProvider>
      <AppHeader />
      <Outlet />
    </ThemeModeProvider>
  );
}

export function HydrateFallback() {
  return <p>Loading...</p>;
}

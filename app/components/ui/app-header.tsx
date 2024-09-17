import { Link } from "@remix-run/react";
import { ThemeModeToggler } from "~/components/ui/mode-toggler";
import { Typography } from "~/lib/ui/typogrphy";

export function AppHeader() {
  return (
    <header className="px-4 py-6 flex items-center">
      <Typography variant="h2" className="mr-auto border-b-0 pb-0">
        <Link to="/">Don's React Portfolio</Link>
      </Typography>
      <ThemeModeToggler />
    </header>
  );
}

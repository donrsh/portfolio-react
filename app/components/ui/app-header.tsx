import { Link, useLocation } from "@remix-run/react";
import { ThemeModeToggler } from "~/components/ui/mode-toggler";
import { Typography } from "~/lib/ui/typogrphy";
import { HomeIcon } from "lucide-react";

export function AppHeader() {
  const { pathname } = useLocation();

  return (
    <header className="px-4 py-6 flex items-center">
      <Typography variant="h2" className="mr-auto border-b-0 pb-0">
        <Link to="/">
          {pathname === "/" ? (
            "Don's React Portfolio"
          ) : (
            <HomeIcon className="ml-1" />
          )}
        </Link>
      </Typography>
      <ThemeModeToggler />
    </header>
  );
}

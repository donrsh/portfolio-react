import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "~/lib/ui/button";
import { useThemeMode } from "~/components/provider/theme-mode";
import { useEffect, useState } from "react";

export function ThemeModeToggler() {
  const { toggleThemeMode } = useThemeMode();
  const [ready, setReady] = useState(false);

  // delay to avoid flashing the theme mode toggler on load
  useEffect(() => {
    setTimeout(() => {
      setReady(true);
    }, 100);
  }, []);

  return ready ? (
    <Button variant="outline" size="icon" onClick={toggleThemeMode}>
      <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  ) : null;
}

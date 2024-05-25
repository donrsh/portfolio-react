import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const base = process.env.BASE_URL ?? undefined;

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    base,
    server: {
      port: Number(env.VITE_DEV_PORT),
      open: true,
    },
    plugins: [
      remix({
        ssr: false,
        basename: base,
      }),
      tsconfigPaths(),
    ],
  };
});

import fs from "node:fs/promises";
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/**
 * Renders <App /> to static HTML at build time and injects it into dist/index.html.
 *
 * Without this the first paint waited for React to download, parse and execute,
 * which showed up in Lighthouse as a slow FCP/LCP and render-blocking requests.
 * The client now hydrates the markup instead of building it from scratch.
 */
function prerenderApp() {
  return {
    name: "prerender-app",
    apply: "build",
    async closeBundle() {
      const indexPath = path.resolve(import.meta.dirname, "dist/index.html");
      const template = await fs.readFile(indexPath, "utf8");

      const { createServer } = await import("vite");
      const server = await createServer({
        server: { middlewareMode: true },
        appType: "custom",
        logLevel: "error",
      });

      try {
        const [{ default: App }, React, { renderToString }] = await Promise.all([
          server.ssrLoadModule("/src/App.jsx"),
          import("react"),
          import("react-dom/server"),
        ]);

        const markup = renderToString(React.createElement(App));
        const html = template.replace(
          '<div id="root"></div>',
          `<div id="root">${markup}</div>`,
        );

        await fs.writeFile(indexPath, html);
        console.log(`prerendered ${markup.length.toLocaleString()} chars into dist/index.html`);
      } finally {
        await server.close();
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), prerenderApp()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: [".e2b.app"],
  },
  preview: {
    host: "0.0.0.0",
    port: 4173,
    allowedHosts: [".e2b.app"],
  },
});

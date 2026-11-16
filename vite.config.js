import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    // Allows the sandbox preview host (https://<port>-<id>.e2b.app).
    allowedHosts: true,
    hmr: { clientPort: 443 },
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    allowedHosts: true,
  },
  build: {
    target: 'es2020',
    assetsInlineLimit: 2048,
    cssCodeSplit: true,
    /* Small, stable vendor chunks.
       Long animation/scroll libraries change far less often than the site's own
       sections, so giving them their own files means a content edit only
       invalidates the small app chunk — returning visitors re-download ~15 kB
       instead of the whole 425 kB bundle. It also lets the browser parse React
       while the GSAP chunk is still arriving. */
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('react-dom') || id.includes('/react/') || id.includes('scheduler')) return 'react';
          if (id.includes('gsap')) return 'gsap';
          if (id.includes('lenis')) return 'lenis';
          if (id.includes('lucide')) return 'icons';
          return 'vendor';
        },
      },
    },
  },
});

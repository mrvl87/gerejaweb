import { defineConfig } from 'astro/config';
import { mkdirSync, writeFileSync } from 'node:fs';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import vercel from '@astrojs/vercel';

function keystaticCustom() {
  return {
    name: 'keystatic-custom',
    hooks: {
      'astro:config:setup': ({ injectRoute, updateConfig, config }) => {
        updateConfig({
          server: config.server.host ? {} : { host: '127.0.0.1' },
          vite: {
            plugins: [
              {
                name: 'keystatic-virtual-config',
                resolveId(id) {
                  if (id === 'virtual:keystatic-config') {
                    return this.resolve('./keystatic.config', './a');
                  }
                  return null;
                },
              },
            ],
            optimizeDeps: {
              entries: ['keystatic.config.*', '.astro/keystatic-imports.js'],
            },
          },
        });

        const dotAstroDir = new URL('./.astro/', config.root);
        mkdirSync(dotAstroDir, { recursive: true });
        writeFileSync(
          new URL('keystatic-imports.js', dotAstroDir),
          `import "@keystatic/astro/ui";
import "@keystatic/astro/api";
import "@keystatic/core/ui";
`
        );

        injectRoute({
          entrypoint: '@keystatic/astro/internal/keystatic-api.js',
          pattern: '/api/keystatic/[...params]',
          prerender: false,
        });
      },
    },
  };
}

// [ASTRO CONFIG] Static-first site with Keystatic admin routes.
export default defineConfig({
  output: 'static',
  integrations: [react(), markdoc(), keystaticCustom()],
  adapter: vercel(),
  vite: {
    cacheDir: 'C:/tmp/gki-vite-cache',
    optimizeDeps: {
      noDiscovery: true,
      include: [],
    },
  },
});

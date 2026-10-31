// @ts-check
import { rm } from 'node:fs/promises';
import { defineConfig } from 'astro/config';

/**
 * /styleguide is a design-review tool, not part of the portfolio. Keep it on the
 * dev server but delete it from the production build so it never goes live.
 * @returns {import('astro').AstroIntegration}
 */
const devOnlyStyleguide = () => ({
  name: 'dev-only-styleguide',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      await rm(new URL('styleguide/', dir), { recursive: true, force: true });
    },
  },
});

// https://astro.build/config
export default defineConfig({
  integrations: [devOnlyStyleguide()],
  // Served from the root of the GitHub Pages user site (repo: mohammed-shanid.github.io).
  site: 'https://mohammed-shanid.github.io',
  // The dev toolbar overlays the page and gets in the way of review screenshots.
  devToolbar: { enabled: false },
});

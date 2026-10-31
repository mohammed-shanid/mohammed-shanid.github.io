// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Served from the root of the GitHub Pages user site (repo: mohammed-shanid.github.io).
  site: 'https://mohammed-shanid.github.io',
  // The dev toolbar overlays the page and gets in the way of review screenshots.
  devToolbar: { enabled: false },
});

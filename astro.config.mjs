// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // The dev toolbar overlays the page and gets in the way of review screenshots.
  devToolbar: { enabled: false },
});

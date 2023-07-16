import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://dmitryanisov.com',
  markdown: { shikiConfig: { theme: 'rose-pine-moon'}},
	integrations: [mdx(), sitemap()],
});

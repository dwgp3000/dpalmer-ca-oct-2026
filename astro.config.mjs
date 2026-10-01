// @ts-check
import { defineConfig } from 'astro/config';
import sanity from '@sanity/astro';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://dpalmer.ca',

	integrations: [
		sanity({
			projectId: 'f98etxtk',
			dataset: 'production',
			useCdn: false,
			apiVersion: '2026-09-28',
		}),
		sitemap(),
	],
});
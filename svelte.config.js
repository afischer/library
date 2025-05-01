import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter(),
		csp: {
			directives: {
				'default-src': ["'self'"],
				'script-src': [
					"'self'",
					"'unsafe-inline'",
					'cdnjs.cloudflare.com',
					'*.google-analytics.com'
				],
				'style-src': [
					"'self'",
					"'unsafe-inline'",
					'cdnjs.cloudflare.com',
					'fonts.googleapis.com',
					'maxcdn.bootstrapcdn.com',
					'*.googleusercontent.com'
				],
				'font-src': ["'self'", 'fonts.gstatic.com', 'maxcdn.bootstrapcdn.com'],
				'img-src': ["'self'", 'data:', '*.googleusercontent.com', '*.google-analytics.com'],
				'frame-src': ["'self'", 'data:', '*.youtube.com'],
				'object-src': ["'none'"]
			}
		}
	}
};

export default config;

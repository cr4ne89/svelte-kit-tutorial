import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),

    prerender: {
      entries: [
        '/products/svelte-book',
        '/products/react-book',
        '/products/vue-book',
        '/products/angular-book',
      ],
      origin: 'https://svelte-kit-tutorial-jet.vercel.app'
    }
	}
};

export default config;

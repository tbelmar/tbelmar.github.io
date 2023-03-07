import { sveltekit } from '@sveltejs/kit/vite';
import { loadEnv } from 'vite';
import { defineConfig } from 'vite';

console.log("THE PORT IS " + process.env.PORT)

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		port: process.env.PORT || 3000,
		strictPort: false
	}
});

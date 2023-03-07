import { sveltekit } from '@sveltejs/kit/vite';
import { loadEnv } from 'vite';
import { defineConfig } from 'vite';

export default defineConfig({
	base: "/",
	plugins: [sveltekit()],
	server: {
		port: process.env.PORT || 3000,
	}
});

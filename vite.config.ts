import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
	plugins: [
		legacy({
			targets: ['default', 'not IE 11'],
		}),
	],
});

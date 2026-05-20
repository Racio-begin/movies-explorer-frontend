import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
		open: false,
	},
	build: {
		outDir: 'build',
	},
	// В проекте исторически JSX живёт в .js-файлах (наследие CRA).
	// Принудительно говорим esbuild парсить .js как JSX, чтобы не
	// переименовывать ~18 файлов.
	esbuild: {
		loader: 'jsx',
		include: /src\/.*\.jsx?$/,
		exclude: [],
	},
	optimizeDeps: {
		esbuildOptions: {
			loader: { '.js': 'jsx' },
		},
	},
	test: {
		globals: true,
		environment: 'jsdom',
	},
});

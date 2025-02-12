import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'node:path'
import dts from 'vite-plugin-dts'; // Plugin to generate .d.ts files
export default defineConfig({
	plugins: [
		vue(),
		dts({
			insertTypesEntry: true,
			outDir: 'dist/types',
		}),
	],
	css: {
		postcss: './postcss.config.js',
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src') // Define @ as src directory
		}
	},
	build: {
		cssCodeSplit: true,
		lib: {
			entry: './src/devkit_admin.ts', // Entry point for your library
			name: 'VueDevkit', // Global variable name for your library
			fileName: (format) => `devkit_admin.${format}.js`, // Output file name
			formats: ['es'], // Only output ESM format
		},
		rollupOptions: {
			external: ['vue', 'vue-router', 'primevue', 'pinia', "@formkit/vue", "@tanstack/vue-query", "primevue/dialogservice", "primevue/toastservice", "vue-i18n",
				"vue-router", "primeicons"], // Externalize Vue
			output: {
				globals: {
					vue: 'Vue',
					pinia: 'Pinia',
					i18n: 'i18n',
					primevue: 'Primevue',
					'vue-router': 'VueRouter',
				},
			},
		},
	},
});

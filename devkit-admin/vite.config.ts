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
			// Use an object for multiple entry points
			entry: {
				'devkit_admin': './src/devkit_admin.ts', // Main entry point
				'datalist': './src/app/datalist/index.ts', // Additional entry point
				'form': './src/app/appform/index.ts' // Additional entry point
			},
			name: 'VueDevkit', // Global variable name for your library
			formats: ['es'], // Only output ESM format
			// Modify fileName to handle multiple entries
			fileName: (format, entryName) => `${entryName}.${format}.js`,
		},
		//lib: {
		//	entry: './src/devkit_admin.ts', // Entry point for your library
		//	name: 'VueDevkit', // Global variable name for your library
		//	fileName: (format) => `devkit_admin.${format}.js`, // Output file name
		//	formats: ['es'], // Only output ESM format
		//},
		rollupOptions: {
			external: [
				'vue',
				'vue-router',
				'primevue',
				'pinia',
				"@formkit/core",
				"@formkit/vue",
				"@tanstack/vue-query",
				"@tanstack/query-persist-client-core",
				"primevue/dialogservice",
				"primevue/toastservice",
				"vue-i18n",
				"vue-router",
				"devkit-base-components",
				"devkit-apiclient",
				"tailwindcss",
				"primeicons"
			], // Externalize Vue
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

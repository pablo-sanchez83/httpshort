import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
	},
	base: '/',
	build: {
		outDir: 'dist',
		assetsDir: 'assets',
		emptyOutDir: true,
		rollupOptions: {
			output: {
				manualChunks: undefined,
				assetFileNames: 'assets/[name].[ext]',
				entryFileNames: 'assets/[name].js'
			}
		}
	}
});

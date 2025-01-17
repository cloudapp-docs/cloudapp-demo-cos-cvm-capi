import { defineConfig } from 'vite';
import { resolve, basename } from 'path';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/public',
  build: {
    target: false,
    outDir: resolve(__dirname, '..', 'server/public'),
    assetsDir: 'console',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        format: 'iife',
        entryFileNames: `console/[name].js`,
        chunkFileNames: `console/[name].js`,
        assetFileNames: (asset) => {
          if (asset.name === 'index.css') {
            return `console/[name].[ext]`;
          }
          return `console/[name].[hash].[ext]`;
        },
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
    },
  },
  experimental: {
    renderBuiltUrl(filename: string, { hostType }) {
      if (hostType !== 'html') {
        return {
          runtime: `window.cloudapp.toCdnUrl(${JSON.stringify(
            basename(filename)
          )})`,
        };
      }
      return { relative: true };
    },
  },
  plugins: [react()],
});

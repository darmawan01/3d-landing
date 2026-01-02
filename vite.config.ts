
import { defineConfig } from 'vite';

export default defineConfig({
  define: {
    'process.env': process.env
  },
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    target: 'esnext',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  }
});

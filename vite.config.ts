import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ command, mode }) => {
  const isVercel = process.env.VERCEL === '1' || process.env.VITE_VERCEL === 'true';
  const isGHPages = mode === 'gh-pages';
  const base = isVercel ? '/' : isGHPages ? '/heladeriasaloha_madryn/' : '/';

  return {
    plugins: [tailwindcss(), react()],
    base,
    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.tsx', '.json'],
      dedupe: ['react', 'react-dom'],
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    optimizeDeps: {
      include: ['react', 'react-dom'],
    },
    build: {
      outDir: 'dist',
      sourcemap: command === 'build',
      assetsInlineLimit: 0,
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name].[hash][extname]',
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
        },
      },
    },
    server: {
      port: 3000,
      strictPort: false,
      open: true,
      // Avoid EBUSY crashes on Windows when assets are locked (OneDrive/AV)
      watch: {
        ignored: ['**/src/assets/**'],
        usePolling: true,
        interval: 1000,
      },
    },
    preview: {
      port: 3000,
      strictPort: false,
    },
  };
});

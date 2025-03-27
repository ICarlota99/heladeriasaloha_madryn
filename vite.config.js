import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import tailwindcss from "@tailwindcss/vite";
import path from 'path';
import { fileURLToPath } from 'url';
// import svgr from "vite-plugin-svgr";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: 'build',
  },
  base: '/heladeriasaloha_madryn/',
  esbuild: {
    loader: 'jsx'
  },
  plugins: [
    react(),
    // svgr({
    //   include: "**/*.svg?react"
    // }),
    // tailwindcss(),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    dedupe: ['react', 'react-dom'], // Prevent duplicate React instances
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom'], // Ensure these are pre-bundled by Vite
  },
});
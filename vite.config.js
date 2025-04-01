import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig(({ command, mode }) => {
  // Determine base path based on environment
  const isVercel = process.env.VERCEL === '1'
  const isGHPages = mode === 'gh-pages'
  const base = isVercel ? '/' : isGHPages ? '/heladeriasaloha_madryn/' : '/'

  return {
    plugins: [react()],
    base,
    esbuild: {
      loader: 'jsx',
      jsxInject: `import React from 'react'` // Ensure React is available in all files
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      dedupe: ['react', 'react-dom'],
      alias: {
        '@': path.resolve(__dirname, './src'),
        '~': path.resolve(__dirname, './public') // Add public folder alias
      }
    },
    optimizeDeps: {
      include: ['react', 'react-dom'],
      exclude: ['js-big-decimal']
    },
    build: {
      outDir: 'dist', // Standard Vite output directory
      sourcemap: command === 'build', // Generate sourcemaps for production
      assetsInlineLimit: 0, 
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name].[hash][extname]',
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js'
        }
      }
    },
    server: {
      port: 3000,
      strictPort: true,
      open: true,
      headers: {
        "Content-Type": "application/json"
      }
    },
    preview: {
      port: 3000,
      strictPort: true
    }
  }
})
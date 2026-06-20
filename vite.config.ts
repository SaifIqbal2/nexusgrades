import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import type { UserConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      host: 'localhost',
      port: 5174
    },
    middlewareMode: false,
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https: blob:; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https: ws: wss:; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests",
      'Cache-Control': 'public, max-age=3600, must-revalidate',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Resource-Policy': 'cross-origin'
    }
  },
  build: {
    minify: 'terser',
    sourcemap: false,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react')) {
            return 'react-vendor'
          }
          if (id.includes('node_modules/react-router-dom')) {
            return 'react-router'
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'lucide'
          }
          if (id.includes('node_modules/@supabase')) {
            return 'supabase'
          }
        }
      }
    },
    cssCodeSplit: true,
    chunkSizeWarningLimit: 500
  }
} as UserConfig)

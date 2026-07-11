import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: '/',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: env.VITE_API_PROXY_TARGET
      ? {
          proxy: {
            '/api': {
              target: env.VITE_API_PROXY_TARGET,
              changeOrigin: true,
              secure: false,
              // Бэкенд проверяет CORS по Origin и режет localhost — подменяем
              // Origin на адрес бэкенда, чтобы запрос выглядел same-origin.
              headers: {
                Origin: env.VITE_API_PROXY_TARGET,
              },
            },
          },
        }
      : undefined,
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom', 'react-router-dom'],
            'vendor-redux': ['@reduxjs/toolkit', 'react-redux'],
            'vendor-charts': ['recharts'],
            'vendor-ui': ['radix-ui', 'class-variance-authority', 'tailwind-merge', 'clsx', 'cmdk'],
            'vendor-misc': ['axios', 'zod', 'sonner', 'lucide-react'],
          },
        },
      },
    },
  }
})

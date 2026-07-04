import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  build: {
    target: 'es2022',
    // React en su propio chunk: cambia poco entre deploys (mejor caché del
    // navegador) y se descarga en paralelo con el código de la página.
    // Solo aplica al build de cliente; el bundle SSR va en un solo archivo.
    rollupOptions: isSsrBuild
      ? {}
      : {
          output: {
            // Forma de función: con la forma de objeto ['react-dom'] solo se
            // captura el entry principal del paquete, y la app importa
            // react-dom/client (entry aparte en React 19)
            manualChunks(id) {
              if (/node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id)) {
                return 'vendor'
              }
            },
          },
        },
  },
  esbuild: {
    legalComments: 'none',
  },
}))

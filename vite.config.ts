import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

console.log(import.meta.url)

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  build: {
    outDir: "./docs",
    assetsDir: './',
    rollupOptions: {
      output: {
        entryFileNames: "[name]-[hash].js",
        chunkFileNames: "[name]-[hash].js",
        assetFileNames: "[name]-[hash].[ext]"
      }
    }
  },
  server: {
    host: "0.0.0.0",
    port: 20000
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  define: {},
  plugins: [vue(), vueJsx()]
})

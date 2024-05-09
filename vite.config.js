import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        favourite_page: resolve(__dirname, 'pages/favourite_page/index.html'),
        want_to_buy_page: resolve(__dirname, 'pages/want_to_buy_page/index.html'),
        product_page: resolve(__dirname, 'pages/product_page/index.html'),
      },
    },
  },
})
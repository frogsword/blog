import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // root: path.resolve(__dirname, 'src'),
  // build: {
  //   outDir: '../dist'
  // },
  // server: {
  //   port: 5173
  // }
})



import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import * as path from "node:path";

export default defineConfig({
  plugins: [svelte()],
  base: './',
  build: {
    outDir: path.resolve(__dirname, "../../dist/nui")
  }
})
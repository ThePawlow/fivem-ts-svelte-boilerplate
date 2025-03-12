import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import * as path from "node:path";
import dotenv from 'dotenv'
dotenv.config({
  path: path.resolve(__dirname, '../.env')
})

export default defineConfig({
  plugins: [svelte()],
  base: './',
  build: {
    outDir: path.resolve(__dirname, "../" + process.env.OUTPUT_FOLDER + "/nui")
  }
})
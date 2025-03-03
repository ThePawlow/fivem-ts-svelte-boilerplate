import { defineConfig } from "vite";
import dotenv from 'dotenv'
dotenv.config()

export default defineConfig({
    resolve: {
        alias: {
            "@server": "/src/server",
            "@shared": "/src/shared"
        }
    },
    build: {
        minify: "terser",
        terserOptions: {
            mangle: false
        },
        target: "es2022",
        composite: true,
        outDir: process.env.OUTPUT_FOLDER + "/server",
        emptyOutDir: true,
        lib: {
            entry: "src/server/main.ts",
            formats: ["cjs"],
            fileName: () => "main.js",
        },
        rollupOptions: {
            external: ["@citizenfx/server"],
        },
        optimizeDeps: {
            include: ["reflect-metadata", "@nativewrappers/server"]
        },
        commonjsOptions: {
            transformMixedEsModules: true,
        }
    },
});
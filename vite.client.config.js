import { defineConfig } from "vite";
import dotenv from 'dotenv'
dotenv.config()

export default defineConfig({
    build: {
        resolve: {
            alias: {
                "@": "/src/client/**/*",
                "@shared": "/src/shared/**/*"
            }
        },
        minify: "terser",
        terserOptions: {
            mangle: false
        },
        target: "es2022",
        composite: true,
        outDir: process.env.OUTPUT_FOLDER + "/client",
        emptyOutDir: true,
        lib: {
            entry: "src/client/main.ts",
            formats: ["cjs"],
            fileName: () => "main.js",
        },
        rollupOptions: {
            external: ["@citizenfx/client"]
        },
        optimizeDeps: {
            include: ["reflect-metadata", "@nativewrappers/fivem"]
        },
        commonjsOptions: {
            transformMixedEsModules: true,
        }
    }
});
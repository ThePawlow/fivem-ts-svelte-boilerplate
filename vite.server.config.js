import { defineConfig } from "vite";

export default defineConfig({
    build: {
        resolve: {
            alias: {
                "@": "/src/server/**/*",
                "@shared": "/src/shared/**/*"
            }
        },
        minify: "terser",
        terserOptions: {
            mangle: false
        },
        target: "es2022",
        composite: true,
        outDir: "dist/server",
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
import { defineConfig } from "vite";

export default defineConfig({
    build: {
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
            include: ["reflect-metadata"]
        },
        commonjsOptions: {
            transformMixedEsModules: true,
        }
    },
});
import { defineConfig } from "vite";

export default defineConfig({
    build: {
        target: "es2022",
        composite: true,
        outDir: "dist/client",
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
            include: ["reflect-metadata"]
        },
        commonjsOptions: {
            transformMixedEsModules: true,
        }
    }
});
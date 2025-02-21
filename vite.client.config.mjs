import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
    build: {
        target: "node18",
        outDir: "dist/client",
        emptyOutDir: false,
        lib: {
            entry: path.resolve(__dirname, "src/client/main.ts"),
            formats: ["cjs"],
            fileName: () => "main.js",
        },
        rollupOptions: {
            external: ["@citizenfx/client"]
        },
        optimizeDeps: {
            include: ["reflect-metadata"]
        }
    }
});
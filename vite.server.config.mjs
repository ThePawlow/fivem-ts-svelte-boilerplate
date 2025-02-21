import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
    build: {
        target: "node18",
        outDir: "dist/server",
        emptyOutDir: false,
        lib: {
            entry: path.resolve(__dirname, "src/server/main.ts"),
            formats: ["cjs"],
            fileName: () => "main.js",
        },
        rollupOptions: {
            external: ["@citizenfx/server", "reflect-metadata"]
        },
        optimizeDeps: {
            include: ["reflect-metadata"],
        }
    },
});
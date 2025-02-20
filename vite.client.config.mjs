import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
    build: {
        target: "es2020",
        outDir: "dist/client",
        emptyOutDir: false,
        lib: {
            entry: path.resolve(__dirname, "src/client/main.ts"),
            formats: ["cjs"],
            fileName: () => "main.js",
        },
        rollupOptions: {
            external: ["@citizenfx/client"],
        },
    },
});
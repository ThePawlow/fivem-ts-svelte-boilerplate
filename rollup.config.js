import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import replace from "@rollup/plugin-replace";
import terser from "@rollup/plugin-terser";
import dynamicImportVariables from "@rollup/plugin-dynamic-import-vars";
import path from "path";
import copy from "rollup-plugin-copy";

const minifyFlag = false;

const copyStep = {
    input: "noop.js", // Fake input (Rollup requires one)
    plugins: [
        copy({
            targets: [
                { src: "assets/**/*", dest: "dist" }
            ],
            verbose: true,
            hook: "buildStart",
        }),
    ],
};

const clientBuild = {
    input: "./src/client/startup.ts",
    output: {
        file: "./dist/client/main.js",
        format: "esm",
        sourcemap: true
    },
    plugins: [
        resolve(),
        commonjs(),
        typescript(),
        replace({
            preventAssignment: true,
            values: {
                __dirname: JSON.stringify(path.resolve(".")),
                __filename: JSON.stringify(path.resolve("./src/client/startup.ts")),
            },
        }),
        minifyFlag && terser(),
    ],
};

const serverBuild = {
    input: "./src/server/startup.ts",
    output: {
        file: "./dist/server/main.js",
        format: "cjs",
        sourcemap: true,
    },
    target: "node22",
    makeAbsoluteExternalsRelative: true,
    external: [
        "@prisma/client",
        "buffer",
        "fs",
        "napi",
    ],
    plugins: [
        resolve({
            preferBuiltins: true,
        }),
        commonjs(),
        typescript(),
        replace({
            preventAssignment: true,
            values: {
                __dirname: JSON.stringify(path.resolve(".")),
                __filename: JSON.stringify(path.resolve("./src/server/startup.ts")),
            },
        }),
        dynamicImportVariables(),
        minifyFlag && terser(),
    ],
};

export default [clientBuild, serverBuild, copyStep];
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import replace from "@rollup/plugin-replace";
import terser from "@rollup/plugin-terser";
import dynamicImportVariables from "@rollup/plugin-dynamic-import-vars";
import fs from "fs-extra";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const minifyFlag = false;

const corePath = "resources/[local]/core";
const excludedPaths = [];
const filesToRandomize = [];

function deleteFilesRecursively(dirPath) {
    let deleteFolder = true;
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
        const filePath = path.join(dirPath, file);
        const fileStat = fs.lstatSync(filePath);

        if (fileStat.isDirectory()) {
            const excludedPathsContains = excludedPaths.some((excludedPath) => {
                if (filePath === path.join(corePath, excludedPath)) {
                    return true;
                }
            });
            if (!excludedPathsContains) {
                const res = deleteFilesRecursively(filePath);
                deleteFolder = deleteFolder && res;
            } else {
                console.log(`Skipping deletion for Folder: ${filePath}`);
                deleteFolder = false;
            }
        } else {
            // Überspringe `.lua`-Dateien
            if (file.endsWith(".lua")) {
                console.log(`Skipping deletion for .lua file: ${filePath}`);
                deleteFolder = false;
            } else {
                fs.rmSync(filePath);
            }
        }
    }
    if (deleteFolder) {
        fs.rmdirSync(dirPath);
    }
    return deleteFolder;
}

function randomizeSharedContent(randomzieFilePath) {
    const content = fs.readFileSync(randomzieFilePath, "utf8");
    const regex = /'([^']*)'/g;
    let match;
    const values = [];

    while ((match = regex.exec(content))) {
        if (!minifyFlag || match[0].length < 10) {
            values.push(match[0]);
        }
    }

    let newContent = content;
    values.forEach((value) => {
        newContent = newContent.replace(value, `'${uuidv4()}'`);
    });

    if (values.length > 0) {
        fs.writeFileSync(randomzieFilePath, newContent, "utf8");
    }

    console.log(
        `Randomized values in ${
            new RegExp(/\/([^/]+)$/).exec(randomzieFilePath)[0]
        }: ${values.length}`
    );
}

if (fs.existsSync(corePath)) {
    deleteFilesRecursively(corePath);
}

filesToRandomize.forEach((fPath) => {
    randomizeSharedContent(fPath);
});

const banner = `
  const { resolve, join } = require("path");
  const { cwd } = require("process");

  var __dirname = resolve();
  var __filename = join(__dirname, "index.js");

  process.env["PRISMA_QUERY_ENGINE_BINARY"] = join(cwd(), "resources", "lib", "prisma-orm", "prisma", "generated", "query-engine-windows.exe");
`;
export default [
    {
        input: "./src/core/client/startup.ts",
        output: {
            file: "./resources/[local]/core/client.js",
            format: "esm",
            sourcemap: true,
            banner,
        },
        plugins: [
            resolve(),
            commonjs(),
            typescript(),
            replace({
                preventAssignment: true,
                values: {
                    __dirname: JSON.stringify(path.resolve(".")),
                    __filename: JSON.stringify(path.resolve("./src/core/client/startup.ts")),
                },
            }),
            minifyFlag && terser(),
        ],
    },
    {
        input: "./src/core/server/startup.ts",
        output: {
            file: "./resources/[local]/core/server.js",
            format: "cjs",
            sourcemap: true,
        },
        target: "node22",
        makeAbsoluteExternalsRelative: true,
        external: [
            "@prisma/client",
            "buffer",
            "fs",
            "napi"
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
                    __filename: JSON.stringify(path.resolve("./src/core/server/startup.ts")),
                },
            }),
            dynamicImportVariables(),
            minifyFlag && terser(),
        ],
    },
];
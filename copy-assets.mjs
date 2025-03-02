import fs from "fs";
import path from "path";

const assetDir = path.join(process.cwd(), "assets");
const destDir = path.join(process.cwd(), "dist");

fs.mkdirSync(destDir, { recursive: true });
fs.cpSync(assetDir, destDir, { recursive: true });

console.log(`Copied ${assetDir} -> ${destDir}`);
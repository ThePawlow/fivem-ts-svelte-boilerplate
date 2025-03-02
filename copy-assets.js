import fs from "fs";
import path from "path";
import dotenv from 'dotenv'
dotenv.config()

const assetDir = path.join(process.cwd(), "assets");
const destDir = process.env.OUTPUT_FOLDER

fs.mkdirSync(destDir, { recursive: true });
fs.cpSync(assetDir, destDir, { recursive: true });

console.log(`Copied ${assetDir} -> ${destDir}`);
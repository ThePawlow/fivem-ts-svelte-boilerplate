import chokidar from "chokidar";
import fs from "fs";
import path from "path";

const assetDir = path.join(process.cwd(), "assets");
const destDir = path.join(process.cwd(), "dist");

function copyFile(filePath) {
  const relativePath = path.relative(assetDir, filePath);
  const targetPath = path.join(destDir, relativePath);
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.copyFileSync(filePath, targetPath);
  console.log(`Copied: ${filePath} -> ${targetPath}`);
}

function removeFile(filePath) {
  const relativePath = path.relative(assetDir, filePath);
  const targetPath = path.join(destDir, relativePath);
  if (fs.existsSync(targetPath)) {
    fs.unlinkSync(targetPath);
    console.log(`Deleted file: ${targetPath}`);
  }
}

function copyDirectory(dirPath) {
  const relativePath = path.relative(assetDir, dirPath);
  const targetPath = path.join(destDir, relativePath);
  fs.mkdirSync(targetPath, { recursive: true });
  console.log(`Created directory: ${targetPath}`);
}

function removeDirectory(dirPath) {
  const relativePath = path.relative(assetDir, dirPath);
  const targetPath = path.join(destDir, relativePath);
  if (fs.existsSync(targetPath)) {
    fs.rmdirSync(targetPath, { recursive: true });
    console.log(`Deleted directory: ${targetPath}`);
  }
}

console.log(`Watching ${assetDir} for changes...`);

chokidar.watch(assetDir, { persistent: true }).on("all", (event, filePath) => {
  if (event === "add" || event === "change") {
    copyFile(filePath);
  } else if (event === "unlink") {
    removeFile(filePath);
  } else if (event === "addDir") {
    copyDirectory(filePath);
  } else if (event === "unlinkDir") {
    removeDirectory(filePath);
  }
});
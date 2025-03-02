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
  console.log(`Copied ${filePath} -> ${targetPath}`);
}

function removeFile(filePath) {
  const relativePath = path.relative(assetDir, filePath);
  const targetPath = path.join(destDir, relativePath);
  if (fs.existsSync(targetPath)) {
    fs.unlinkSync(targetPath);
    console.log(`Deleted ${targetPath}`);
  }
}

console.log(`Watching ${assetDir} for changes...`);

chokidar.watch(assetDir, { persistent: true }).on("all", (event, filePath) => {
  if (event === "add" || event === "change") {
    copyFile(filePath);
  } else if (event === "unlink") {
    removeFile(filePath);
  }
});
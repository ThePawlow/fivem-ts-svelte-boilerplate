import chokidar from "chokidar";
import { execSync } from "child_process";
import fs from "fs";

// Configuration of folders to watch
const watchers = [
    {
        key: "server",
        path: "./src/server",
        buildCmd: "vite build --config vite.server.config.js --logLevel=silent"
    },
    {
        key: "client",
        path: "./src/client",
        buildCmd: "vite build --config vite.client.config.js --logLevel=silent"
    },
    {
        key: "nui",
        path: "./src/nui",
        buildCmd: "cd src/nui && vite build --emptyOutDir --logLevel=silent"
    },
    {
        key: "assets",
        path: "./assets",
        buildCmd: "node --experimental-modules copy-assets.js"
    }
];

// Global variables for processing
const pendingBuilds = new Set();
let debounceTimer;
const DEBOUNCE_DELAY = 1000;

// Function to execute builds
function executeBuilds() {
    console.log("📦 Executing pending builds...");
    let hasError = false;
    for (const key of pendingBuilds) {
        const watcher = watchers.find(w => w.key === key);
        if (!watcher) continue;

        console.log(`🔨 Building ${key}...`);
        try {
            execSync(watcher.buildCmd, { stdio: 'inherit' });
            console.log(`✅ ${key} build completed.`);
        } catch (error) {
            hasError = true;
            console.error(`❌ Error during ${key} build:`, error.message);
        }
    }

    // Execute global script after all builds
    if (pendingBuilds.size > 0) {
        try {
            if (!hasError) {
                console.log("🔨 Executing global script...");
                execSync("node reconnect.js", { stdio: 'inherit' });
                console.log("✅ Global script completed.");
            }
        } catch (error) {
            console.error("❌ Error during global script execution:", error.message);
        }
    }

    pendingBuilds.clear();
}

// Configuration and starting watchers
for (const watcher of watchers) {
    console.log(`👀 Watching ${watcher.path}...`);

    // Check that the directory exists
    if (!fs.existsSync(watcher.path)) {
        console.warn(`⚠️ Directory ${watcher.path} does not exist and will not be watched.`);
        continue;
    }

    // Create individual watcher per directory to avoid problems
    const watch = chokidar.watch(watcher.path, {
        persistent: true,
        ignoreInitial: true,
        usePolling: true,  // Important for Windows
        interval: 100,
        binaryInterval: 300,
        awaitWriteFinish: {
            stabilityThreshold: 300,
            pollInterval: 100
        }
    });

    // Handle change events
    watch.on('all', (event, filePath) => {
        console.log(`📄 [${watcher.key}] Change detected: ${event} on ${filePath}`);
        pendingBuilds.add(watcher.key);

        // Debouncing to limit the number of builds
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(executeBuilds, DEBOUNCE_DELAY);
    });
}

// Initial build
console.log("🚀 Starting initial build...");
watchers.forEach(w => pendingBuilds.add(w.key));
executeBuilds();

console.log("⏳ Waiting for changes...");
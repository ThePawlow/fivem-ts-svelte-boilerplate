import shutil
import os
import subprocess
import sys

def delete_dir_recursive(directory_path):
    print("📁 Deleting files from {}".format(directory_path))
    try:
        with os.scandir(directory_path) as entries:
            for entry in entries:
                if entry.is_file():
                    os.unlink(entry.path)
                else:
                    shutil.rmtree(entry.path)
        print("✅ All files and subdirectories deleted successfully.")
    except OSError:
        print("⛔ Error occurred while deleting files and subdirectories.")

def copytree(src, dst, symlinks=False, ignore=None):
    print("📁 Copying files from {} to {}".format(src, dst))
    for item in os.listdir(src):
        s = os.path.join(src, item)
        d = os.path.join(dst, item)
        if os.path.isdir(s):
            shutil.copytree(s, d, symlinks, ignore)
        else:
            shutil.copy2(s, d)

OUTPUT: str = sys.argv[1]
RESOURCE_NAME: str = sys.argv[2]
ROOT_FOLDER = os.getcwd()
if len(sys.argv) > 3:
    ROOT_FOLDER: str = sys.argv[3]

ASSET_FOLDER = f"{ROOT_FOLDER}/assets"
DEST_FOLDER = f"{ROOT_FOLDER}/dist"
NUI_FOLDER = f"{ROOT_FOLDER}/src/nui"

# Building Project
os.makedirs(DEST_FOLDER, exist_ok=True)
print("🔨 Building {}".format(OUTPUT))
for config in ["server", "client"]:
    subprocess.run(["sudo", "yarn", "vite", "build", "--config", f"vite.{config}.config.mjs"])

print("🔨 Building NUI from {}".format(NUI_FOLDER))
subprocess.run(["yarn", "build"], cwd=NUI_FOLDER, check=True)
print("✅ Done building!")

# Copying assets over
copytree(ASSET_FOLDER, DEST_FOLDER)
# Copying dest to resource name
FINAL = os.path.join(OUTPUT, RESOURCE_NAME)
os.makedirs(FINAL, exist_ok=True)
print("🔨 Clearing {}".format(FINAL))
delete_dir_recursive(FINAL)
copytree(DEST_FOLDER, FINAL)

print("✅ Done!")
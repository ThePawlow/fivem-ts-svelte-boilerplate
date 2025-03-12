# FiveM - TypeScript meets Modularity with Svelte5 in a dockerized FxServer
# ✨ Features
**Blazing-Fast Build Pipeline** - With Instant Change Detection! ⚡ <br>
**Svelte 5** - For Next-Level Performance 🚀 <br>
**Seamless Database** - Using Prisma ✨ <br>
**Plug & Play Simplicity** – Fully Dockerized! 🐳 <br>
**Optimized Architecture** – Bundled Server & Client with a Shared Core 📦 <br>
**Powerful & Scalable** – Clean Dependency Injection via Inversify 🏗️ <br>
**Consistent & OOP-Driven** – Leveraging [NativeWrappers](https://github.com/nativewrappers/nativewrappers) for Seamless Integration 🔥 <br>

## 🎯 Getting Started
```
pnpm install
pnpm prisma generate # Generating Database Client
pnpm run build # Building code base
# If you want your FXServer to be dockerized 🐋
docker compose up
```
## 💡 Understanding
### Structure
**Serverside** under *src/server*

**Clientside** under *src/client*

**Shared** under *src/shared**<br>
*make sure you only import content that is available on both sides. One hint is the **API set: shared** visible at the top right of https://docs.fivem.net/natives.

![shared api set](https://i.imgur.com/Br6lLer.png)

**NUI** under *src-nui*
### Dependency Injection (Inversify)
**Why?**<br>Your code doesn’t create dependencies directly. Instead, it requests them, and Inversify provides the right ones at the right time.
This approach makes your code more flexible, easier to test, and better organized.

Check out the official example https://inversify.io/docs/introduction/getting-started/
## ✏️ Contributing
Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## 💼 License
[MIT](https://choosealicense.com/licenses/mit/)

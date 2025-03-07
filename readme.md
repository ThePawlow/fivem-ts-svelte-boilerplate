# FiveM - TypeScript Meets DependencyInjection and Svelte
# ✨ Features
- Bundling into server/ client with a shared folder.
- Dependency Injection with Inversify
- Making use of nativewrappers https://github.com/nativewrappers/nativewrappers for a consistent object oriented approach.
## 🎯 Getting Started
```
pnpm run build
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

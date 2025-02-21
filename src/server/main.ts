import 'reflect-metadata';
import { container } from "./container";
import { PlayerController } from "./controllers/PlayerController";

console.log("FiveM TypeScript server is starting...");

// Retrieve controller from Inversify
const playerController = container.get<PlayerController>(PlayerController);

// FiveM event handling
on("playerConnecting", (name: string) => {
    playerController.onPlayerConnecting(name);
});

on("onResourceStart", (resourceName: string) => {
    if (GetCurrentResourceName() !== resourceName) return;
    console.log(`[Server]: Resource ${resourceName} started!`);
});

on("onResourceStop", (resourceName: string) => {
    if (GetCurrentResourceName() !== resourceName) return;
    console.log(`[Server]: Resource ${resourceName} stopped!`);
});

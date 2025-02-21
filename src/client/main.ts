import 'reflect-metadata';
import { container } from "./container";
import {DebugController} from "./controllers/DebugController";

console.log("Resource is starting...");

// Retrieve controller from Inversify
const debugController = container.get<DebugController>(DebugController);

// FiveM event handling
on("gameEventTriggered", (name: string) => {
    debugController.onPlayerConnecting(name);
});
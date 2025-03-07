import 'reflect-metadata';
import { container } from "./container";
import { PlayerController } from "./controllers/PlayerController";
import {LogService} from "../shared/services/LogService";
import {Events} from "@nativewrappers/server";

const logger = container.get<LogService>(LogService);
const playerController = container.get<PlayerController>(PlayerController);

Events.on("playerConnecting", (name: string) => {
    logger.log(`Player connected with name ${name}`);
})

Events.on("playerDisconnected", (name: string) => {
    logger.log(`Player disconnected with name ${name}`);
})

logger.log("Server is starting...");
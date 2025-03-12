import 'reflect-metadata';
import { container } from "./container";
import { PlayerController } from "./controllers/PlayerController";
import { LogService } from "../shared/services/LogService";
import { Events } from "@nativewrappers/server";
import { DatabaseController } from './controllers/DatabaseController';

const logger = container.get(LogService);
const dbController = container.get(DatabaseController);
const playerController = container.get(PlayerController)

logger.log(dbController.Client.account.count.toString())

Events.on("playerConnecting", (name: string) => {
    playerController.onPlayerConnecting(name);
})

logger.log("Server is starting...");
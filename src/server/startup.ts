import 'reflect-metadata';
import { container } from "./container";
import { PlayerController } from "./controllers/PlayerController";
import {LogService} from "../shared/services/LogService";
import {Events} from "@nativewrappers/server";
import { PRISMA } from './DBContext';

const logger = container.get<LogService>(LogService);
const playerController = container.get<PlayerController>(PlayerController);

logger.log("Server is starting...");

Events.on("playerConnecting", (name: string) => {
    logger.log(`Player connected with name ${name}`);
})

Events.on("playerDisconnected", (name: string) => {
    logger.log(`Player disconnected with name ${name}`);
})

async function checkConnection() {
    try {
      await PRISMA.$connect();
      logger.log('Prisma client is connected');
    } catch (error) {
        logger.log(`Error connecting to Prisma - Error: ${error}`);
        if (error.toString().includes('PrismaClientInitializationError')) {
            logger.log("Fatal error. No Database Connection");
        }
    } finally {
      await PRISMA.$disconnect(); // Don't forget to disconnect when done
    }
  }

Events.on("onServerResourceStart", async (resourceName: string) => {
  if(resourceName !== GetCurrentResourceName()) return;

  await checkConnection()

  const PlayersRegistered = await PRISMA.account.count();
  logger.log(PlayersRegistered.toString())

  logger.log("Server started...")
});


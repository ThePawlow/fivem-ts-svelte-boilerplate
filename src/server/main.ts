import { container } from "../shared/ServiceContainer";
import { StartupModule } from "./Module.StartUp";
import { LoggerService } from "./services/LoggerService";

// Register Services
container.register("logger", new LoggerService());
//container.register("database", new DatabaseService());

// Initialize Modules
const startupModule = new StartupModule();

// // FiveM Events Example
on("playerConnecting", (name: string, setKickReason: (reason: string) => void, deferrals: any) => {
    const logger = container.resolve<LoggerService>("logger");
    logger.log(`${name} is connecting...`);
});
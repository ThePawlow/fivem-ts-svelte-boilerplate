import { container } from "../shared/ServiceContainer";
import { LoggerService } from "./services/LoggerService";

export class StartupModule {
    private logger: LoggerService;

    constructor() {
        this.logger = container.resolve<LoggerService>("logger");
    }

    Start() {
        this.logger.log("Starting up FiveM Server.")
    }
}
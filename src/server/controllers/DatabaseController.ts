import { inject, injectable } from "inversify";
import { LogService } from "../../shared/services/LogService";
import { PrismaClient } from "@prisma/client";

@injectable()
export class DatabaseController {
    public readonly Client: PrismaClient

    constructor(
        @inject(LogService)
        private logService: LogService
    ) {
        this.Client = new PrismaClient({
            log: ["query", "error", "warn", "info"],
        });

        this.logService.log("Created Client")
    }
}
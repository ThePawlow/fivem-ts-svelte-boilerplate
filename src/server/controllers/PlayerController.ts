import { inject, injectable } from "inversify";
import { TYPES } from "../interfaces";
import { LogService } from "../services/LogService";

@injectable()
export class PlayerController {
    constructor(@inject(TYPES.LogService) private logService: LogService) {}

    onPlayerConnecting(name: string) {
        this.logService.log(`Player ${name} is connecting...`);
    }
}
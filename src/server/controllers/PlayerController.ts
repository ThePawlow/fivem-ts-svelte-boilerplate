import { inject, injectable } from "inversify";
import {LogService} from "../../shared/services/LogService";

@injectable()
export class PlayerController {
    constructor(
        @inject(LogService)
        private logService: LogService
    ) {}

    onPlayerConnecting(name: string) {
        this.logService.log(`Player ${name} is connecting...`);
    }
}
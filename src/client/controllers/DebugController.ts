import { inject, injectable } from "inversify";
import {LogService} from "../../shared/services/LogService";

@injectable()
export class DebugController {
    constructor(
        @inject(LogService)
        private logService: LogService
    ) {}

    onPlayerConnecting(name: string) {
        this.logService.log(`Player triggered Event: ${name}`);
    }
}
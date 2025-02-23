import { injectable } from "inversify";

@injectable()
export class LogService {
    log(message: string) {
        console.log(`[Server Log]: ${message}`);
    }
}
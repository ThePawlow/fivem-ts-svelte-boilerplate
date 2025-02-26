import { Container } from 'inversify';
import {LogService} from "../shared/services/LogService";
import {DebugController} from "./controllers/DebugController";
import {NUIController} from "./controllers/NUIController";

const container: Container = new Container();

container.bind(LogService).toSelf();

container.bind(NUIController).toSelf();
container.bind(DebugController).toSelf();
export { container };
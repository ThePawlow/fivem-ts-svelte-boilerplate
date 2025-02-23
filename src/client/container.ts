import { Container } from 'inversify';
import {LogService} from "../shared/services/LogService";
import {DebugController} from "./controllers/DebugController";

const container: Container = new Container();

container.bind(LogService).toSelf();

container.bind(DebugController).toSelf();
export { container };
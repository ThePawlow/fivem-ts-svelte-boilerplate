import { Container } from 'inversify';
import { PlayerController } from "./controllers/PlayerController";
import {LogService} from "../shared/services/LogService";

const container: Container = new Container();

container.bind(LogService).toSelf();
container.bind(PlayerController).toSelf();
export { container };
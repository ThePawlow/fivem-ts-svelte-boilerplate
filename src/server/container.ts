import { Container } from 'inversify';
import { PlayerController } from "./controllers/PlayerController";
import { DatabaseController } from "./controllers/DatabaseController";
import { LogService } from "../shared/services/LogService";

const container: Container = new Container();

// Services
// First before Controllers
container.bind(LogService).toSelf();

// Controllers
container.bind(DatabaseController).toSelf();
container.bind(PlayerController).toSelf();

export { container };
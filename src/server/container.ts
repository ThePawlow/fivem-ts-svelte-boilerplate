
import { Container, inject, injectable } from 'inversify';
import { LogService } from "./services/LogService";
import { TYPES } from "./interfaces";
import { PlayerController } from "./controllers/PlayerController";

const container = new Container();

// Bind services
container.bind<LogService>(TYPES.LogService).to(LogService);

// Bind controllers
container.bind<PlayerController>(TYPES.PlayerController).to(PlayerController);

export { container };
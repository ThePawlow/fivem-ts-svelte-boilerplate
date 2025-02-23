import 'reflect-metadata';
import { container } from "./container";
import {DebugController} from "./controllers/DebugController";
import {Game, Model, Vehicle, VehicleSeat, World} from "@nativewrappers/fivem";
import {LogService} from "../shared/services/LogService";

const logger = container.get<LogService>(LogService);
const debugController = container.get<DebugController>(DebugController);

on("gameEventTriggered", (name: string) => {
    debugController.onPlayerConnecting(name);
});

RegisterCommand(
    "adder",
    async (source, args) => {
        const playerCoords = Game.PlayerPed.Position;
        const vehicle = await World.createVehicle(
            new Model("adder"),
            playerCoords,
            4,
        );
        if (vehicle instanceof Vehicle) {
            Game.PlayerPed.setIntoVehicle(vehicle, VehicleSeat.Driver);
            logger.log(`Spawned Adder for ${Game.Player.Name}`)
        }
    },
    false,
);

logger.log("Resource started.");
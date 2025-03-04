import 'reflect-metadata';
import { container } from "./container";
import { DebugController } from "./controllers/DebugController";
import { Game, Model, Vehicle, VehicleSeat, World } from "@nativewrappers/fivem";
import { LogService } from "../shared/services/LogService";
import { NUIController } from "./controllers/NUIController";

const logger = container.get<LogService>(LogService);
const debugController = container.get<DebugController>(DebugController);
const nuiController = container.get<NUIController>(NUIController);

on("gameEventTriggered", (name: string, ...args: any[]) => {
    logger.log(`Player triggered Event: ${name}`);
    for (const arg of args) {
        logger.log(`    Arg: ${arg}`);
    }
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

RegisterCommand(
    "showNUI",
    async (source, args) => {
        nuiController.Show();
    },
    false,
);

RegisterCommand(
    "hideNUI",
    async (source, args) => {
        nuiController.Hide();
    },
    false,
);

RegisterCommand(
    "toggleNUI",
    async (source, args) => {
        nuiController.Toggle();
    },
    false,
);

nuiController.RegisterNuiCallback("NUIControllerCloseUI", (_, cb) => {
    nuiController.Hide();
    logger.log("NUI was closed by user.");
    cb({ success: true });
});
logger.log("Resource started.");
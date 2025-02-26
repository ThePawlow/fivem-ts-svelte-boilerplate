import { inject, injectable } from "inversify";
import {LogService} from "../../shared/services/LogService";

@injectable()
export class NUIController {
    private _isVisible: boolean = false;

    constructor(
        @inject(LogService)
        private logService: LogService
    ) {}

    public get IsVisible(): boolean {
        return this._isVisible;
    }
    
    private setNuiState(state: boolean): void {
        SetNuiFocus(state, state);
        SendNUIMessage({ event: "showUI", show: state });
        this._isVisible = state;

        this.logService.log(`NUI Visibility changed: ${state}`);
    }

    public Show(): void {
        if (!this._isVisible) this.setNuiState(true);
    }

    public Hide(): void {
        if (this._isVisible) this.setNuiState(false);
    }

    public Toggle(): void {
        this.setNuiState(!this._isVisible);
    }
}
type DebugEvent<T = unknown> = {
    action: string;
    data: T;
    delay?: number;
}
type DebugEventArg<T = unknown> = Omit<DebugEvent<T>, 'action'>;
type NUIListener<T = unknown> = (data: T) => void;
const resourceName = (window as any).GetParentResourceName();

export class NUIController {
    private static listeners = new Map<string, NUIListener<any>[]>();
    public static get isEnvBrowser() {
        return !(window as any).invokeNative;
    }
    static on<T = unknown>(action: string, listener: NUIListener<T>, debugEvents?: DebugEventArg<T>[] | DebugEventArg<T>) {
        const listeners = this.listeners.get(action) || [];
        listeners.push(listener);
        this.listeners.set(action, listeners);
        if (this.isEnvBrowser && debugEvents) {
            if (!Array.isArray(debugEvents)) {
                debugEvents = [debugEvents];
            }
            for (const debugEvent of (debugEvents as DebugEvent<T>[])) {
                debugEvent.action = action;
                if (debugEvent.delay) {
                    setTimeout(() => {
                        this.processEvents(debugEvent);
                    }, debugEvent.delay);
                } else {
                    this.processEvents(debugEvent);
                }
            }
        }
    }

    static off<T = unknown>(action: string, listener: NUIListener<T>) {
        const listeners = this.listeners.get(action) || [];
        const index = listeners.indexOf(listener);
        if (index !== -1) {
            listeners.splice(index, 1);
        }
    }

    static once<T = unknown>(action: string, listener: NUIListener<T>, debugEvents?: DebugEvent<T>[]) {
        const onceListener: NUIListener<T> = (data) => {
            this.off(action, onceListener);
            return listener(data);
        }
        this.on(action, onceListener, debugEvents);
    }

    static emit<T = unknown>(action: string, data?: T, debugEmit?: any) {
        console.log(`Emitting event: ${action} with data: ${JSON.stringify(data, null, 2)}`);
        if (this.isEnvBrowser) {
           if (debugEmit) {
               return new Response(debugEmit);
           } 
           return;
        }
        return fetch(`https://${resourceName}/${action}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(data)
        });
    }

    static processEvents(event: MessageEvent | DebugEvent) {
        const { action, data } = event.data;
        const listener = this.listeners.get(action);
        if (listener) {
            console.log(`Received event: ${action} with data: ${JSON.stringify(data, null, 2)}`);
            listener.forEach((cb) => cb(data));
        } else {
            console.warn(`No listener for action: ${action}`);
        }
    }
}
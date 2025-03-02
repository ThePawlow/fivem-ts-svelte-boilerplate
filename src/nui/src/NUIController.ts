type NUIListener<T = unknown> = (data: T) => void;
const resourceName = (window as any).GetParentResourceName();

export class NUIController {
    private static listeners = new Map<string, NUIListener<any>[]>();

    static on<T = unknown>(action: string, listener: NUIListener<T>) {
        const listeners = this.listeners.get(action) || [];
        listeners.push(listener);
        this.listeners.set(action, listeners);
    }

    static off<T = unknown>(action: string, listener: NUIListener<T>) {
        const listeners = this.listeners.get(action) || [];
        const index = listeners.indexOf(listener);
        if (index !== -1) {
            listeners.splice(index, 1);
        }
    }

    static once<T = unknown>(action: string, listener: NUIListener<T>) {
        const onceListener: NUIListener<T> = (data) => {
            this.off(action, onceListener);
            return listener(data);
        }
        this.on(action, onceListener);
    }

    static emit<T = unknown>(action: string, data?: T) {
        console.log(`Emitting event: ${action} with data: ${JSON.stringify(data, null, 2)}`);
        return fetch(`https://${resourceName}/${action}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(data)
        });
    }

    static processEvents(event: MessageEvent) {
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
class ServiceContainer {
    private services: Map<string, any> = new Map();

    register<T>(name: string, instance: T) {
        this.services.set(name, instance);
    }

    resolve<T>(name: string): T {
        const service = this.services.get(name);
        if (!service) throw new Error(`Service ${name} not found`);
        return service;
    }
}

export const container = new ServiceContainer();
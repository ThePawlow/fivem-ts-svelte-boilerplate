# NUIController for Svelte/FiveM

## Introduction

The `NUIController` class is a utility for handling NUI (Native User Interface) interactions in FiveM using Svelte. It provides a structured way to manage event listeners, send events to the game client, and debug events in a browser environment.

## Features
- **Event Handling**: Register, unregister, and trigger events from the NUI side.
- **Debugging Support**: Simulate event triggers in a browser environment for testing.
- **One-time Listeners**: Register events that automatically unregister after being triggered once.
- **Emit Events**: Send data to the FiveM client using HTTP POST requests.

## Usage

### Basics
#### Registering an Event Listener
```ts
NUIController.on('myEvent', (data) => {
    console.log('Received data:', data);
});
```

#### Unregistering an Event Listener
```ts
const myListener = (data) => console.log('Received:', data);
NUIController.on('testEvent', myListener);
NUIController.off('testEvent', myListener);
```

#### Registering a One-Time Event Listener
```ts
NUIController.once('singleEvent', (data) => {
    console.log('This will only trigger once:', data);
});
```

#### Emitting an Event to the Server
```ts
NUIController.emit('sendData', { key: 'value' });
```
### Debug (in browser)
These tricks are meant to mock data when working in the browser using `yarn dev:browser` script.
#### Debugging Events in a Browser
```ts
NUIController.on('debugEvent', (data) => {
    console.log('Debug event received:', data); // { test : true }
}, { data: { test: true }, delay: 1000 });
```

#### Debugging emit in a Browser
```ts
NUIController.emit('debugEmit', { success: true });
```

## Code Breakdown

### Class Structure
- **Static Properties**:
  - `initialized`(private): Tracks whether the controller has been initialized.
  - `listeners`(private): Stores event listeners mapped by action names.
  - `isEnvBrowser`: Determines if the environment is a browser.

- **Static methods**:
  - `on(action, listener, debugEvents?)`: Registers an event listener.
  - `off(action, listener)`: Unregisters an event listener.
  - `once(action, listener, debugEvents?)`: Registers a listener that removes itself after being triggered.
  - `emit(action, data, debugEmit?)`: Sends an event to the game client.
  - `processEvents(event)`(private): Handles incoming messages from the game client.
  - `init()`(private): Initializes event listeners for NUI events.

## Conclusion

The `NUIController` simplifies communication between NUI and the FiveM client. By offering robust event handling and debugging capabilities.


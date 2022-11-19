# Isaac Achievement Hunter

## Who am I?

This app was designed to track Steam Achievements, with a simple UI and filter function.

This app uses the Binding of Isaac Wiki and 2 seperate Steam API endpoints to collate all the data into a single table.

## How to use?

### Simple usage:

Firstly install the application from the msi file, then launch the application.

For personalised results, you will require your Steam User ID. You can get this ID from your Steam profile's URL e.g. https://steamcommunity.com/profiles/{STEAM ID HERE}/.

If you have a custom Steam URL, you may need to use a tool like Steam DB to get your ID.

> **OPTIONAL**: You can include your own Steam API key in the call, but this isn't required.

### Custom usage:

You can run your own build of the application by using Git Clone and changing parts you want:

```
npm start
```

This command runs a development server and functional application interface to develop on.

```
npm run build
```

This command builds the React application and creates an exectuable built by Tauri.

> **Requirements**: Rust and all NPM dependencies must be installed, including Windows Dev tools with C++ Development tools.

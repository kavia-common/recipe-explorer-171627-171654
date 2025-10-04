# Lightweight React Template for KAVIA

This project provides a minimal React template with a clean, modern UI and minimal dependencies.

## Features

- **Lightweight**: No heavy UI frameworks - uses only vanilla CSS and React
- **Modern UI**: Clean, responsive design with KAVIA brand styling
- **Fast**: Minimal dependencies for quick loading times
- **Simple**: Easy to understand and modify

## Getting Started

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Environment & Mock Mode

The app includes a safe configuration layer that supports a mock API fallback to keep the UI usable even without a backend.

Environment variables (Create React App format):
- REACT_APP_API_BASE_URL
  - Base URL of your backend API.
  - If not set, the app automatically enables mock mode.
  - Default used in code if missing: http://localhost:4000
- REACT_APP_API_MOCK
  - Optional override. Set to "true" to force mock mode even if a base URL is provided.
  - Any other value is ignored.

How mock mode is determined:
- Mock Mode is ON when REACT_APP_API_MOCK === "true" OR REACT_APP_API_BASE_URL is not set.
- In development, a small non-intrusive banner appears in the top-right corner when mock mode is active.

Examples:
- Use real API:
  - .env
    REACT_APP_API_BASE_URL=https://api.example.com
- Force mocks regardless of base URL:
  - .env
    REACT_APP_API_BASE_URL=https://api.example.com
    REACT_APP_API_MOCK=true
- Rely on default localhost base URL but still use mocks until you set the var:
  - .env (empty or missing entries)
    # No variables set — mock mode will be auto-enabled

Tip: Copy .env.example to .env and set values as needed (create one if it doesn't exist).

## Customization

### Colors

The main brand tokens are defined as CSS variables in `src/theme.css` and `src/styles/ocean.css`.

### Components

This template uses pure HTML/CSS components instead of a UI framework. You can find component styles primarily in `src/styles/ocean.css`.

Common components include:
- Buttons (`.btn`, `.btn.ghost`)
- Container (`.container`)
- Navigation (`.navbar`)
- Grid helpers (`.grid.cols-1`, `.grid.cols-3`)
- Modal (`.modal`, `.modal-backdrop`)

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

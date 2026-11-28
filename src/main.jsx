import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const container = document.getElementById("root");

const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// The build prerenders the app into #root, so hydrate that markup when it is
// there and fall back to a normal client render otherwise (e.g. `vite dev`).
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}

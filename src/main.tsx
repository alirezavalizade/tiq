import React from "react";
import ReactDOM from "react-dom/client";
import AppProviders from "./contexts/AppProviders.tsx";
import App from "./App.tsx";
import "./index.css";

async function main() {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <AppProviders>
        <App />
      </AppProviders>
    </React.StrictMode>,
  );
}

main();

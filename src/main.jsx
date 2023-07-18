import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import ErrorBoundary from "./ErrorBoundary.jsx";
import FallbackComponent from "./FallbackComponent.jsx";
import Routing from "./Routing.jsx";
import "./App.less";
import ConfigProviderSidos from "./ConfigProviderSidos.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProviderSidos>
      <BrowserRouter>
        <ErrorBoundary fallback={<FallbackComponent />}>
          <Sidebar>
            <Routing />
          </Sidebar>
        </ErrorBoundary>
      </BrowserRouter>
    </ConfigProviderSidos>
  </React.StrictMode>
);

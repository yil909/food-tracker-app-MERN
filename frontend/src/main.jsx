import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { NotificationProvider } from '../../frontend/src/hooks/useNotification.jsx';
import { BrowserRouter } from "react-router-dom";


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </BrowserRouter>
);

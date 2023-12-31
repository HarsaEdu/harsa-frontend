import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App.jsx";
import "./styles/index.css";
import { BrowserRouter as Router } from "react-router-dom";
import Index from './routes/index.jsx'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
);


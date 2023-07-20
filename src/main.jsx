import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { MusicProvider } from "./Context/MusicContext";
import { PlayerProvider } from "./Context/PlayerContext";
import {LoginProvider} from "./Context/LoginContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <LoginProvider>
    <MusicProvider>
      <PlayerProvider>
        <App />
      </PlayerProvider>
    </MusicProvider>
  </LoginProvider>
  </React.StrictMode>
);

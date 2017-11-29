import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker, { unregister } from "./registerServiceWorker";

ReactDOM.render(<App />, document.getElementById("root"));
// registerServiceWorker();
// try without service worker?
unregister();

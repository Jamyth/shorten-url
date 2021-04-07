import React from "react";
import ReactDOM from "react-dom";
import { async } from "util/async";

const App = async(() => import("module/main"), "MainComponent");

ReactDOM.render(<App />, document.getElementById("app"));

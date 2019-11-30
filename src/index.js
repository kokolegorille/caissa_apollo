import React from "react";
import { render } from "react-dom";
import "babel-polyfill";
import "./css/app.scss";

import App from "./app";

const app = document.getElementById("app");
render(
  <App />,
  app
);
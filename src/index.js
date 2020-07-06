import "babel-polyfill";
import "core-js";

import React from "react";
import {render} from "react-dom";

import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import "./css/app.scss";

import App from "./js/app";

const app = document.getElementById("app");
render(
  <App />,
  app,
);

// import "babel-polyfill";
// import "whatwg-fetch";
// import "core-js";

// import "../../node_modules/bootstrap/dist/js/bootstrap.min.js";

// import "./css/app.scss";

// import React from "react";
// import {render} from "react-dom";

// import App from "./js/app";

// const app = document.getElementById("app");
// render(
//   <App />,
//   app,
// );

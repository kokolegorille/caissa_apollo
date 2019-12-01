import React from "react";
import { render } from "react-dom";
import "babel-polyfill";
import "./css/app.scss";

import { ApolloProvider } from "@apollo/react-hooks";
import client from "./client";

import App from "./app";

const app = document.getElementById("app");
render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  ,
  app
);
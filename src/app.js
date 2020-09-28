import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./routers/AppRouter";
import "normalize.css/normalize.css";
import "./styles/style.scss";

// redux
import { Provider } from "react-redux";
import configureStore from "./store/configureStore.js";

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById("app"));

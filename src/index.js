import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./containers/App";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import { startListeningToAuthChanges } from "./actions/auth";
import store from "./store";

store.dispatch(startListeningToAuthChanges());

const jsx = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById("root"));
registerServiceWorker();

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import "antd/dist/antd.css";
import { createBrowserHistory } from "history";
import App from "./App";
import store from "./app/store";

export const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <Router history={history}>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

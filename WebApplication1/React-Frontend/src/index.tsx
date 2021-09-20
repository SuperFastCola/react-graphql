import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './vendors/bootstrap-5.1.0/scss/bootstrap.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig";

const msalInstance = new PublicClientApplication(msalConfig);


ReactDOM.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
    <Provider store={store}>
      <App />
    </Provider>
    </MsalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

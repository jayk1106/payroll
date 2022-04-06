import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
  BrowserRouter
} from "react-router-dom";
import AuthState from './context/auth/AuthState';

ReactDOM.render(
  <BrowserRouter>
    <AuthState>
      <App />
    </AuthState>
  </BrowserRouter>,
  document.getElementById('root')
);


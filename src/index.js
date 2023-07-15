import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthenticationContext from './Context/AuthenticationContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthenticationContext> <App></App></AuthenticationContext>
  </React.StrictMode>
);


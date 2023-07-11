// Polyfills:
import 'react-app-polyfill/ie9'
import 'react-app-polyfill/stable'
import 'babel-es6-polyfill/es6-shim'
import 'babel-es6-polyfill/browser-polyfill'
import 'core-js/es/object/get-own-property-descriptors'

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
          <App />
  </React.StrictMode>
);



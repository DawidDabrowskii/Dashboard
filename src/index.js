import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { LoggedInProvider } from './contexts/LoggedInContext';

import './index.css';
import { UserContextProvider } from './contexts/UsersContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <LoggedInProvider>
          <App />
        </LoggedInProvider>
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

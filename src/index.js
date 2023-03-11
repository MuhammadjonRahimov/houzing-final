import styles from './assets/styles/main.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './root';
import RootProvider from './context';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <RootProvider>
      <Root />
    </RootProvider>
  </BrowserRouter>
);
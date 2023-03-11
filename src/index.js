import styles from './assets/styles/main.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './root';
import RootProvider from './context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RootProvider>
    <Root />
  </RootProvider>
);
import styles from './assets/styles/main.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './root';
import RootProvider from './context';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();
root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <RootProvider>
        <Root className={styles} />
      </RootProvider>
    </BrowserRouter>
  </QueryClientProvider >
);
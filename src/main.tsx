import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { HashRouter } from 'react-router-dom';

import { Container } from './Container';
import { DrawerProvider } from './components/DrawerProvider';
// eslint-disable-next-line import/no-unassigned-import
import './main.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <React.Suspense fallback={<CircularProgress />}>
      <HelmetProvider>
        <HashRouter>
          <DrawerProvider>
            <Container />
          </DrawerProvider>
        </HashRouter>
      </HelmetProvider>
    </React.Suspense>
  </React.StrictMode>
);

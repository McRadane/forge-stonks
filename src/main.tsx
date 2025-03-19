import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import { DrawerProvider } from './components/DrawerProvider';
import { Container } from './Container';

import './main.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <React.Suspense fallback={<CircularProgress />}>
      <HashRouter>
        <DrawerProvider>
          <Container />
        </DrawerProvider>
      </HashRouter>
    </React.Suspense>
  </React.StrictMode>
);

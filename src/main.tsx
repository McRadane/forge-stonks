import CircularProgress from '@mui/material/CircularProgress';
import { DrawerProvider } from '@ui/components/DrawerProvider';
import { Container } from '@ui/Container';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

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

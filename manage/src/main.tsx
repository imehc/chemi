import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import BaseRouter from '~/router/BaseRouter';
import '@unocss/reset/tailwind.css';
import './index.css';
import 'virtual:uno.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <BaseRouter />
    </BrowserRouter>
  </React.StrictMode>
);

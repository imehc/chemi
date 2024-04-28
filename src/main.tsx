import React from 'react';
import ReactDOM from 'react-dom/client';
import { Bounce, ToastContainer } from 'react-toastify';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import Dashboard from '~/views';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <Dashboard />
    </QueryClientProvider>
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
      closeButton={false}
    />
  </React.StrictMode>
);

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import store from './redux/app/store.js';
import { SocketProvider } from './context/SocketContext.jsx';
import { Toaster } from 'react-hot-toast'; // ✅ import this here

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <SocketProvider>
          <>
            <App />
            <Toaster position="top-right" reverseOrder={false} />{' '}
            {/* ✅ Global Toaster */}
          </>
        </SocketProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);

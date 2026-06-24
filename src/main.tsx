import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'sonner';

import './index.css';
import App from './App';
import { UserProvider } from './shared/auth/provider/userProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <App />
      <Toaster position="bottom-right" richColors closeButton />
    </UserProvider>
  </StrictMode>,
);

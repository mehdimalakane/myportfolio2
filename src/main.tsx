import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './i18n';
import './index.css';

// Add loading indicator
const LoadingFallback = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-black">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
  </div>
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <Suspense fallback={<LoadingFallback />}>
        <App />
      </Suspense>
    </HelmetProvider>
  </StrictMode>
);
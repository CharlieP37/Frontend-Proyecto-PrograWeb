import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: "https://0eeed71401173e2dcb98aace3a860b0b@o4509324718702592.ingest.us.sentry.io/4509324749832192",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  sendDefaultPii: true
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Sentry.ErrorBoundary fallback={<div>Ocurrió un error en la aplicación</div>}>
      <App />
    </Sentry.ErrorBoundary>
  </React.StrictMode>
);

reportWebVitals();
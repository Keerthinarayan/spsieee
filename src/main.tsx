import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Custom error page for dev tools detection
const devToolsErrorPage = `
  <div style="height: 100vh; display: flex; align-items: center; justify-content: center; background: #1a1a1a; color: #fff; font-family: sans-serif;">
    <div style="text-align: center;">
      <h1 style="font-size: 2em; margin-bottom: 1em;">Access Denied</h1>
      <p>Developer tools are not allowed in this application.</p>
    </div>
  </div>
`;

// Prevent keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (
    (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) ||
    (e.ctrlKey && (e.key === 'U' || e.key === 'u')) ||
    e.key === 'F12'
  ) {
    e.preventDefault();
    document.body.innerHTML = devToolsErrorPage;
  }
});

// Prevent right-click
document.addEventListener('contextmenu', (e) => e.preventDefault());

// More sophisticated DevTools detection
const devToolsCheck = () => {
  const threshold = {
    width: window.outerWidth - window.innerWidth > 160,
    height: window.outerHeight - window.innerHeight > 160
  };

  if (threshold.width || threshold.height) {
    document.body.innerHTML = devToolsErrorPage;
    // Redirect after a short delay
    setTimeout(() => {
      window.location.href = '/access-denied';
    }, 1000);
  }
};

setInterval(devToolsCheck, 1000);

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
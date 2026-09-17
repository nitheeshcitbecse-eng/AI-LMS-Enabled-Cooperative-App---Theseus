import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { SystemStateProvider } from './context/SystemStateContext';
import { AppRoutes } from './routes/AppRoutes';
import './App.css';

/**
 * BrowserRouter       – URLs (routes/AppRoutes.jsx, routes/routePaths.js)
 * SystemStateProvider – session, dashboard data and UI state (context/SystemStateContext.jsx),
 *                       booted by hooks/useSystemInit.js through services/api.js
 */
function App() {
  return (
    <BrowserRouter>
      <SystemStateProvider>
        <AppRoutes />
      </SystemStateProvider>
    </BrowserRouter>
  );
}

export default App;

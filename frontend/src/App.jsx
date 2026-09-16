import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { AppProvider } from './context/AppContext';
import { AppRoutes } from './routes/AppRoutes';
import './App.css';

/**
 * Provider order matters:
 *   BrowserRouter – URLs (routes/AppRoutes.jsx, routes/routePaths.js)
 *   AuthProvider  – session and token (Services/api.js → authService)
 *   DataProvider  – dashboard data for the signed-in role (Services/api.js)
 *   AppProvider   – UI state and actions used by every page via useApp()
 */
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <AppProvider>
            <AppRoutes />
          </AppProvider>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

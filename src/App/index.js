import React from 'react';
import Welcome from './WelcomeMessage';
import AppLayout from './AppLayout';
import AppBar from './AppBar';
import { AppProvider } from './AppProvider';

import './App.css';

function App() {
  return (
    <AppLayout>
      <AppProvider>
        <AppBar />
        <Welcome />
      </AppProvider>
    </AppLayout>
  );
}

export default App;

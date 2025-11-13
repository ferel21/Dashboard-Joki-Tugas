import React from 'react';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import { ToastProvider } from './ToastContext';
import ToastContainer from './components/ToastContainer';

const App: React.FC = () => {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-gray-900 text-white font-sans">
        <Header />
        <main className="p-4 sm:p-6 lg:p-8">
          <Dashboard />
        </main>
        <ToastContainer />
      </div>
    </ToastProvider>
  );
};

export default App;

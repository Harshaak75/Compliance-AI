
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { PoliciesPage } from './components/PoliciesPage';
import { GovtUpdatesPage } from './components/GovtUpdatesPage';

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      {/* 
        h-screen & overflow-hidden on root ensures the body doesn't scroll. 
        Scrolling happens only inside the <main> tag.
      */}
      <div className="flex h-screen overflow-hidden bg-slate-50/50">
        
        {/* Fixed Sidebar */}
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

        {/* 
          Main Content Wrapper 
          lg:ml-64 creates space for the fixed sidebar on desktop.
        */}
        <div className="flex-1 flex flex-col min-w-0 lg:ml-64 transition-all duration-300 ease-in-out">
          <Header onMenuClick={() => setSidebarOpen(true)} />

          <main className="flex-1 overflow-y-auto">
             <Routes>
                <Route path="/" element={<Dashboard />} />
                
                <Route path="/policies" element={<PoliciesPage />} />
                
                <Route path="/updates" element={<GovtUpdatesPage />} />

                <Route path="/settings" element={
                     <div className="p-8 text-center">
                        <h2 className="text-2xl font-bold text-slate-300">Settings Page Placeholder</h2>
                    </div>
                } />
                
                <Route path="*" element={<Navigate to="/" replace />} />
             </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { Button } from './components/Button.jsx';
import NKConfig from './pages/NKConfig.jsx';
import DamascoSkinTracker from './pages/DamascoSkinTracker.jsx';
import Linq from './components/Linq.jsx';

const Home = () => (
  <div className="p-8">
    <h2 className="text-2xl font-bold text-amber-500">Home Page</h2>
    <Link to="/config" className="text-sky-400 underline mt-4 inline-block">
      Guia de Configurações
    </Link>
    <Button label="NK-Botão Funcionando!" />
  </div>
);

const ConfigPage = () => {
  return (
    <div className="flex flex-col w-full">
      <NKConfig />
    </div>
  );
};

function App() {
  return (
    <HashRouter>
      <nav className="p-4 bg-[var(--ogx-0)] flex gap-4 border-b border-slate-700">
        <Linq to="/" text="Home" />
        <Linq text="Pegar Damasco" to="/DamascoSkinTracker" />
        <Linq to="/config" text="About" />
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/DamascoSkinTracker" element={<DamascoSkinTracker />} />
        <Route path="/config" element={<ConfigPage />} />
      </Routes>
    </HashRouter>
  );
}

createRoot(document.getElementById('app_root')).render(<App />);

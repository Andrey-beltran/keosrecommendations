import React, { useState } from 'react';
import { apiService } from '../services/api';
import { Shield, ExternalLink, Monitor } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'services'>('dashboard');
  const dashboardUrl = apiService.getDashboardUrl();
  const services = apiService.getAllServices();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4 flex items-center"><Shield className="mr-2" /> Administrador Keos</h2>
      <div className="flex space-x-4 mb-4">
        <button onClick={() => setActiveTab('dashboard')} className={`px-4 py-2 rounded ${activeTab === 'dashboard' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>Dashboard</button>
        <button onClick={() => setActiveTab('users')} className={`px-4 py-2 rounded ${activeTab === 'users' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>Usuarios</button>
        <button onClick={() => setActiveTab('services')} className={`px-4 py-2 rounded ${activeTab === 'services' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>Servicios</button>
      </div>

      {activeTab === 'dashboard' && (
        <div>
          <div className="mb-2 flex justify-end">
            <a href={dashboardUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 flex items-center text-sm">
              <ExternalLink className="w-4 h-4 mr-1" /> Ver en nueva pestaña
            </a>
          </div>
          <iframe src={dashboardUrl} className="w-full h-[600px] border rounded shadow" title="Gorse Dashboard" />
        </div>
      )}

      {activeTab === 'users' && (
        <div className="text-sm text-gray-700">Aquí puedes ver los usuarios cargados (simulado por ahora).</div>
      )}

      {activeTab === 'services' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {services.map((svc) => (
            <div key={svc.id} className="bg-white border p-4 rounded shadow">
              <div className="flex items-center mb-2">
                <span className="text-xl mr-2">{svc.icon}</span>
                <h3 className="font-semibold">{svc.name}</h3>
              </div>
              <p className="text-sm text-gray-600">{svc.description}</p>
              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">{svc.category}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

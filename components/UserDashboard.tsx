import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/api';
import { Recommendation } from '../types';
import { Sparkles, RefreshCw } from 'lucide-react';

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRecommendations = async () => {
    setLoading(true);
    const recs = await apiService.getRecommendations(user?.id || '');
    setRecommendations(recs);
    setLoading(false);
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const averageScore = (recommendations.reduce((sum, r) => sum + r.score, 0) / recommendations.length || 0).toFixed(2);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-700">Hola, {user?.name}</h2>
        <button onClick={fetchRecommendations} className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          <RefreshCw className="w-4 h-4 mr-2" /> Actualizar
        </button>
      </div>
      <p className="text-gray-600 mb-4">Estas son tus recomendaciones personalizadas. Afinidad promedio: <strong>{averageScore}</strong></p>

      {loading ? (
        <div className="text-center py-10 text-gray-500">Cargando recomendaciones...</div>
      ) : recommendations.length === 0 ? (
        <div className="text-center py-10 text-gray-500"><Sparkles className="mx-auto mb-2" /> No se encontraron recomendaciones</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {recommendations.map((rec) => (
            <div key={rec.id} className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-2">{rec.icon}</span>
                <h3 className="text-lg font-semibold">{rec.name}</h3>
              </div>
              <p className="text-gray-600 text-sm mb-2">{rec.description}</p>
              <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">{rec.category}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;

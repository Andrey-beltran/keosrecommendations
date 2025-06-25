import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Shield, ArrowRight } from 'lucide-react';

const Login: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId.trim()) return;

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    login(userId.trim());
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-indigo-700 mb-6">Centro de Recomendaciones Keos</h1>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Ingresa tu ID de usuario o 'admin'"
          className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-indigo-600 text-white p-3 rounded hover:bg-indigo-700 flex justify-center items-center"
        >
          {isLoading ? "Cargando..." : (
            <>
              Ingresar <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;

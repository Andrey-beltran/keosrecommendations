import { Recommendation } from '../types';

const GORSE_API_BASE = 'http://localhost:8087';
const GORSE_DASHBOARD_URL = 'http://localhost:8088';

const KEOS_SERVICES = {
  cx: [
    {
      id: 'keos-desk',
      name: 'Keos Desk',
      description: 'Mesa de ayuda integral para gestión de tickets y soporte al cliente',
      category: 'KEOS CX',
      icon: '🎧'
    },
    {
      id: 'keos-gpt',
      name: 'Keos GPT',
      description: 'IA conversacional para atención automatizada con lenguaje natural',
      category: 'KEOS CX',
      icon: '🤖'
    }
  ],
  suite: [
    {
      id: 'keos-calendar',
      name: 'Keos Calendar',
      description: 'Calendario inteligente con sincronización y recordatorios',
      category: 'KEOS SUITE',
      icon: '📅'
    },
    {
      id: 'keos-mail',
      name: 'Keos Mail',
      description: 'Correo electrónico empresarial con seguimiento e integraciones',
      category: 'KEOS SUITE',
      icon: '📧'
    }
  ]
};

export const apiService = {
  async getRecommendations(userId: string, n: number = 5): Promise<Recommendation[]> {
    try {
      const res = await fetch(`${GORSE_API_BASE}/api/recommend/${userId}?n=${n}`);
      const data = await res.json();
      const allServices = [...KEOS_SERVICES.cx, ...KEOS_SERVICES.suite];

      const recommendations = data.map((item: any) => {
        const match = allServices.find(s => s.id === item.ItemId);
        return match ? {
          ...match,
          score: item.Score || Math.random()
        } : null;
      }).filter(Boolean) as Recommendation[];

      return recommendations;
    } catch (err) {
      console.error('Error fetching recommendations, using fallback.', err);
      const allServices = [...KEOS_SERVICES.cx, ...KEOS_SERVICES.suite];
      return allServices
        .sort(() => Math.random() - 0.5)
        .slice(0, n)
        .map(service => ({ ...service, score: Math.random() * 0.3 + 0.7 }));
    }
  },

  getDashboardUrl(): string {
    return GORSE_DASHBOARD_URL;
  },

  getAllServices() {
    return [...KEOS_SERVICES.cx, ...KEOS_SERVICES.suite];
  }
};

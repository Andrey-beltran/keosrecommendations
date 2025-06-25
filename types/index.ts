export interface User {
  id: string;
  role: 'user' | 'admin';
  name: string;
}

export interface Recommendation {
  id: string;
  name: string;
  description: string;
  score: number;
  category?: string;
  icon?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (userId: string) => void;
  logout: () => void;
  isLoading: boolean;
}

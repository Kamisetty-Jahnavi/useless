export interface User {
  id: string;
  email: string;
  role: 'admin' | 'student';
  name: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
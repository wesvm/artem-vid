import {
  createContext,
  useContext
} from 'react';
import { signIn } from '@/api/auth/actions';
import { AuthSchema } from '@/api/auth/validations';
import { saveToken, clearToken, getToken } from '@/api/token-service';
import { useAuthStore } from '@/store/auth-store';
import { useQueryClient } from '@tanstack/react-query';

interface AuthContextProps {
  user: User | null;
  login: (credentials: AuthSchema) => Promise<AuthResponse>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const removeUser = useAuthStore((s) => s.removeUser);
  const queryClient = useQueryClient();

  const login = async (credentials: AuthSchema) => {
    const response = await signIn(credentials);
    if (response.token) {
      const { token, user } = response;
      saveToken(token);
      setUser(user);
    }

    return response;
  };

  const logout = () => {
    queryClient.clear();
    clearToken();
    removeUser();
  };

  const isAuthenticated = !!useAuthStore((s) => s.user) && !!getToken();

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
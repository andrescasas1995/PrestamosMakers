import React, { createContext, useState, ReactNode, useContext } from 'react';

// Define el tipo de datos del usuario
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

// Define el tipo del contexto
interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

// Crea el contexto con valores predeterminados
const UserContext = createContext<UserContextType | undefined>(undefined);

// Proveedor del contexto
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe ser usado dentro de un UserProvider');
  }
  return context;
};

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  async function signup(email, password, displayName) {
    // TODO: Backend signup здесь
    // Вместо mock-логики вызовите ваш API для регистрации пользователя
    setCurrentUser({ email, displayName, uid: email });
    return { email, displayName, uid: email };
  }

  async function login(email, password) {
    // TODO: Backend login здесь
    // Вместо mock-логики вызовите ваш API для входа пользователя
    setCurrentUser({ email, displayName: email.split('@')[0], uid: email });
    return { email, displayName: email.split('@')[0], uid: email };
  }

  async function logout() {
    // TODO: Backend logout здесь (если требуется)
    setCurrentUser(null);
    return Promise.resolve();
  }

  const value = {
    currentUser,
    signup,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
} 
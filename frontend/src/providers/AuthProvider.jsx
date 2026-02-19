'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { api } from 'lib/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshSession = useCallback(async () => {
    try {
      const response = await api.post('/auth/refresh', {});
      setUser(response.user);
      setAccessToken(response.accessToken);
      return response;
    } catch (error) {
      setUser(null);
      setAccessToken(null);
      throw error;
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const bootstrapSession = async () => {
      try {
        await refreshSession();
      } catch (error) {
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    bootstrapSession();

    return () => {
      isMounted = false;
    };
  }, [refreshSession]);

  const login = async (payload) => {
    const response = await api.post('/auth/login', payload);
    setUser(response.user);
    setAccessToken(response.accessToken);
    return response;
  };

  const register = async (payload) => {
    const response = await api.post('/auth/register', payload);
    setUser(response.user);
    setAccessToken(response.accessToken);
    return response;
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout', {});
    } finally {
      setUser(null);
      setAccessToken(null);
    }
  };

  const authRequest = useCallback(
    async (path, options = {}) => {
      let token = accessToken;

      if (!token) {
        const refreshed = await refreshSession();
        token = refreshed.accessToken;
      }

      try {
        return await api.request(path, {
          ...options,
          headers: {
            ...(options.headers || {}),
            Authorization: `Bearer ${token}`
          }
        });
      } catch (error) {
        if (error.status !== 401) {
          throw error;
        }

        const refreshed = await refreshSession();
        return await api.request(path, {
          ...options,
          headers: {
            ...(options.headers || {}),
            Authorization: `Bearer ${refreshed.accessToken}`
          }
        });
      }
    },
    [accessToken, refreshSession]
  );

  const authGet = useCallback(
    async (path) => {
      return authRequest(path, { method: 'GET' });
    },
    [authRequest]
  );

  const value = useMemo(
    () => ({
      user,
      accessToken,
      isLoading,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
      refreshSession,
      authGet,
      authRequest
    }),
    [accessToken, isLoading, user, refreshSession, authGet, authRequest]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
};

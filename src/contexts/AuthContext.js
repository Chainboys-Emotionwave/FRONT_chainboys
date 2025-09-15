import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth는 AuthProvider 내에서 사용되어야 합니다.');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 초기 로드 시 토큰 검증
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          const isValid = await authService.validateToken();
          if (isValid) {
            const userInfo = await authService.getUserInfo();
            if (userInfo) {
              setUser(userInfo);
              setIsAuthenticated(true);
            }
          } else {
            // 토큰이 유효하지 않으면 로그아웃
            await authService.logout();
          }
        }
      } catch (error) {
        console.error('인증 초기화 오류:', error);
        await authService.logout();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // 웹3 지갑 로그인
  const loginWithWallet = async (walletAddress, signature) => {
    try {
      setIsLoading(true);
      const response = await authService.verifySignature(walletAddress, signature);
      
      if (response.user) {
        setUser(response.user);
        setIsAuthenticated(true);
        return { success: true, user: response.user };
      }
      
      throw new Error('로그인 응답에 사용자 정보가 없습니다.');
    } catch (error) {
      console.error('로그인 오류:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // 로그아웃
  const logout = async () => {
    try {
      setIsLoading(true);
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('로그아웃 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 사용자 정보 업데이트
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    loginWithWallet,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

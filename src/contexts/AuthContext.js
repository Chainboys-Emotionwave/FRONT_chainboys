import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';
import levelService from '../services/levelService';

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
  const [userLevel, setUserLevel] = useState(null);

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
              // 사용자 레벨 계산 (게시물 수 기반)
              const postCount = userInfo.postCount || 0;
              const level = levelService.calculateLevel(postCount);
              setUserLevel(level);
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
        // 사용자 레벨 계산
        const postCount = response.user.postCount || 0;
        const level = levelService.calculateLevel(postCount);
        setUserLevel(level);
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
      setUserLevel(null);
    } catch (error) {
      console.error('로그아웃 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 사용자 정보 업데이트
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    // 사용자 정보 업데이트 시 레벨도 재계산
    const postCount = updatedUser.postCount || 0;
    const level = levelService.calculateLevel(postCount);
    setUserLevel(level);
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    userLevel,
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

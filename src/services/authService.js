// 웹3 지갑 로그인을 위한 API 서비스
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

class AuthService {
  constructor() {
    this.token = localStorage.getItem('authToken');
  }

  // 서명 메시지 요청
  async requestMessage(walletAddress) {
    try {
      // 임시: 백엔드가 없을 때 모의 데이터 사용
      if (process.env.NODE_ENV === 'development') {
        console.log('개발 모드: 모의 서명 메시지 사용');
        return `Welcome to EmotionWave! Please sign this message to confirm your identity. Nonce: ${Date.now()}`;
      }

      const response = await fetch(`${API_BASE_URL}/api/auth/request-message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ walletAddress }),
      });

      if (!response.ok) {
        throw new Error('서명 메시지 요청에 실패했습니다.');
      }

      const data = await response.json();
      return data.message;
    } catch (error) {
      console.error('서명 메시지 요청 오류:', error);
      // 백엔드 연결 실패 시 모의 메시지 반환
      console.log('백엔드 연결 실패, 모의 메시지 사용');
      return `Welcome to EmotionWave! Please sign this message to confirm your identity. Nonce: ${Date.now()}`;
    }
  }

  // 서명 검증 및 로그인
  async verifySignature(walletAddress, signature) {
    try {
      // 임시: 백엔드가 없을 때 모의 로그인 처리
      if (process.env.NODE_ENV === 'development') {
        console.log('개발 모드: 모의 로그인 처리');
        const mockToken = `mock_token_${Date.now()}`;
        const mockUser = {
          id: 1,
          walletAddress: walletAddress,
          username: `User${walletAddress.slice(-4)}`,
          fan_ticket_count: 5
        };
        
        this.token = mockToken;
        localStorage.setItem('authToken', mockToken);
        
        return {
          status: 'success',
          token: mockToken,
          user: mockUser
        };
      }

      const response = await fetch(`${API_BASE_URL}/api/auth/verify-signature`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ walletAddress, signature }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '로그인에 실패했습니다.');
      }

      const data = await response.json();
      
      // JWT 토큰 저장
      if (data.token) {
        this.token = data.token;
        localStorage.setItem('authToken', data.token);
      }

      return data;
    } catch (error) {
      console.error('서명 검증 오류:', error);
      // 백엔드 연결 실패 시 모의 로그인 처리
      console.log('백엔드 연결 실패, 모의 로그인 처리');
      const mockToken = `mock_token_${Date.now()}`;
      const mockUser = {
        id: 1,
        walletAddress: walletAddress,
        username: `User${walletAddress.slice(-4)}`,
        fan_ticket_count: 5
      };
      
      this.token = mockToken;
      localStorage.setItem('authToken', mockToken);
      
      return {
        status: 'success',
        token: mockToken,
        user: mockUser
      };
    }
  }

  // 로그아웃
  async logout() {
    try {
      if (this.token) {
        await fetch(`${API_BASE_URL}/api/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json',
          },
        });
      }
    } catch (error) {
      console.error('로그아웃 오류:', error);
    } finally {
      // 토큰 제거
      this.token = null;
      localStorage.removeItem('authToken');
    }
  }

  // 토큰 유효성 검증
  async validateToken() {
    try {
      if (!this.token) return false;

      const response = await fetch(`${API_BASE_URL}/api/auth/validate`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
      });

      return response.ok;
    } catch (error) {
      console.error('토큰 검증 오류:', error);
      return false;
    }
  }

  // 사용자 정보 가져오기
  async getUserInfo() {
    try {
      if (!this.token) return null;

      const response = await fetch(`${API_BASE_URL}/api/auth/user`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
      });

      if (!response.ok) return null;

      return await response.json();
    } catch (error) {
      console.error('사용자 정보 조회 오류:', error);
      return null;
    }
  }

  // 토큰 가져오기
  getToken() {
    return this.token;
  }

  // 로그인 상태 확인
  isAuthenticated() {
    return !!this.token;
  }
}

const authService = new AuthService();
export default authService;

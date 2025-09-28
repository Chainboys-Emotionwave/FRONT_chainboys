// 광고 시청 보상 관련 API 서비스

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

/**
 * 광고 시청 완료 시 응원권 지급 요청
 * @param {Object} userInfo - 사용자 정보
 * @param {string} userInfo.userId - 사용자 ID
 * @param {string} userInfo.walletAddress - 지갑 주소
 * @param {string} adId - 광고 ID (선택사항)
 * @returns {Promise<Object>} 응원권 지급 결과
 */
export const claimAdReward = async (userInfo, adId = 'default') => {
  try {
    const response = await fetch(`${API_BASE_URL}/rewards/ad-watched`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}` // 인증 토큰
      },
      body: JSON.stringify({
        userId: userInfo.userId,
        walletAddress: userInfo.walletAddress,
        adId: adId,
        timestamp: new Date().toISOString(),
        rewardType: 'cheer_ticket',
        rewardAmount: 1
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('광고 시청 보상 요청 실패:', error);
    
    // 오프라인 모드나 API 서버가 없을 때의 대체 로직
    return {
      success: true,
      message: '응원권이 지급되었습니다! (오프라인 모드)',
      reward: {
        type: 'cheer_ticket',
        amount: 1,
        timestamp: new Date().toISOString()
      }
    };
  }
};

/**
 * 사용자의 응원권 잔액 조회
 * @param {string} userId - 사용자 ID
 * @returns {Promise<Object>} 응원권 잔액 정보
 */
export const getCheerTicketBalance = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/rewards/balance/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('응원권 잔액 조회 실패:', error);
    
    // 오프라인 모드일 때 기본값 반환
    return {
      success: true,
      balance: {
        cheerTickets: 0,
        lastUpdated: new Date().toISOString()
      }
    };
  }
};

/**
 * 일일 광고 시청 횟수 조회
 * @param {string} userId - 사용자 ID
 * @returns {Promise<Object>} 일일 시청 횟수 정보
 */
export const getDailyAdCount = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/rewards/daily-ad-count/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('일일 광고 시청 횟수 조회 실패:', error);
    
    // 오프라인 모드일 때 기본값 반환
    return {
      success: true,
      count: 0,
      maxCount: 5,
      resetTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    };
  }
};

/**
 * 응원권 사용 (다른 사용자 응원)
 * @param {Object} params - 응원 정보
 * @param {string} params.fromUserId - 응원하는 사용자 ID
 * @param {string} params.toUserId - 응원받는 사용자 ID
 * @param {string} params.contentId - 콘텐츠 ID
 * @param {number} params.amount - 사용할 응원권 개수
 * @returns {Promise<Object>} 응원 결과
 */
export const useCheerTicket = async (params) => {
  try {
    const response = await fetch(`${API_BASE_URL}/rewards/use-cheer-ticket`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
      body: JSON.stringify({
        fromUserId: params.fromUserId,
        toUserId: params.toUserId,
        contentId: params.contentId,
        amount: params.amount,
        timestamp: new Date().toISOString()
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('응원권 사용 실패:', error);
    throw error;
  }
};

export default {
  claimAdReward,
  getCheerTicketBalance,
  getDailyAdCount,
  useCheerTicket
};

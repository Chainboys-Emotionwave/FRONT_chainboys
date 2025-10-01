import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import WalletConnect from "./WalletConnect";
import AdRewardModal from "./AdRewardModal";
import { claimAdReward } from "../services/rewardService";

function Navigation() {
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cheerTokens, setCheerTokens] = useState(0);
  const [isAdModalOpen, setIsAdModalOpen] = useState(false);

  // 로그인된 사용자의 응원권 개수 (실제로는 API에서 가져옴)
  useEffect(() => {
    if (isAuthenticated && user) {
      setCheerTokens(user.fan_ticket_count || 0);
    } else {
      setCheerTokens(0);
    }
  }, [isAuthenticated, user]);

  const isActive = (path) => location.pathname === path;

  const handleAdComplete = async () => {
    try {
      // 사용자 정보 (실제로는 AuthContext에서 가져와야 함)
      const userInfo = {
        userId: localStorage.getItem('userId') || 'demo_user',
        walletAddress: localStorage.getItem('walletAddress') || '0x0000000000000000000000000000000000000000'
      };

      console.log('광고 시청 완료 - 백엔드에 응원권 지급 요청');
      
      // 백엔드 API 호출
      const result = await claimAdReward(userInfo);
      
      if (result.success) {
        console.log('응원권 지급 성공:', result);
        // 응원권 개수 업데이트
        setCheerTokens(prev => prev + 1);
      } else {
        console.error('응원권 지급 실패:', result.message);
      }
    } catch (error) {
      console.error('광고 시청 보상 처리 중 오류:', error);
      // 오류 발생 시에도 사용자에게는 성공으로 표시 (오프라인 모드)
      setCheerTokens(prev => prev + 1);
    }
  };

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      background: '#fff',
      borderBottom: '1px solid #e9ecef',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px'
      }}>
        {/* 로고 */}
        <Link 
          to="/" 
          style={{ 
            textDecoration: 'none', 
            display: 'flex', 
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <div style={{ fontSize: '24px' }}>🎵</div>
          <span style={{ 
            fontSize: '20px', 
            fontWeight: 'bold', 
            color: '#333' 
          }}>
            EmotionWave
          </span>
        </Link>

        {/* 데스크톱 메뉴 */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '20px' 
        }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Link 
              to="/home" 
              style={{ 
                textDecoration: 'none',
                color: isActive('/home') ? '#8bc34a' : '#666',
                fontWeight: isActive('/home') ? '600' : '400',
                padding: '6px 0',
                borderBottom: isActive('/home') ? '2px solid #8bc34a' : '2px solid transparent',
                fontSize: '14px',
                whiteSpace: 'nowrap'
              }}
            >
              홈
            </Link>
            <Link 
              to="/festival" 
              style={{ 
                textDecoration: 'none',
                color: isActive('/festival') ? '#8bc34a' : '#666',
                fontWeight: isActive('/festival') ? '600' : '400',
                padding: '6px 0',
                borderBottom: isActive('/festival') ? '2px solid #8bc34a' : '2px solid transparent',
                fontSize: '14px',
                whiteSpace: 'nowrap'
              }}
            >
              🎊 축제
            </Link>
            <Link 
              to="/ranking" 
              style={{ 
                textDecoration: 'none',
                color: isActive('/ranking') ? '#8bc34a' : '#666',
                fontWeight: isActive('/ranking') ? '600' : '400',
                padding: '6px 0',
                borderBottom: isActive('/ranking') ? '2px solid #8bc34a' : '2px solid transparent',
                fontSize: '14px',
                whiteSpace: 'nowrap'
              }}
            >
              🏆 랭킹
            </Link>
            <Link 
              to="/collection" 
              style={{ 
                textDecoration: 'none',
                color: isActive('/collection') ? '#8bc34a' : '#666',
                fontWeight: isActive('/collection') ? '600' : '400',
                padding: '6px 0',
                borderBottom: isActive('/collection') ? '2px solid #8bc34a' : '2px solid transparent',
                fontSize: '14px',
                whiteSpace: 'nowrap'
              }}
            >
              🏠 내 집
            </Link>
            <Link 
              to="/guide" 
              style={{ 
                textDecoration: 'none',
                color: isActive('/guide') ? '#8bc34a' : '#666',
                fontWeight: isActive('/guide') ? '600' : '400',
                padding: '6px 0',
                borderBottom: isActive('/guide') ? '2px solid #8bc34a' : '2px solid transparent',
                fontSize: '14px',
                whiteSpace: 'nowrap'
              }}
            >
              📖 가이드
            </Link>
          </div>

          {/* 검색 아이콘 */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '16px' 
          }}>
            <Link to="/search">
              <button 
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '18px',
                  cursor: 'pointer',
                  color: '#666',
                  padding: '8px',
                  borderRadius: '8px',
                  transition: 'all 0.2s ease'
                }}
                title="검색"
              >
                🔍
              </button>
            </Link>

            {/* 응원권 얻기 버튼 */}
            <button
              onClick={() => setIsAdModalOpen(true)}
              style={{
                background: 'linear-gradient(135deg, #FF6B6B, #FF8E8E)',
                color: 'white',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '15px',
                fontSize: '12px',
                fontFamily: 'Fredoka, sans-serif',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 3px 6px rgba(255, 107, 107, 0.3)',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                whiteSpace: 'nowrap'
              }}
            >
              <span style={{ fontSize: '14px' }}>🎫</span>
              응원권 얻기
            </button>

            {/* 마을 축제 참여권 표시 */}
            {cheerTokens > 0 && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
                background: 'linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%)',
                padding: '3px 6px',
                borderRadius: '12px',
                fontSize: '12px',
                color: '#333',
                border: '1px solid rgba(255, 183, 77, 0.3)',
                boxShadow: '0 1px 4px rgba(255, 183, 77, 0.2)',
                whiteSpace: 'nowrap'
              }}>
                <span>🎫</span>
                <span>{cheerTokens}</span>
              </div>
            )}

            {/* 지갑 연결 */}
            <div style={{ padding: '2px' }}>
              <WalletConnect />
            </div>
          </div>
        </div>

        {/* 모바일 메뉴 버튼 */}
        <button
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer'
          }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* 모바일 메뉴 */}
      {isMenuOpen && (
        <div style={{
          background: '#fff',
          borderTop: '1px solid #e9ecef',
          padding: '16px 20px'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Link 
              to="/home" 
              style={{ 
                textDecoration: 'none',
                color: isActive('/home') ? '#8bc34a' : '#666',
                fontWeight: isActive('/home') ? '600' : '400',
                padding: '8px 0'
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              홈
            </Link>
            <Link 
              to="/festival" 
              style={{ 
                textDecoration: 'none',
                color: isActive('/festival') ? '#8bc34a' : '#666',
                fontWeight: isActive('/festival') ? '600' : '400',
                padding: '8px 0'
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              🎊 축제
            </Link>
            <Link 
              to="/ranking" 
              style={{ 
                textDecoration: 'none',
                color: isActive('/ranking') ? '#8bc34a' : '#666',
                fontWeight: isActive('/ranking') ? '600' : '400',
                padding: '8px 0'
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              🏆 랭킹
            </Link>
            <Link 
              to="/collection" 
              style={{ 
                textDecoration: 'none',
                color: isActive('/collection') ? '#8bc34a' : '#666',
                fontWeight: isActive('/collection') ? '600' : '400',
                padding: '8px 0'
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              🏠 내 집
            </Link>
            <Link 
              to="/guide" 
              style={{ 
                textDecoration: 'none',
                color: isActive('/guide') ? '#8bc34a' : '#666',
                fontWeight: isActive('/guide') ? '600' : '400',
                padding: '8px 0'
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              📖 가이드
            </Link>
            {/* 응원권 얻기 버튼 (모바일) */}
            <button
              onClick={() => {
                setIsAdModalOpen(true);
                setIsMenuOpen(false);
              }}
              style={{
                background: 'linear-gradient(135deg, #FF6B6B, #FF8E8E)',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '15px',
                fontSize: '14px',
                fontFamily: 'Fredoka, sans-serif',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 3px 6px rgba(255, 107, 107, 0.3)',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                width: '100%',
                marginBottom: '12px',
                whiteSpace: 'nowrap'
              }}
            >
              <span style={{ fontSize: '16px' }}>🎫</span>
              응원권 얻기
            </button>

            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              padding: '8px 0',
              borderTop: '1px solid #e9ecef',
              marginTop: '8px'
            }}>
              <WalletConnect />
              {cheerTokens > 0 && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                  background: 'linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%)',
                  padding: '3px 6px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  color: '#333',
                  border: '1px solid rgba(255, 183, 77, 0.3)',
                  boxShadow: '0 1px 4px rgba(255, 183, 77, 0.2)',
                  whiteSpace: 'nowrap'
                }}>
                  <span>🎫</span>
                  <span>{cheerTokens}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 광고 시청 모달 */}
      <AdRewardModal
        isOpen={isAdModalOpen}
        onClose={() => setIsAdModalOpen(false)}
        onAdComplete={handleAdComplete}
      />
    </nav>
  );
}

export default Navigation;

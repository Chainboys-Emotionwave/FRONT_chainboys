import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import WalletConnect from "./WalletConnect";

function Navigation() {
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cheerTokens, setCheerTokens] = useState(0);

  // 로그인된 사용자의 응원권 개수 (실제로는 API에서 가져옴)
  useEffect(() => {
    if (isAuthenticated && user) {
      setCheerTokens(user.fan_ticket_count || 0);
    } else {
      setCheerTokens(0);
    }
  }, [isAuthenticated, user]);

  const isActive = (path) => location.pathname === path;

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
          gap: '32px' 
        }}>
          <div style={{ display: 'flex', gap: '24px' }}>
            <Link 
              to="/" 
              style={{ 
                textDecoration: 'none',
                color: isActive('/') ? '#667eea' : '#666',
                fontWeight: isActive('/') ? '600' : '400',
                padding: '8px 0',
                borderBottom: isActive('/') ? '2px solid #667eea' : '2px solid transparent'
              }}
            >
              홈
            </Link>
            <Link 
              to="/upload" 
              style={{ 
                textDecoration: 'none',
                color: isActive('/upload') ? '#667eea' : '#666',
                fontWeight: isActive('/upload') ? '600' : '400',
                padding: '8px 0',
                borderBottom: isActive('/upload') ? '2px solid #667eea' : '2px solid transparent'
              }}
            >
              콘텐츠 등록
            </Link>
            <Link 
              to="/ranking" 
              style={{ 
                textDecoration: 'none',
                color: isActive('/ranking') ? '#667eea' : '#666',
                fontWeight: isActive('/ranking') ? '600' : '400',
                padding: '8px 0',
                borderBottom: isActive('/ranking') ? '2px solid #667eea' : '2px solid transparent'
              }}
            >
              랭킹
            </Link>
            <Link 
              to="/collection" 
              style={{ 
                textDecoration: 'none',
                color: isActive('/collection') ? '#667eea' : '#666',
                fontWeight: isActive('/collection') ? '600' : '400',
                padding: '8px 0',
                borderBottom: isActive('/collection') ? '2px solid #667eea' : '2px solid transparent'
              }}
            >
              마이페이지
            </Link>
          </div>

          {/* 검색 아이콘 */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '16px' 
          }}>
            <button 
              style={{
                background: 'none',
                border: 'none',
                fontSize: '18px',
                cursor: 'pointer',
                color: '#666',
                padding: '8px'
              }}
              title="검색"
            >
              🔍
            </button>

            {/* 응원권 표시 */}
            {cheerTokens > 0 && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: '#f8f9fa',
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '14px',
                color: '#333'
              }}>
                <span>💖</span>
                <span>{cheerTokens}</span>
              </div>
            )}

            {/* 지갑 연결 */}
            <div style={{ border: '1px solid red', padding: '4px' }}>
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
              to="/" 
              style={{ 
                textDecoration: 'none',
                color: isActive('/') ? '#667eea' : '#666',
                fontWeight: isActive('/') ? '600' : '400',
                padding: '8px 0'
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              홈
            </Link>
            <Link 
              to="/upload" 
              style={{ 
                textDecoration: 'none',
                color: isActive('/upload') ? '#667eea' : '#666',
                fontWeight: isActive('/upload') ? '600' : '400',
                padding: '8px 0'
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              콘텐츠 등록
            </Link>
            <Link 
              to="/ranking" 
              style={{ 
                textDecoration: 'none',
                color: isActive('/ranking') ? '#667eea' : '#666',
                fontWeight: isActive('/ranking') ? '600' : '400',
                padding: '8px 0'
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              랭킹
            </Link>
            <Link 
              to="/collection" 
              style={{ 
                textDecoration: 'none',
                color: isActive('/collection') ? '#667eea' : '#666',
                fontWeight: isActive('/collection') ? '600' : '400',
                padding: '8px 0'
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              마이페이지
            </Link>
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
                  gap: '4px',
                  background: '#f8f9fa',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '14px',
                  color: '#333'
                }}>
                  <span>💖</span>
                  <span>{cheerTokens}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navigation;

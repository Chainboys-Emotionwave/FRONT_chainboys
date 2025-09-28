import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showElements, setShowElements] = useState(false);

  useEffect(() => {
    // 페이지 로드 애니메이션
    const timer1 = setTimeout(() => setIsLoaded(true), 500);
    const timer2 = setTimeout(() => setShowElements(true), 1000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleEnterVillage = () => {
    navigate('/home');
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: 'url(./main_test_dark_25.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'Nunito, sans-serif'
    }}>
      {/* 배경 오버레이 */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.3)',
        zIndex: 1
      }}></div>

      {/* 구름들 - 상단~중간 영역에만 배치 */}
      <div style={{
        position: 'absolute',
        top: '8%',
        left: '5%',
        fontSize: '3.5rem',
        opacity: 0.4,
        animation: 'float 9s ease-in-out infinite',
        transform: showElements ? 'translateY(0)' : 'translateY(-60px)',
        transition: 'all 1.2s ease-out',
        zIndex: 2
      }}>☁️</div>

      <div style={{
        position: 'absolute',
        top: '20%',
        right: '8%',
        fontSize: '2.8rem',
        opacity: 0.5,
        animation: 'float 7s ease-in-out infinite reverse',
        transform: showElements ? 'translateY(0)' : 'translateY(-40px)',
        transition: 'all 1.4s ease-out',
        zIndex: 2
      }}>☁️</div>

      <div style={{
        position: 'absolute',
        top: '35%',
        left: '12%',
        fontSize: '3.2rem',
        opacity: 0.3,
        animation: 'float 8s ease-in-out infinite',
        transform: showElements ? 'translateY(0)' : 'translateY(-50px)',
        transition: 'all 1.6s ease-out',
        zIndex: 2
      }}>☁️</div>

      <div style={{
        position: 'absolute',
        top: '50%',
        right: '15%',
        fontSize: '2.5rem',
        opacity: 0.4,
        animation: 'float 6s ease-in-out infinite reverse',
        transform: showElements ? 'translateY(0)' : 'translateY(-35px)',
        transition: 'all 1.8s ease-out',
        zIndex: 2
      }}>☁️</div>

      <div style={{
        position: 'absolute',
        top: '45%',
        left: '8%',
        fontSize: '3rem',
        opacity: 0.3,
        animation: 'float 10s ease-in-out infinite',
        transform: showElements ? 'translateY(0)' : 'translateY(-45px)',
        transition: 'all 2s ease-out',
        zIndex: 2
      }}>☁️</div>

      <div style={{
        position: 'absolute',
        top: '25%',
        right: '25%',
        fontSize: '2.2rem',
        opacity: 0.5,
        animation: 'float 9s ease-in-out infinite reverse',
        transform: showElements ? 'translateY(0)' : 'translateY(-30px)',
        transition: 'all 2.2s ease-out',
        zIndex: 2
      }}>☁️</div>

      <div style={{
        position: 'absolute',
        top: '40%',
        left: '60%',
        fontSize: '2.8rem',
        opacity: 0.4,
        animation: 'float 11s ease-in-out infinite',
        transform: showElements ? 'translateY(0)' : 'translateY(-25px)',
        transition: 'all 2.4s ease-out',
        zIndex: 2
      }}>☁️</div>

      {/* 메인 콘텐츠 */}
      <div style={{
        textAlign: 'center',
        zIndex: 10,
        transform: isLoaded ? 'translateY(0)' : 'translateY(50px)',
        opacity: isLoaded ? 1 : 0,
        transition: 'all 1s ease-out',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '0 20px',
        position: 'relative'
      }}>
        {/* 마을 이름 */}
        <div style={{
          fontSize: 'clamp(2.5rem, 8vw, 4rem)',
          fontWeight: '700',
          color: '#FFFFFF',
          textShadow: '2px 2px 4px rgba(0,0,0,0.8), 4px 4px 8px rgba(0,0,0,0.6)',
          marginBottom: '1rem',
          fontFamily: 'Fredoka, sans-serif',
          whiteSpace: 'nowrap'
        }}>
          🎵 EmotionWave Village 🎵
        </div>

        {/* 부제목 */}
        <div style={{
          fontSize: '1.5rem',
          color: '#E8F5E8',
          marginBottom: '3rem',
          fontWeight: '500',
          textShadow: '1px 1px 3px rgba(0,0,0,0.8)'
        }}>
          감정을 나누는 음악 마을에 오신 것을 환영합니다! ✨
        </div>

        {/* 마을 설명 */}
        <div style={{
          fontSize: '1.1rem',
          color: '#F0F8F0',
          marginBottom: '4rem',
          maxWidth: '600px',
          lineHeight: '1.6',
          textShadow: '1px 1px 3px rgba(0,0,0,0.8)',
          textAlign: 'center'
        }}>
          마을에 입장하여 여러분의 감정을 음악으로 표현해보세요! 🏡
        </div>

        {/* 입장 버튼 */}
        <button
          onClick={handleEnterVillage}
          style={{
            background: 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)',
            color: 'white',
            border: '2px solid rgba(255,255,255,0.3)',
            padding: '20px 40px',
            borderRadius: '30px',
            fontSize: '1.3rem',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 8px 25px rgba(0,0,0,0.5), 0 4px 15px rgba(76, 175, 80, 0.3)',
            fontFamily: 'Quicksand, sans-serif',
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
            transform: showElements ? 'scale(1)' : 'scale(0.8)',
            transition: 'all 1.8s ease-out'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-3px) scale(1.05)';
            e.target.style.boxShadow = '0 12px 35px rgba(76, 175, 80, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0) scale(1)';
            e.target.style.boxShadow = '0 8px 25px rgba(76, 175, 80, 0.4)';
          }}
        >
          🏡 마을에 입장하기
        </button>
      </div>

      {/* 하단 장식 요소들 */}
      <div style={{
        position: 'absolute',
        bottom: '5%',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '2rem',
        opacity: showElements ? 1 : 0,
        transition: 'all 2s ease-out',
        zIndex: 10
      }}>
        <div style={{ fontSize: '2rem', animation: 'bounce 2s ease-in-out infinite' }}>🎵</div>
        <div style={{ fontSize: '2rem', animation: 'bounce 2s ease-in-out infinite 0.2s' }}>🎶</div>
        <div style={{ fontSize: '2rem', animation: 'bounce 2s ease-in-out infinite 0.4s' }}>🎼</div>
        <div style={{ fontSize: '2rem', animation: 'bounce 2s ease-in-out infinite 0.6s' }}>🎹</div>
        <div style={{ fontSize: '2rem', animation: 'bounce 2s ease-in-out infinite 0.8s' }}>🎸</div>
      </div>

      {/* CSS 애니메이션 */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
}

export default Welcome;

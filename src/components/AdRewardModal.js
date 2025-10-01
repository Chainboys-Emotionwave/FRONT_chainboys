import { useState, useEffect } from 'react';

const AdRewardModal = ({ isOpen, onClose, onAdComplete }) => {
  const [adProgress, setAdProgress] = useState(0);
  const [isWatching, setIsWatching] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // 30초 광고

  useEffect(() => {
    if (isOpen) {
      setAdProgress(0);
      setIsWatching(false);
      setIsCompleted(false);
      setTimeLeft(30);
    }
  }, [isOpen]);

  useEffect(() => {
    let interval;
    if (isWatching && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          const newTime = prev - 1;
          const progress = ((30 - newTime) / 30) * 100;
          setAdProgress(progress);
          
          if (newTime <= 0) {
            setIsWatching(false);
            setIsCompleted(true);
            // 광고 시청 완료 시 백엔드에 전송
            onAdComplete();
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isWatching, timeLeft, onAdComplete]);

  const handleStartWatching = () => {
    setIsWatching(true);
  };

  const handleClose = () => {
    if (!isWatching) {
      onClose();
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="ad-modal-container" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      animation: 'fadeIn 0.3s ease-in-out',
      padding: '0',
      margin: '0',
      width: '100vw',
      height: '100vh'
    }}>
      <div className="ad-modal-content" style={{
        backgroundColor: 'white',
        borderRadius: '20px',
        padding: '30px',
        maxWidth: '500px',
        width: '90%',
        maxHeight: '90vh',
        textAlign: 'center',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
        animation: 'slideIn 0.3s ease-out',
        overflow: 'auto',
        position: 'relative',
        margin: '0',
        transform: 'translate(0, 0)'
      }}>
        {/* 헤더 */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>🎬</div>
          <h2 style={{ 
            color: '#2E7D32', 
            fontFamily: 'Fredoka, sans-serif', 
            margin: '0 0 10px 0',
            fontSize: '24px'
          }}>
            광고 시청하고 응원권 받기!
          </h2>
          <p style={{ 
            color: '#666', 
            fontFamily: 'Nunito, sans-serif',
            margin: 0,
            fontSize: '16px'
          }}>
            짧은 광고를 시청하고 응원권을 획득하세요
          </p>
        </div>

        {/* 광고 시청 영역 */}
        <div style={{
          backgroundColor: '#f5f5f5',
          borderRadius: '15px',
          padding: '20px',
          marginBottom: '20px',
          minHeight: '200px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {!isWatching && !isCompleted && (
            <div>
              <div style={{ fontSize: '64px', marginBottom: '15px' }}>📺</div>
              <p style={{ 
                color: '#666', 
                fontFamily: 'Nunito, sans-serif',
                marginBottom: '20px'
              }}>
                광고를 시청하고 응원권을 받아보세요!
              </p>
              <button
                onClick={handleStartWatching}
                style={{
                  background: 'linear-gradient(135deg, #4CAF50, #45a049)',
                  color: 'white',
                  border: 'none',
                  padding: '15px 30px',
                  borderRadius: '25px',
                  fontSize: '16px',
                  fontFamily: 'Fredoka, sans-serif',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: '0 4px 8px rgba(76, 175, 80, 0.3)',
                  transition: 'all 0.3s ease'
                }}
              >
                광고 시청 시작하기
              </button>
            </div>
          )}

          {isWatching && (
            <div style={{ width: '100%' }}>
              <div style={{ fontSize: '48px', marginBottom: '15px' }}>⏳</div>
              <p style={{ 
                color: '#2E7D32', 
                fontFamily: 'Fredoka, sans-serif',
                fontSize: '18px',
                marginBottom: '15px'
              }}>
                광고 시청 중... ({formatTime(timeLeft)})
              </p>
              
              {/* 진행률 바 */}
              <div style={{
                width: '100%',
                backgroundColor: '#e0e0e0',
                borderRadius: '10px',
                height: '8px',
                marginBottom: '10px',
                overflow: 'hidden',
                boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{
                  width: `${adProgress}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #4CAF50, #45a049)',
                  borderRadius: '10px',
                  transition: 'width 1s ease',
                  boxShadow: '0 2px 4px rgba(76, 175, 80, 0.3)',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                    animation: 'shimmer 2s infinite'
                  }} />
                </div>
              </div>
              
              <p style={{ 
                color: '#666', 
                fontFamily: 'Nunito, sans-serif',
                fontSize: '14px'
              }}>
                광고를 끝까지 시청해주세요
              </p>
            </div>
          )}

          {isCompleted && (
            <div className="celebration">
              <div style={{ fontSize: '64px', marginBottom: '15px' }}>🎉</div>
              <h3 style={{ 
                color: '#4CAF50', 
                fontFamily: 'Fredoka, sans-serif',
                fontSize: '20px',
                marginBottom: '10px'
              }}>
                광고 시청 완료!
              </h3>
              <p style={{ 
                color: '#666', 
                fontFamily: 'Nunito, sans-serif',
                marginBottom: '20px'
              }}>
                응원권 1개를 획득했습니다! 🎫
              </p>
              <div style={{
                background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '20px',
                fontSize: '16px',
                fontFamily: 'Fredoka, sans-serif',
                fontWeight: 'bold',
                display: 'inline-block',
                boxShadow: '0 4px 8px rgba(255, 215, 0, 0.3)',
                animation: 'bounce 0.6s ease-in-out'
              }}>
                🎫 응원권 +1
              </div>
            </div>
          )}
        </div>

        {/* 보상 정보 */}
        <div style={{
          backgroundColor: 'rgba(76, 175, 80, 0.1)',
          borderRadius: '15px',
          padding: '15px',
          marginBottom: '20px'
        }}>
          <h4 style={{ 
            color: '#2E7D32', 
            fontFamily: 'Fredoka, sans-serif',
            margin: '0 0 10px 0',
            fontSize: '16px'
          }}>
            🎁 보상 정보
          </h4>
          <ul style={{ 
            color: '#666', 
            fontFamily: 'Nunito, sans-serif',
            margin: 0,
            paddingLeft: '20px',
            fontSize: '14px'
          }}>
            <li>응원권 1개 획득</li>
            <li>응원권으로 다른 사용자 응원 가능</li>
            <li>일일 최대 5회까지 시청 가능</li>
          </ul>
        </div>

        {/* 버튼들 */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          {!isWatching && (
            <button
              onClick={handleClose}
              style={{
                background: '#f5f5f5',
                color: '#666',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '20px',
                fontSize: '14px',
                fontFamily: 'Fredoka, sans-serif',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {isCompleted ? '확인' : '나중에 하기'}
            </button>
          )}
          
          {isCompleted && (
            <button
              onClick={handleClose}
              style={{
                background: 'linear-gradient(135deg, #4CAF50, #45a049)',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '20px',
                fontSize: '14px',
                fontFamily: 'Fredoka, sans-serif',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 4px 8px rgba(76, 175, 80, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 12px rgba(76, 175, 80, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 8px rgba(76, 175, 80, 0.3)';
              }}
            >
              완료
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideIn {
          from { 
            opacity: 0;
            transform: translateY(-50px) scale(0.9);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes progressBar {
          from { width: 0%; }
          to { width: 100%; }
        }
        
        @keyframes celebration {
          0% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.1) rotate(5deg); }
          50% { transform: scale(1.2) rotate(-5deg); }
          75% { transform: scale(1.1) rotate(3deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        
        .celebration {
          animation: celebration 0.6s ease-in-out;
        }
        
        .ad-modal-container {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          width: 100vw !important;
          height: 100vh !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        
        .ad-modal-content {
          position: relative !important;
          margin: 0 !important;
          transform: translate(0, 0) !important;
        }
        
        @media (max-width: 768px) {
          .ad-modal-content {
            padding: 20px !important;
            maxHeight: 95vh !important;
            width: 95% !important;
          }
        }
        
        @media (max-width: 480px) {
          .ad-modal-content {
            padding: 15px !important;
            maxHeight: 98vh !important;
            width: 98% !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AdRewardModal;

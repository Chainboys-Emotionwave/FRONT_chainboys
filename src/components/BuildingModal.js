import { useEffect } from 'react';

function BuildingModal({ building, isOpen, onClose, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !building) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      animation: 'fadeIn 0.3s ease-out'
    }}
    onClick={onClose}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '25px',
        border: `3px solid ${building.color}80`,
        boxShadow: `0 20px 40px ${building.color}30`,
        maxWidth: '90vw',
        maxHeight: '90vh',
        width: '800px',
        overflow: 'hidden',
        animation: 'slideIn 0.3s ease-out',
        backdropFilter: 'blur(10px)'
      }}
      onClick={(e) => e.stopPropagation()}>
        
        {/* 모달 헤더 */}
        <div style={{
          background: `linear-gradient(135deg, ${building.color} 0%, ${building.color}CC 100%)`,
          padding: '20px 30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: `2px solid ${building.color}80`
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{
              fontSize: '32px',
              animation: 'pulse 2s ease-in-out infinite'
            }}>
              {building.icon}
            </div>
            <div>
              <h2 style={{
                margin: 0,
                color: 'white',
                fontFamily: 'Fredoka, sans-serif',
                fontSize: '24px',
                textShadow: '2px 2px 0px rgba(0,0,0,0.3)'
              }}>
                {building.name}
              </h2>
              <p style={{
                margin: '4px 0 0 0',
                color: 'rgba(255, 255, 255, 0.9)',
                fontFamily: 'Nunito, sans-serif',
                fontSize: '14px'
              }}>
                {building.description}
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '20px',
              color: 'white',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.3)';
              e.target.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              e.target.style.transform = 'scale(1)';
            }}
          >
            ✕
          </button>
        </div>

        {/* 모달 내용 */}
        <div style={{
          padding: '30px',
          maxHeight: 'calc(90vh - 100px)',
          overflowY: 'auto'
        }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default BuildingModal;

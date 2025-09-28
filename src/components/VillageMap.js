import { useState } from 'react';

function VillageMap({ onBuildingClick }) {
  const [hoveredBuilding, setHoveredBuilding] = useState(null);

  const buildings = [
    {
      id: 'townhall',
      name: '마을회관',
      image: '🏛️',
      position: { top: '15%', left: '20%' },
      description: '마을 소개와 가이드',
      color: '#8BC34A',
      size: 'large',
      buildingType: 'townhall'
    },
    {
      id: 'musicstudio',
      name: '음악실',
      image: '🎵',
      position: { top: '25%', right: '15%' },
      description: '음악 업로드와 관리',
      color: '#2196F3',
      size: 'medium',
      buildingType: 'music'
    },
    {
      id: 'festivalground',
      name: '랭킹 라운지',
      image: '🏆',
      position: { top: '45%', left: '10%' },
      description: '랭킹과 순위',
      color: '#FF9800',
      size: 'large',
      buildingType: 'festival'
    },
    {
      id: 'residentscenter',
      name: '주민센터',
      image: '👥',
      position: { top: '60%', right: '20%' },
      description: '온라인 주민들',
      color: '#4CAF50',
      size: 'medium',
      buildingType: 'residents'
    },
    {
      id: 'badgehall',
      name: '훈장관',
      image: '🏅',
      position: { top: '75%', left: '25%' },
      description: '명예의 훈장',
      color: '#9C27B0',
      size: 'small',
      buildingType: 'badge'
    },
    {
      id: 'treasury',
      name: '금고',
      image: '💰',
      position: { top: '35%', left: '50%' },
      description: '공동 금고',
      color: '#FFC107',
      size: 'small',
      buildingType: 'treasury'
    },
    {
      id: 'artgallery',
      name: '아트갤러리',
      image: '🎨',
      position: { top: '55%', right: '35%' },
      description: '아티스트별 마을',
      color: '#E91E63',
      size: 'medium',
      buildingType: 'gallery'
    },
    {
      id: 'eventhall',
      name: '축제 홀',
      image: '🎊',
      position: { top: '80%', right: '10%' },
      description: '축제와 이벤트',
      color: '#F44336',
      size: 'medium',
      buildingType: 'event'
    }
  ];

  const getBuildingSize = (size) => {
    switch (size) {
      case 'large': return { width: '80px', height: '80px', fontSize: '36px' };
      case 'medium': return { width: '70px', height: '70px', fontSize: '32px' };
      case 'small': return { width: '60px', height: '60px', fontSize: '28px' };
      default: return { width: '60px', height: '60px', fontSize: '28px' };
    }
  };

  const getBuildingComponent = (building) => {
    const size = getBuildingSize(building.size);
    
    // 마을회관은 CSS로 렌더링
    if (building.buildingType === 'townhall') {
      return (
        <div className="village-hall-container">
          {/* 마을회관 기본 구조 */}
          <div className="village-hall-base"></div>
          
          {/* 기둥들 */}
          <div className="village-hall-column-left"></div>
          <div className="village-hall-column-left-inner-1"></div>
          <div className="village-hall-column-left-inner-2"></div>
          <div className="village-hall-column-left-inner-3"></div>
          <div className="village-hall-column-left-inner-4"></div>
          
          <div className="village-hall-column-right"></div>
          <div className="village-hall-column-right-inner-1"></div>
          <div className="village-hall-column-right-inner-2"></div>
          <div className="village-hall-column-right-inner-3"></div>
          <div className="village-hall-column-right-inner-4"></div>
          
          {/* 문 */}
          <div className="village-hall-door"></div>
          <div className="village-hall-door-knob-1"></div>
          <div className="village-hall-door-knob-2"></div>
          <div className="village-hall-door-line"></div>
          
          {/* 지붕 */}
          <div className="village-hall-roof"></div>
          <div className="village-hall-roof-triangle"></div>
          
          {/* 간판 */}
          <div className="village-hall-sign"></div>
          <div className="village-hall-sign-text">
            <span>마을 회관</span>
          </div>
          
          {/* 창문들 */}
          <div className="village-hall-window-1"></div>
          <div className="village-hall-window-2"></div>
          
          {/* 깃발 */}
          <div className="village-hall-flag-union"></div>
          <div className="village-hall-flag-pole"></div>
          <div className="village-hall-flag"></div>
          <div className="village-hall-flag-top"></div>
        </div>
      );
    }
    
    // 다른 건물들은 임시로 간단한 CSS로 표시 (나중에 교체 예정)
    return (
      <div style={{
        width: size.width,
        height: size.height,
        background: building.color,
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size.fontSize,
        border: '2px solid rgba(0,0,0,0.2)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        {building.image}
      </div>
    );
  };

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '700px',
      background: `
        radial-gradient(circle at 20% 30%, rgba(139, 195, 74, 0.08) 0%, transparent 60%),
        radial-gradient(circle at 80% 70%, rgba(33, 150, 243, 0.08) 0%, transparent 60%),
        radial-gradient(circle at 50% 50%, rgba(255, 193, 7, 0.05) 0%, transparent 70%),
        linear-gradient(135deg, #f8f9fa 0%, #e9ecef 20%, #dee2e6 40%, #ced4da 60%, #adb5bd 80%, #6c757d 100%)
      `,
      borderRadius: '0',
      border: 'none',
      overflow: 'hidden',
      boxShadow: `
        0 0 0 2px #8B4513,
        0 0 0 4px #D2691E,
        0 0 0 6px #CD853F,
        0 0 0 8px #DEB887,
        0 0 0 10px #F5DEB3,
        0 0 0 12px #FFF8DC,
        0 25px 50px rgba(0,0,0,0.3),
        inset 0 1px 0 rgba(255,255,255,0.1)
      `,
      backgroundImage: `
        url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%236c757d' fill-opacity='0.03'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")
      `,
      position: 'relative',
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: '-2px',
        left: '-2px',
        right: '-2px',
        bottom: '-2px',
        background: 'linear-gradient(45deg, #8B4513, #D2691E, #CD853F, #DEB887, #F5DEB3, #FFF8DC)',
        zIndex: -1,
        borderRadius: '0'
      }
    }}>
      {/* 하늘과 구름들 */}
      <div style={{
        position: 'absolute',
        top: '5%',
        left: '10%',
        fontSize: '32px',
        animation: 'float 6s ease-in-out infinite',
        opacity: 0.8,
        filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))'
      }}>☁️</div>
      
      <div style={{
        position: 'absolute',
        top: '8%',
        right: '15%',
        fontSize: '28px',
        animation: 'float 7s ease-in-out infinite reverse',
        opacity: 0.7,
        filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))'
      }}>☁️</div>

      <div style={{
        position: 'absolute',
        top: '12%',
        left: '60%',
        fontSize: '24px',
        animation: 'float 8s ease-in-out infinite',
        opacity: 0.6,
        filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))'
      }}>☁️</div>

      {/* 나무들과 자연 환경 */}
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '5%',
        fontSize: '40px',
        animation: 'sway 4s ease-in-out infinite',
        opacity: 0.9,
        filter: 'drop-shadow(3px 3px 6px rgba(0,0,0,0.2))'
      }}>🌳</div>

      <div style={{
        position: 'absolute',
        bottom: '15%',
        right: '8%',
        fontSize: '36px',
        animation: 'sway 5s ease-in-out infinite reverse',
        opacity: 0.8,
        filter: 'drop-shadow(3px 3px 6px rgba(0,0,0,0.2))'
      }}>🌲</div>

      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '15%',
        fontSize: '32px',
        animation: 'sway 3.5s ease-in-out infinite',
        opacity: 0.7,
        filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))'
      }}>🌳</div>

      <div style={{
        position: 'absolute',
        bottom: '25%',
        right: '25%',
        fontSize: '28px',
        animation: 'sway 4.5s ease-in-out infinite reverse',
        opacity: 0.8,
        filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))'
      }}>🌲</div>

      {/* 꽃들과 작은 자연 요소들 */}
      <div style={{
        position: 'absolute',
        top: '70%',
        left: '65%',
        fontSize: '20px',
        animation: 'bounce 3s ease-in-out infinite',
        opacity: 0.9,
        filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.1))'
      }}>🌸</div>

      <div style={{
        position: 'absolute',
        top: '45%',
        left: '75%',
        fontSize: '18px',
        animation: 'bounce 3.5s ease-in-out infinite reverse',
        opacity: 0.8,
        filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.1))'
      }}>🌺</div>

      <div style={{
        position: 'absolute',
        top: '65%',
        left: '85%',
        fontSize: '16px',
        animation: 'bounce 2.5s ease-in-out infinite',
        opacity: 0.9,
        filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.1))'
      }}>🌼</div>

      <div style={{
        position: 'absolute',
        top: '35%',
        left: '90%',
        fontSize: '14px',
        animation: 'bounce 4s ease-in-out infinite reverse',
        opacity: 0.7,
        filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.1))'
      }}>🌻</div>

      {/* 연못과 물가 */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '40%',
        width: '120px',
        height: '80px',
        background: `
          radial-gradient(ellipse at center, 
            rgba(33, 150, 243, 0.3) 0%, 
            rgba(33, 150, 243, 0.2) 40%, 
            rgba(76, 175, 80, 0.1) 70%, 
            transparent 100%
          )
        `,
        borderRadius: '50%',
        opacity: 0.8,
        animation: 'pulse 4s ease-in-out infinite',
        filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))',
        border: '2px solid rgba(33, 150, 243, 0.2)'
      }}></div>

      {/* 연못 주변 갈대 */}
      <div style={{
        position: 'absolute',
        top: '45%',
        left: '35%',
        fontSize: '16px',
        animation: 'sway 3s ease-in-out infinite',
        opacity: 0.8
      }}>🌾</div>

      <div style={{
        position: 'absolute',
        top: '48%',
        right: '35%',
        fontSize: '14px',
        animation: 'sway 3.5s ease-in-out infinite reverse',
        opacity: 0.7
      }}>🌾</div>

      {/* 실제적인 길들 */}
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '0',
        right: '0',
        height: '8px',
        background: `
          linear-gradient(90deg, 
            #8D6E63 0%, 
            #A1887F 20%, 
            #BCAAA4 40%, 
            #A1887F 60%, 
            #8D6E63 100%
          )
        `,
        borderRadius: '4px',
        opacity: 0.8,
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        border: '1px solid rgba(139, 108, 99, 0.3)'
      }}></div>

      <div style={{
        position: 'absolute',
        top: '0',
        bottom: '0',
        left: '30%',
        width: '8px',
        background: `
          linear-gradient(180deg, 
            #8D6E63 0%, 
            #A1887F 20%, 
            #BCAAA4 40%, 
            #A1887F 60%, 
            #8D6E63 100%
          )
        `,
        borderRadius: '4px',
        opacity: 0.8,
        boxShadow: '2px 0 4px rgba(0,0,0,0.2)',
        border: '1px solid rgba(139, 108, 99, 0.3)'
      }}></div>

      {/* 보조 길들 */}
      <div style={{
        position: 'absolute',
        top: '60%',
        left: '20%',
        right: '20%',
        height: '4px',
        background: `
          linear-gradient(90deg, 
            #A1887F 0%, 
            #BCAAA4 50%, 
            #A1887F 100%
          )
        `,
        borderRadius: '2px',
        opacity: 0.6,
        boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
      }}></div>

      <div style={{
        position: 'absolute',
        top: '20%',
        bottom: '20%',
        left: '60%',
        width: '4px',
        background: `
          linear-gradient(180deg, 
            #A1887F 0%, 
            #BCAAA4 50%, 
            #A1887F 100%
          )
        `,
        borderRadius: '2px',
        opacity: 0.6,
        boxShadow: '1px 0 2px rgba(0,0,0,0.1)'
      }}></div>

      {/* 건물들 */}
      {buildings.map((building) => {
        const size = getBuildingSize(building.size);
        return (
          <div
            key={building.id}
            style={{
              position: 'absolute',
              ...building.position,
              transform: 'translate(-50%, -50%)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              zIndex: 10
            }}
            onMouseEnter={() => setHoveredBuilding(building.id)}
            onMouseLeave={() => setHoveredBuilding(null)}
            onClick={() => onBuildingClick(building)}
          >
            {/* 건물 본체 */}
            <div style={{
              width: size.width,
              height: size.height,
              background: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: hoveredBuilding === building.id ? 'scale(1.15) translateY(-5px)' : 'scale(1)',
              position: 'relative',
              transition: 'all 0.3s ease',
                  filter: hoveredBuilding === building.id 
                    ? 'drop-shadow(0 0 15px rgba(255,255,255,0.8)) drop-shadow(0 0 25px rgba(255,255,255,0.4))' 
                    : 'none',
                  animation: hoveredBuilding === building.id ? 'pulse 0.6s ease-in-out' : 'none'
            }}>
              {getBuildingComponent(building)}
            </div>

            {/* 건물 이름 라벨 */}
            <div style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              marginTop: '8px',
              background: 'rgba(0, 0, 0, 0.8)',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '8px',
              fontSize: '11px',
              fontFamily: 'Quicksand, sans-serif',
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              zIndex: 20,
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              {building.name}
            </div>

            {/* 호버 시 추가 정보 - 건물 아래로 이동 */}
            {hoveredBuilding === building.id && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(0, 0, 0, 0.9)',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '12px',
                fontSize: '12px',
                fontFamily: 'Nunito, sans-serif',
                whiteSpace: 'nowrap',
                zIndex: 30,
                animation: 'float 0.3s ease-out',
                boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
                border: '1px solid rgba(255,255,255,0.2)',
                marginTop: '8px'
              }}>
                {building.description}
                <div style={{
                  position: 'absolute',
                  bottom: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 0,
                  height: 0,
                  borderLeft: '6px solid transparent',
                  borderRight: '6px solid transparent',
                  borderBottom: '6px solid rgba(0, 0, 0, 0.9)'
                }}></div>
              </div>
            )}
          </div>
        );
      })}

      {/* 지도 제목 - 종이 지도 스타일 */}
      <div className="village-title" style={{
        position: 'absolute',
        top: '2%',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(255, 248, 220, 0.95)',
        padding: '10px 120px',
        borderRadius: '0',
        border: '3px solid #8B4513',
        boxShadow: `
          0 0 0 2px #D2691E,
          0 0 0 4px #CD853F,
          0 8px 20px rgba(0,0,0,0.2)
        `,
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        position: 'relative',
        minWidth: '800px',
        whiteSpace: 'nowrap',
        maxWidth: '98vw',
        wordBreak: 'keep-all',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <h2 style={{
          margin: 0,
          color: '#8B4513',
          fontFamily: 'Fredoka, sans-serif',
          fontSize: '16px',
          textAlign: 'center',
          fontWeight: 'bold',
          textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          wordBreak: 'keep-all',
          display: 'inline-block',
          width: '100%'
        }}>
          🗺️ EmotionWave Village
        </h2>
        <p style={{
          margin: '4px 0 0 0',
          color: '#A0522D',
          fontFamily: 'Nunito, sans-serif',
          fontSize: '12px',
          textAlign: 'center',
          fontWeight: 'bold',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          wordBreak: 'keep-all',
          display: 'inline-block',
          width: '100%'
        }}>
          K-POP 팬들의 특별한 마을
        </p>
        {/* 종이 접힌 효과 */}
        <div style={{
          position: 'absolute',
          top: '0',
          right: '0',
          width: '0',
          height: '0',
          borderLeft: '20px solid transparent',
          borderTop: '20px solid #DEB887'
        }}></div>
      </div>

      {/* 지도 안내 텍스트 - 종이 지도 스타일 */}
      <div className="village-guide" style={{
        position: 'absolute',
        bottom: '2%',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(255, 248, 220, 0.95)',
        padding: '8px 100px',
        borderRadius: '0',
        border: '2px solid #8B4513',
        boxShadow: `
          0 0 0 1px #D2691E,
          0 0 0 2px #CD853F,
          0 4px 12px rgba(0,0,0,0.15)
        `,
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        minWidth: '900px',
        whiteSpace: 'nowrap',
        maxWidth: '98vw',
        wordBreak: 'keep-all',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <p style={{
          margin: 0,
          color: '#8B4513',
          fontFamily: 'Nunito, sans-serif',
          fontSize: '14px',
          textAlign: 'center',
          fontWeight: 'bold',
          textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          wordBreak: 'keep-all',
          display: 'inline-block',
          width: '100%'
        }}>
          🖱️ 건물을 클릭하여 상세 정보를 확인하세요
        </p>
      </div>

      {/* 반응형 스타일 */}
      <style jsx>{`
        @media (max-width: 768px) {
          .village-title {
            min-width: 600px !important;
            padding: 8px 80px !important;
          }
          .village-title h2 {
            font-size: 14px !important;
          }
          .village-title p {
            font-size: 10px !important;
          }
          .village-guide {
            min-width: 700px !important;
            padding: 6px 60px !important;
          }
          .village-guide p {
            font-size: 12px !important;
          }
        }
        
        @media (max-width: 480px) {
          .village-title {
            min-width: 500px !important;
            padding: 6px 60px !important;
          }
          .village-title h2 {
            font-size: 12px !important;
          }
          .village-title p {
            font-size: 8px !important;
          }
          .village-guide {
            min-width: 600px !important;
            padding: 4px 40px !important;
          }
          .village-guide p {
            font-size: 10px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default VillageMap;

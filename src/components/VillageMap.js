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
      color: '#9ACD32',  // 연두색
      size: 'large',
      buildingType: 'townhall'
    },
    {
      id: 'musicstudio',
      name: '음악실',
      image: '🎵',
      position: { top: '25%', right: '15%' },
      description: '음악 업로드와 관리',
      color: '#4169E1',  // 파란색
      size: 'medium',
      buildingType: 'music'
    },
    {
      id: 'festivalground',
      name: '랭킹 라운지',
      image: '🏆',
      position: { top: '45%', left: '10%' },
      description: '랭킹과 순위',
      color: '#FF8C00',  // 주황색
      size: 'large',
      buildingType: 'festival'
    },
    {
      id: 'residentscenter',
      name: '주민센터',
      image: '👥',
      position: { top: '60%', right: '20%' },
      description: '온라인 주민들',
      color: '#228B22',  // 진한 초록색
      size: 'medium',
      buildingType: 'residents'
    },
    {
      id: 'badgehall',
      name: '훈장관',
      image: '🏅',
      position: { top: '75%', left: '25%' },
      description: '명예의 훈장',
      color: '#9370DB',  // 보라색
      size: 'small',
      buildingType: 'badge'
    },
    {
      id: 'treasury',
      name: '금고',
      image: '💰',
      position: { top: '35%', left: '50%' },
      description: '공동 금고',
      color: '#FFD700',  // 노랑색
      size: 'small',
      buildingType: 'treasury'
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
    
    // 마을회관 - 고전적 정부청사
    if (building.buildingType === 'townhall') {
      return (
        <svg width={size.width} height={size.height} viewBox="0 0 80 80" style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))' }}>
          {/* 건물 본체 */}
          <rect x="10" y="30" width="60" height="40" fill="#9ACD32" stroke="#7CB342" strokeWidth="2"/>
          {/* 지붕 */}
          <polygon points="5,30 40,10 75,30" fill="#DC143C" stroke="#B22222" strokeWidth="2"/>
          {/* 기둥들 */}
          <rect x="20" y="35" width="4" height="30" fill="#D2691E"/>
          <rect x="56" y="35" width="4" height="30" fill="#D2691E"/>
          {/* 문 */}
          <rect x="35" y="50" width="10" height="20" fill="#654321"/>
          <circle cx="42" cy="60" r="1" fill="#FFD700"/>
          {/* 창문들 */}
          <rect x="15" y="40" width="6" height="8" fill="#87CEEB"/>
          <rect x="59" y="40" width="6" height="8" fill="#87CEEB"/>
          {/* 깃발 */}
          <rect x="65" y="15" width="8" height="6" fill="#FFD700"/>
          <line x1="69" y1="15" x2="69" y2="30" stroke="#8B4513" strokeWidth="2"/>
        </svg>
      );
    }
    
    // 음악실 - 현대적 스튜디오
    if (building.buildingType === 'music') {
      return (
        <svg width={size.width} height={size.height} viewBox="0 0 80 80" style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))' }}>
          {/* 건물 본체 */}
          <rect x="15" y="25" width="50" height="45" fill="#4169E1" stroke="#1E90FF" strokeWidth="2" rx="8"/>
          {/* 지붕 */}
          <rect x="10" y="20" width="60" height="10" fill="#FF6347" rx="5"/>
          {/* 창문들 */}
          <rect x="25" y="35" width="8" height="10" fill="#87CEEB" rx="2"/>
          <rect x="47" y="35" width="8" height="10" fill="#87CEEB" rx="2"/>
          {/* 문 */}
          <rect x="35" y="55" width="10" height="15" fill="#1E90FF" rx="2"/>
          {/* 음표 장식 */}
          <circle cx="40" cy="30" r="3" fill="#FFD700"/>
          <path d="M40,33 L40,45 M37,42 L43,42" stroke="#FFD700" strokeWidth="2" fill="none"/>
        </svg>
      );
    }
    
    // 축제장 - 원형 콘서트홀
    if (building.buildingType === 'festival') {
      return (
        <svg width={size.width} height={size.height} viewBox="0 0 80 80" style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))' }}>
          {/* 원형 건물 */}
          <circle cx="40" cy="45" r="25" fill="#FF8C00" stroke="#FF6347" strokeWidth="3"/>
          {/* 지붕 */}
          <polygon points="15,45 40,20 65,45" fill="#DC143C"/>
          {/* 문 */}
          <rect x="37" y="55" width="6" height="15" fill="#8B4513" rx="3"/>
          {/* 깃발들 */}
          <rect x="20" y="25" width="3" height="8" fill="#FFD700"/>
          <rect x="57" y="25" width="3" height="8" fill="#FFD700"/>
          <rect x="38" y="25" width="3" height="8" fill="#FFD700"/>
          {/* 장식 */}
          <circle cx="30" cy="40" r="2" fill="#FFD700"/>
          <circle cx="50" cy="40" r="2" fill="#FFD700"/>
        </svg>
      );
    }
    
    // 주민센터 - 친근한 커뮤니티 센터
    if (building.buildingType === 'residents') {
      return (
        <svg width={size.width} height={size.height} viewBox="0 0 80 80" style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))' }}>
          {/* 건물 본체 */}
          <rect x="20" y="30" width="40" height="40" fill="#228B22" stroke="#006400" strokeWidth="2" rx="6"/>
          {/* 지붕 */}
          <rect x="15" y="25" width="50" height="8" fill="#8B4513" rx="4"/>
          {/* 창문들 */}
          <rect x="28" y="40" width="6" height="8" fill="#87CEEB" rx="2"/>
          <rect x="46" y="40" width="6" height="8" fill="#87CEEB" rx="2"/>
          {/* 문 */}
          <rect x="36" y="55" width="8" height="15" fill="#654321" rx="2"/>
          {/* 꽃 장식 */}
          <circle cx="40" cy="35" r="2" fill="#FF69B4"/>
          <circle cx="35" cy="37" r="1" fill="#FFB6C1"/>
          <circle cx="45" cy="37" r="1" fill="#FFB6C1"/>
          <circle cx="37" cy="40" r="1" fill="#FFB6C1"/>
          <circle cx="43" cy="40" r="1" fill="#FFB6C1"/>
        </svg>
      );
    }
    
    // 훈장관 - 고전적 기념관
    if (building.buildingType === 'badge') {
      return (
        <svg width={size.width} height={size.height} viewBox="0 0 80 80" style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))' }}>
          {/* 건물 본체 */}
          <rect x="25" y="35" width="30" height="35" fill="#9370DB" stroke="#8A2BE2" strokeWidth="2"/>
          {/* 지붕 */}
          <polygon points="20,35 40,15 60,35" fill="#FFD700" stroke="#FFA500" strokeWidth="2"/>
          {/* 기둥 */}
          <rect x="38" y="40" width="4" height="25" fill="#DDA0DD"/>
          {/* 문 */}
          <rect x="35" y="55" width="10" height="15" fill="#8A2BE2" rx="2"/>
          {/* 훈장 */}
          <circle cx="40" cy="45" r="6" fill="#FFD700" stroke="#FFA500" strokeWidth="2"/>
          <polygon points="40,39 42,45 40,51 38,45" fill="#FFA500"/>
          <circle cx="40" cy="45" r="2" fill="#FF6347"/>
        </svg>
      );
    }
    
    // 금고 - 견고한 보안 건물
    if (building.buildingType === 'treasury') {
      return (
        <svg width={size.width} height={size.height} viewBox="0 0 80 80" style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))' }}>
          {/* 건물 본체 */}
          <rect x="20" y="30" width="40" height="40" fill="#FFD700" stroke="#FFA500" strokeWidth="3" rx="4"/>
          {/* 지붕 */}
          <rect x="15" y="25" width="50" height="8" fill="#708090" rx="4"/>
          {/* 금고 문 */}
          <rect x="30" y="45" width="20" height="20" fill="#2F4F4F" rx="10"/>
          {/* 금고 손잡이 */}
          <circle cx="40" cy="55" r="3" fill="#FFD700"/>
          <rect x="38" y="52" width="4" height="6" fill="#FFA500"/>
          {/* 보안등 */}
          <circle cx="25" y="35" r="2" fill="#FF0000"/>
          <circle cx="55" y="35" r="2" fill="#FF0000"/>
          {/* 보안선 */}
          <line x1="20" y1="40" x2="60" y2="40" stroke="#FF0000" strokeWidth="1" strokeDasharray="2,2"/>
        </svg>
      );
    }
    
    
    // 축제 홀 - 화려한 이벤트 건물
    if (building.buildingType === 'event') {
      return (
        <svg width={size.width} height={size.height} viewBox="0 0 80 80" style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))' }}>
          {/* 건물 본체 */}
          <rect x="15" y="30" width="50" height="40" fill="#FF4500" stroke="#DC143C" strokeWidth="2" rx="6"/>
          {/* 지붕 */}
          <polygon points="10,30 40,10 70,30" fill="#FFD700" stroke="#FFA500" strokeWidth="2"/>
          {/* 창문들 */}
          <rect x="25" y="40" width="8" height="12" fill="#87CEEB" rx="2"/>
          <rect x="47" y="40" width="8" height="12" fill="#87CEEB" rx="2"/>
          {/* 문 */}
          <rect x="35" y="55" width="10" height="15" fill="#8B4513" rx="2"/>
          {/* 축제 깃발들 */}
          <rect x="20" y="20" width="2" height="6" fill="#FFD700"/>
          <rect x="58" y="20" width="2" height="6" fill="#FFD700"/>
          <rect x="39" y="20" width="2" height="6" fill="#FFD700"/>
          <rect x="25" y="20" width="2" height="6" fill="#FF6347"/>
          <rect x="53" y="20" width="2" height="6" fill="#FF6347"/>
          {/* 장식 */}
          <circle cx="30" cy="45" r="2" fill="#FFD700"/>
          <circle cx="50" cy="45" r="2" fill="#FFD700"/>
        </svg>
      );
    }
    
    // 기본 건물 (fallback)
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
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      '&::before': {
        content: '""',
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

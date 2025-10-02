import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import levelService from '../services/levelService';

function VillageMap({ onBuildingClick }) {
  const [hoveredBuilding, setHoveredBuilding] = useState(null);
  const { userLevel } = useAuth();
  
  // 사용자 레벨에 따른 지도 이미지 결정
  const getMapBackground = () => {
    if (userLevel) {
      return levelService.getMapImage(userLevel.level);
    }
    // 로그인하지 않은 경우 기본 지도 (레벨 1)
    return '/map_1.jpg';
  };

  const buildings = [
    {
      id: 'townhall',
      name: '마을회관',
      image: '🏛️',
      position: { top: '19%', left: '17%' },
      description: '마을 소개와 가이드',
      color: '#9ACD32',  // 연두색
      size: 'large',
      buildingType: 'townhall'
    },
    {
      id: 'musicstudio',
      name: '음악실',
      image: '🎵',
      position: { top: '20%', right: '0.3%' },
      description: '음악 업로드와 관리',
      color: '#4169E1',  // 파란색
      size: 'medium',
      buildingType: 'music'
    },
    {
      id: 'festivalground',
      name: '랭킹 라운지',
      image: '🏆',
      position: { top: '68%', left: '23%' },
      description: '랭킹과 순위',
      color: '#FF8C00',  // 주황색
      size: 'large',
      buildingType: 'festival'
    },
    {
      id: 'residentscenter',
      name: '주민센터',
      image: '👥',
      position: { top: '75%', right: '32%' },
      description: '온라인 주민들',
      color: '#228B22',  // 진한 초록색
      size: 'medium',
      buildingType: 'residents'
    },
    {
      id: 'badgehall',
      name: '훈장관',
      image: '🏅',
      position: { top: '23%', left: '45%' },
      description: '명예의 훈장',
      color: '#9370DB',  // 보라색
      size: 'small',
      buildingType: 'badge'
    },
    {
      id: 'treasury',
      name: '금고',
      image: '💰',
      position: { top: '15%', left: '65%' },
      description: '공동 금고',
      color: '#FFD700',  // 노랑색
      size: 'small',
      buildingType: 'treasury'
    },
    {
      id: 'eventhall',
      name: '축제 홀',
      image: '🎊',
      position: { top: '65%', right: '7%' },
      description: '축제와 이벤트',
      color: '#F44336',
      size: 'medium',
      buildingType: 'event'
    }
  ];

  const getBuildingSize = (size) => {
    switch (size) {
      case 'large': return { width: '160px', height: '160px', fontSize: '72px' };
      case 'medium': return { width: '140px', height: '140px', fontSize: '64px' };
      case 'small': return { width: '120px', height: '120px', fontSize: '56px' };
      default: return { width: '120px', height: '120px', fontSize: '56px' };
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
      backgroundImage: `url("${getMapBackground()}")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
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


    </div>
  );
}

export default VillageMap;

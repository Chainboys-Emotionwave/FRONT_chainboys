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
      name: '축제장',
      image: '🏆',
      position: { top: '45%', left: '10%' },
      description: '랭킹과 축제',
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
      name: '이벤트홀',
      image: '🎊',
      position: { top: '80%', right: '10%' },
      description: '실시간 이벤트',
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

  const getBuildingImage = (buildingType, size) => {
    const sizeMap = {
      large: { width: 80, height: 80 },
      medium: { width: 70, height: 70 },
      small: { width: 60, height: 60 }
    };
    
    const dimensions = sizeMap[size] || sizeMap.medium;
    
    // SVG로 건물 이미지 생성
    const buildingSVGs = {
      townhall: `
        <svg width="${dimensions.width}" height="${dimensions.height}" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
          <!-- 건물 본체 -->
          <rect x="10" y="30" width="60" height="50" fill="#8BC34A" stroke="#689F38" stroke-width="2"/>
          <!-- 지붕 -->
          <polygon points="5,30 40,5 75,30" fill="#689F38" stroke="#4CAF50" stroke-width="2"/>
          <!-- 기둥들 -->
          <rect x="20" y="40" width="4" height="30" fill="#4CAF50"/>
          <rect x="30" y="40" width="4" height="30" fill="#4CAF50"/>
          <rect x="46" y="40" width="4" height="30" fill="#4CAF50"/>
          <rect x="56" y="40" width="4" height="30" fill="#4CAF50"/>
          <!-- 문 -->
          <rect x="35" y="50" width="10" height="20" fill="#5D4037" stroke="#3E2723" stroke-width="1"/>
          <!-- 창문들 -->
          <rect x="25" y="45" width="6" height="8" fill="#81C784" stroke="#4CAF50" stroke-width="1"/>
          <rect x="49" y="45" width="6" height="8" fill="#81C784" stroke="#4CAF50" stroke-width="1"/>
          <!-- 깃발 -->
          <rect x="38" y="5" width="4" height="15" fill="#8D6E63"/>
          <polygon points="42,5 50,10 42,15" fill="#F44336"/>
        </svg>
      `,
      music: `
        <svg width="${dimensions.width}" height="${dimensions.height}" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
          <!-- 건물 본체 -->
          <rect x="10" y="25" width="50" height="45" fill="#2196F3" stroke="#1976D2" stroke-width="2"/>
          <!-- 지붕 -->
          <polygon points="5,25 35,5 65,25" fill="#1976D2" stroke="#1565C0" stroke-width="2"/>
          <!-- 음표 장식 -->
          <circle cx="25" cy="15" r="3" fill="#FFEB3B"/>
          <rect x="24" y="18" width="2" height="8" fill="#FFEB3B"/>
          <circle cx="45" cy="15" r="3" fill="#FFEB3B"/>
          <rect x="44" y="18" width="2" height="8" fill="#FFEB3B"/>
          <!-- 문 -->
          <rect x="30" y="45" width="10" height="20" fill="#5D4037" stroke="#3E2723" stroke-width="1"/>
          <!-- 창문들 -->
          <rect x="20" y="35" width="6" height="8" fill="#64B5F6" stroke="#1976D2" stroke-width="1"/>
          <rect x="44" y="35" width="6" height="8" fill="#64B5F6" stroke="#1976D2" stroke-width="1"/>
          <!-- 스피커 -->
          <rect x="15" y="50" width="8" height="15" fill="#424242" stroke="#212121" stroke-width="1"/>
          <rect x="47" y="50" width="8" height="15" fill="#424242" stroke="#212121" stroke-width="1"/>
        </svg>
      `,
      festival: `
        <svg width="${dimensions.width}" height="${dimensions.height}" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
          <!-- 건물 본체 -->
          <rect x="10" y="30" width="60" height="50" fill="#FF9800" stroke="#F57C00" stroke-width="2"/>
          <!-- 지붕 -->
          <polygon points="5,30 40,5 75,30" fill="#F57C00" stroke="#EF6C00" stroke-width="2"/>
          <!-- 깃발들 -->
          <rect x="20" y="5" width="2" height="20" fill="#8D6E63"/>
          <polygon points="22,5 30,10 22,15" fill="#F44336"/>
          <rect x="35" y="5" width="2" height="20" fill="#8D6E63"/>
          <polygon points="37,5 45,10 37,15" fill="#4CAF50"/>
          <rect x="50" y="5" width="2" height="20" fill="#8D6E63"/>
          <polygon points="52,5 60,10 52,15" fill="#2196F3"/>
          <!-- 문 -->
          <rect x="35" y="50" width="10" height="20" fill="#5D4037" stroke="#3E2723" stroke-width="1"/>
          <!-- 창문들 -->
          <rect x="25" y="40" width="6" height="8" fill="#FFB74D" stroke="#F57C00" stroke-width="1"/>
          <rect x="49" y="40" width="6" height="8" fill="#FFB74D" stroke="#F57C00" stroke-width="1"/>
          <!-- 무대 -->
          <rect x="15" y="60" width="50" height="8" fill="#8D6E63" stroke="#5D4037" stroke-width="1"/>
        </svg>
      `,
      residents: `
        <svg width="${dimensions.width}" height="${dimensions.height}" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
          <!-- 건물 본체 -->
          <rect x="10" y="25" width="50" height="45" fill="#4CAF50" stroke="#388E3C" stroke-width="2"/>
          <!-- 지붕 -->
          <polygon points="5,25 35,5 65,25" fill="#388E3C" stroke="#2E7D32" stroke-width="2"/>
          <!-- 사람들 실루엣 -->
          <circle cx="25" cy="15" r="4" fill="#81C784"/>
          <rect x="22" y="19" width="6" height="8" fill="#81C784"/>
          <circle cx="45" cy="15" r="4" fill="#81C784"/>
          <rect x="42" y="19" width="6" height="8" fill="#81C784"/>
          <!-- 문 -->
          <rect x="30" y="45" width="10" height="20" fill="#5D4037" stroke="#3E2723" stroke-width="1"/>
          <!-- 창문들 -->
          <rect x="20" y="35" width="6" height="8" fill="#A5D6A7" stroke="#388E3C" stroke-width="1"/>
          <rect x="44" y="35" width="6" height="8" fill="#A5D6A7" stroke="#388E3C" stroke-width="1"/>
          <!-- 계단 -->
          <rect x="25" y="65" width="20" height="3" fill="#8D6E63" stroke="#5D4037" stroke-width="1"/>
        </svg>
      `,
      badge: `
        <svg width="${dimensions.width}" height="${dimensions.height}" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
          <!-- 건물 본체 -->
          <rect x="8" y="20" width="44" height="40" fill="#9C27B0" stroke="#7B1FA2" stroke-width="2"/>
          <!-- 지붕 -->
          <polygon points="5,20 30,5 55,20" fill="#7B1FA2" stroke="#6A1B9A" stroke-width="2"/>
          <!-- 훈장 장식 -->
          <circle cx="30" cy="12" r="6" fill="#FFD700" stroke="#FFC107" stroke-width="2"/>
          <polygon points="30,8 32,14 26,14" fill="#FF5722"/>
          <!-- 문 -->
          <rect x="25" y="40" width="10" height="15" fill="#5D4037" stroke="#3E2723" stroke-width="1"/>
          <!-- 창문들 -->
          <rect x="18" y="30" width="5" height="6" fill="#BA68C8" stroke="#7B1FA2" stroke-width="1"/>
          <rect x="37" y="30" width="5" height="6" fill="#BA68C8" stroke="#7B1FA2" stroke-width="1"/>
          <!-- 기둥 -->
          <rect x="28" y="55" width="4" height="5" fill="#8D6E63"/>
        </svg>
      `,
      treasury: `
        <svg width="${dimensions.width}" height="${dimensions.height}" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
          <!-- 건물 본체 -->
          <rect x="8" y="20" width="44" height="40" fill="#FFC107" stroke="#FF8F00" stroke-width="2"/>
          <!-- 지붕 -->
          <polygon points="5,20 30,5 55,20" fill="#FF8F00" stroke="#FF6F00" stroke-width="2"/>
          <!-- 금고 장식 -->
          <rect x="25" y="10" width="10" height="8" fill="#FFD700" stroke="#FFC107" stroke-width="1"/>
          <circle cx="30" cy="14" r="2" fill="#FF5722"/>
          <!-- 문 -->
          <rect x="25" y="40" width="10" height="15" fill="#5D4037" stroke="#3E2723" stroke-width="1"/>
          <!-- 창문들 -->
          <rect x="18" y="30" width="5" height="6" fill="#FFE082" stroke="#FF8F00" stroke-width="1"/>
          <rect x="37" y="30" width="5" height="6" fill="#FFE082" stroke="#FF8F00" stroke-width="1"/>
          <!-- 금고 문 -->
          <rect x="26" y="42" width="8" height="10" fill="#424242" stroke="#212121" stroke-width="1"/>
          <circle cx="30" cy="47" r="1" fill="#FFD700"/>
        </svg>
      `,
      gallery: `
        <svg width="${dimensions.width}" height="${dimensions.height}" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
          <!-- 건물 본체 -->
          <rect x="10" y="25" width="50" height="45" fill="#E91E63" stroke="#C2185B" stroke-width="2"/>
          <!-- 지붕 -->
          <polygon points="5,25 35,5 65,25" fill="#C2185B" stroke="#AD1457" stroke-width="2"/>
          <!-- 그림 프레임들 -->
          <rect x="20" y="10" width="8" height="6" fill="#8D6E63" stroke="#5D4037" stroke-width="1"/>
          <rect x="30" y="10" width="8" height="6" fill="#8D6E63" stroke="#5D4037" stroke-width="1"/>
          <rect x="40" y="10" width="8" height="6" fill="#8D6E63" stroke="#5D4037" stroke-width="1"/>
          <!-- 문 -->
          <rect x="30" y="45" width="10" height="20" fill="#5D4037" stroke="#3E2723" stroke-width="1"/>
          <!-- 창문들 -->
          <rect x="20" y="35" width="6" height="8" fill="#F8BBD9" stroke="#C2185B" stroke-width="1"/>
          <rect x="44" y="35" width="6" height="8" fill="#F8BBD9" stroke="#C2185B" stroke-width="1"/>
          <!-- 조각상 -->
          <rect x="15" y="55" width="4" height="10" fill="#8D6E63"/>
          <rect x="51" y="55" width="4" height="10" fill="#8D6E63"/>
        </svg>
      `,
      event: `
        <svg width="${dimensions.width}" height="${dimensions.height}" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
          <!-- 건물 본체 -->
          <rect x="10" y="25" width="50" height="45" fill="#F44336" stroke="#D32F2F" stroke-width="2"/>
          <!-- 지붕 -->
          <polygon points="5,25 35,5 65,25" fill="#D32F2F" stroke="#C62828" stroke-width="2"/>
          <!-- 이벤트 장식 -->
          <circle cx="25" cy="15" r="3" fill="#FFEB3B"/>
          <circle cx="35" cy="12" r="3" fill="#4CAF50"/>
          <circle cx="45" cy="15" r="3" fill="#2196F3"/>
          <!-- 문 -->
          <rect x="30" y="45" width="10" height="20" fill="#5D4037" stroke="#3E2723" stroke-width="1"/>
          <!-- 창문들 -->
          <rect x="20" y="35" width="6" height="8" fill="#FFCDD2" stroke="#D32F2F" stroke-width="1"/>
          <rect x="44" y="35" width="6" height="8" fill="#FFCDD2" stroke="#D32F2F" stroke-width="1"/>
          <!-- 무대 -->
          <rect x="15" y="60" width="40" height="6" fill="#8D6E63" stroke="#5D4037" stroke-width="1"/>
          <!-- 스피커 -->
          <rect x="12" y="55" width="6" height="8" fill="#424242" stroke="#212121" stroke-width="1"/>
          <rect x="52" y="55" width="6" height="8" fill="#424242" stroke="#212121" stroke-width="1"/>
        </svg>
      `
    };
    
    return buildingSVGs[buildingType] || buildingSVGs.townhall;
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
            {/* 건물 본체 - 그림자 완전 제거 */}
            <div style={{
              width: size.width,
              height: size.height,
              background: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: hoveredBuilding === building.id ? 'scale(1.15) translateY(-5px)' : 'scale(1)',
              position: 'relative',
              transition: 'all 0.3s ease'
            }}>
              {/* 건물 SVG 이미지 */}
              <div 
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  filter: hoveredBuilding === building.id 
                    ? 'drop-shadow(0 0 15px rgba(255,255,255,0.8)) drop-shadow(0 0 25px rgba(255,255,255,0.4))' 
                    : 'none',
                  animation: hoveredBuilding === building.id ? 'pulse 0.6s ease-in-out' : 'none'
                }}
                dangerouslySetInnerHTML={{ 
                  __html: getBuildingImage(building.buildingType, building.size) 
                }}
              />
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
      <div style={{
        position: 'absolute',
        top: '2%',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(255, 248, 220, 0.95)',
        padding: '16px 32px',
        borderRadius: '0',
        border: '3px solid #8B4513',
        boxShadow: `
          0 0 0 2px #D2691E,
          0 0 0 4px #CD853F,
          0 8px 20px rgba(0,0,0,0.2)
        `,
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
      }}>
        <h2 style={{
          margin: 0,
          color: '#8B4513',
          fontFamily: 'Fredoka, sans-serif',
          fontSize: '20px',
          textAlign: 'center',
          fontWeight: 'bold',
          textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
        }}>
          🗺️ EmotionWave Village
        </h2>
        <p style={{
          margin: '6px 0 0 0',
          color: '#A0522D',
          fontFamily: 'Nunito, sans-serif',
          fontSize: '12px',
          textAlign: 'center',
          fontWeight: 'bold'
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
      <div style={{
        position: 'absolute',
        bottom: '2%',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(255, 248, 220, 0.95)',
        padding: '10px 20px',
        borderRadius: '0',
        border: '2px solid #8B4513',
        boxShadow: `
          0 0 0 1px #D2691E,
          0 0 0 2px #CD853F,
          0 4px 12px rgba(0,0,0,0.15)
        `,
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
      }}>
        <p style={{
          margin: 0,
          color: '#8B4513',
          fontFamily: 'Nunito, sans-serif',
          fontSize: '12px',
          textAlign: 'center',
          fontWeight: 'bold',
          textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
        }}>
          🖱️ 건물을 클릭하여 상세 정보를 확인하세요
        </p>
      </div>

    </div>
  );
}

export default VillageMap;

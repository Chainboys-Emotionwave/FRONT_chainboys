import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Collection() {
  const [selectedFurniture, setSelectedFurniture] = useState(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  // 데모용 사용자 데이터
  const userData = {
    nickname: "음악의 요정",
    walletAddress: "0x1234...abcd",
    totalRewards: 2.45,
    totalCheers: 15420,
    totalBadges: 8,
    profileImage: "🧚"
  };

  // 방 가구 데이터
  const furniture = [
    {
      id: "bed",
      name: "보상 내역",
      icon: "🛏️",
      position: { x: 50, y: 40 },
      description: "보상 내역을 확인하세요",
      content: "rewards"
    },
    {
      id: "wardrobe",
      name: "콘텐츠",
      icon: "👗",
      position: { x: 10, y: 20 },
      description: "콘텐츠를 관리하세요",
      content: "contents"
    },
    {
      id: "mirror",
      name: "뱃지 컬렉션",
      icon: "🪞",
      position: { x: 80, y: 20 },
      description: "뱃지 컬렉션을 보세요",
      content: "badges"
    },
    {
      id: "desk",
      name: "마을 가이드",
      icon: "🪑",
      position: { x: 30, y: 80 },
      description: "마을 가이드를 읽어보세요",
      content: "guide"
    },
    {
      id: "plant",
      name: "마을 통계",
      icon: "🪴",
      position: { x: 85, y: 85 },
      description: "마을 통계를 확인하세요",
      content: "stats"
    }
  ];

  // 데모용 콘텐츠 데이터
  const userContents = [
    {
      id: "1",
      title: "아이돌 커버송 메들리",
      category: "음악",
      cheers: 892,
      uploadDate: "2025-01-15",
      status: "active",
      thumbnail: "🎵"
    },
    {
      id: "2",
      title: "댄스 챌린지 영상",
      category: "댄스",
      cheers: 456,
      uploadDate: "2025-01-12",
      status: "active",
      thumbnail: "💃"
    },
    {
      id: "3",
      title: "팬아트 컬렉션",
      category: "아트",
      cheers: 234,
      uploadDate: "2025-01-10",
      status: "active",
      thumbnail: "🎨"
    }
  ];

  // 데모용 보상 내역
  const rewardHistory = [
    {
      id: "1",
      date: "2025-01-15",
      type: "주간 랭킹",
      amount: 0.8,
      rank: 3,
      txHash: "0xabc123...",
      status: "completed"
    },
    {
      id: "2",
      date: "2025-01-08",
      type: "챌린지 보상",
      amount: 1.2,
      challenge: "2025 신곡 커버 챌린지",
      txHash: "0xdef456...",
      status: "completed"
    },
    {
      id: "3",
      date: "2025-01-01",
      type: "주간 랭킹",
      amount: 0.45,
      rank: 7,
      txHash: "0xghi789...",
      status: "completed"
    }
  ];

  // 데모용 뱃지 데이터
  const userBadges = [
    {
      id: "1",
      name: "주간 챔피언",
      description: "주간 랭킹 1위 달성",
      rarity: "legendary",
      earnedDate: "2025-01-15",
      image: "🏆"
    },
    {
      id: "2",
      name: "라이징 스타",
      description: "첫 콘텐츠 등록",
      rarity: "common",
      earnedDate: "2025-01-10",
      image: "⭐"
    },
    {
      id: "3",
      name: "응원 마스터",
      description: "1000개 이상 응원 받기",
      rarity: "epic",
      earnedDate: "2025-01-12",
      image: "💖"
    },
    {
      id: "4",
      name: "챌린지 승자",
      description: "챌린지 우승",
      rarity: "rare",
      earnedDate: "2025-01-08",
      image: "🎯"
    }
  ];

  useEffect(() => {
    // 지갑 연결 상태 확인 (데모용)
    setIsWalletConnected(true);
    setUserProfile(userData);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFurnitureClick = (furnitureItem) => {
    setSelectedFurniture(furnitureItem);
  };

  const renderFurnitureContent = () => {
    if (!selectedFurniture) return null;

    switch (selectedFurniture.content) {
      case 'rewards':
        return (
          <div>
            <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>💰 보상 내역</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e9ecef' }}>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#666' }}>날짜</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#666' }}>종류</th>
                    <th style={{ padding: '12px', textAlign: 'right', color: '#666' }}>보상액</th>
                    <th style={{ padding: '12px', textAlign: 'center', color: '#666' }}>상태</th>
                  </tr>
                </thead>
                <tbody>
                  {rewardHistory.map(reward => (
                    <tr key={reward.id} style={{ borderBottom: '1px solid #f8f9fa' }}>
                      <td style={{ padding: '12px', fontSize: '14px' }}>{reward.date}</td>
                      <td style={{ padding: '12px', fontSize: '14px' }}>
                        {reward.type}
                        {reward.rank && <span style={{ color: '#aed581' }}> ({reward.rank}위)</span>}
                        {reward.challenge && <div style={{ fontSize: '12px', color: '#666' }}>{reward.challenge}</div>}
                      </td>
                      <td style={{ padding: '12px', textAlign: 'right', fontWeight: 'bold', color: '#27ae60' }}>
                        {reward.amount} ETH
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <span style={{ 
                          padding: '4px 8px', 
                          borderRadius: '12px', 
                          fontSize: '12px',
                          background: reward.status === 'completed' ? '#d4edda' : '#fff3cd',
                          color: reward.status === 'completed' ? '#155724' : '#856404'
                        }}>
                          {reward.status === 'completed' ? '완료' : '대기중'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'contents':
        return (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, color: '#333' }}>📝 내 콘텐츠</h3>
              <Link to="/upload" className="btn btn-primary">
                🛡️ 새 수호신 등록
              </Link>
            </div>
            <div style={{ display: 'grid', gap: '16px' }}>
              {userContents.map(content => (
                <div key={content.id} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '16px',
                  padding: '16px',
                  background: '#f8f9fa',
                  borderRadius: '12px',
                  border: '1px solid #e9ecef'
                }}>
                  <div style={{ fontSize: '40px' }}>{content.thumbnail}</div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 4px 0', color: '#333' }}>{content.title}</h4>
                    <div style={{ display: 'flex', gap: '12px', fontSize: '14px', color: '#666' }}>
                      <span>📂 {content.category}</span>
                      <span>📅 {content.uploadDate}</span>
                      <span>❤️ {content.cheers}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Link to={`/content/${content.id}`} className="btn btn-outline" style={{ fontSize: '14px', padding: '8px 16px' }}>
                      보기
                    </Link>
                    <button className="btn btn-outline" style={{ fontSize: '14px', padding: '8px 16px' }}>
                      수정
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'badges':
        return (
          <div>
            <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>🏆 뱃지 컬렉션</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
              {userBadges.map(badge => (
                <div key={badge.id} style={{ 
                  background: '#fff',
                  border: `2px solid ${getRarityColor(badge.rarity)}`,
                  borderRadius: '12px',
                  padding: '20px',
                  textAlign: 'center',
                  position: 'relative'
                }}>
                  <div style={{ 
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    background: getRarityColor(badge.rarity),
                    color: 'white',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '10px',
                    fontWeight: 'bold'
                  }}>
                    {getRarityName(badge.rarity)}
                  </div>
                  <div style={{ fontSize: '48px', marginBottom: '12px' }}>{badge.image}</div>
                  <h4 style={{ margin: '0 0 8px 0', color: '#333' }}>{badge.name}</h4>
                  <p style={{ margin: '0 0 12px 0', color: '#666', fontSize: '14px' }}>
                    {badge.description}
                  </p>
                  <div style={{ fontSize: '12px', color: '#999' }}>
                    획득일: {badge.earnedDate}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'guide':
        return (
          <div>
            <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>📖 마을 가이드</h3>
            <div style={{ display: 'grid', gap: '16px' }}>
              <div style={{ 
                background: '#f8f9fa', 
                padding: '20px', 
                borderRadius: '12px',
                border: '1px solid #e9ecef'
              }}>
                <h4 style={{ margin: '0 0 12px 0', color: '#333' }}>🏘️ 마을 규칙</h4>
                <p style={{ margin: '0 0 12px 0', color: '#666' }}>
                  마을에서는 서로를 존중하고 응원하는 문화를 만들어가고 있습니다.
                </p>
                <Link to="/guide" className="btn btn-primary" style={{ fontSize: '14px', padding: '8px 16px' }}>
                  자세히 보기
                </Link>
              </div>
            </div>
          </div>
        );
      case 'stats':
        return (
          <div>
            <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>📊 마을 통계</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
              <div style={{ 
                background: '#f8f9fa', 
                padding: '20px', 
                borderRadius: '12px',
                textAlign: 'center',
                border: '1px solid #e9ecef'
              }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#aed581' }}>
                  {userProfile?.totalRewards} ETH
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>총 보상</div>
              </div>
              <div style={{ 
                background: '#f8f9fa', 
                padding: '20px', 
                borderRadius: '12px',
                textAlign: 'center',
                border: '1px solid #e9ecef'
              }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#e74c3c' }}>
                  {userProfile?.totalCheers.toLocaleString()}
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>총 응원</div>
              </div>
              <div style={{ 
                background: '#f8f9fa', 
                padding: '20px', 
                borderRadius: '12px',
                textAlign: 'center',
                border: '1px solid #e9ecef'
              }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea' }}>
                  {userProfile?.totalBadges}
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>뱃지</div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'legendary': return '#FFD700';
      case 'epic': return '#9B59B6';
      case 'rare': return '#3498DB';
      case 'common': return '#95A5A6';
      default: return '#95A5A6';
    }
  };

  const getRarityName = (rarity) => {
    switch (rarity) {
      case 'legendary': return '레전더리';
      case 'epic': return '에픽';
      case 'rare': return '레어';
      case 'common': return '커먼';
      default: return '커먼';
    }
  };

  if (!isWalletConnected) {
    return (
      <div>
        <div className="card">
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <h1 style={{ color: '#333', marginBottom: '16px' }}>🏠 내 집</h1>
            <p style={{ color: '#666', fontSize: '18px', marginBottom: '24px' }}>
              지갑을 연결하여 나만의 방을 꾸며보세요
            </p>
            <button className="btn btn-primary" style={{ fontSize: '18px', padding: '12px 24px' }}>
              🔗 지갑 연결하기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* 프로필 헤더 */}
      <div className="card hero-section">
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '20px' }}>
          <div style={{ 
            width: '80px', 
            height: '80px', 
            borderRadius: '50%', 
            background: 'linear-gradient(135deg, #aed581 0%, #ffb74d 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '32px',
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(174, 213, 129, 0.3)'
          }}>
            {userProfile?.profileImage || userProfile?.nickname?.charAt(0) || '🎵'}
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={{ margin: '0 0 8px 0', color: '#333' }}>{userProfile?.nickname}</h1>
            <p style={{ margin: '0 0 16px 0', color: '#666', fontSize: '14px' }}>
              {userProfile?.walletAddress}
            </p>
            <div style={{ display: 'flex', gap: '24px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#27ae60' }}>
                  {userProfile?.totalRewards} ETH
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>총 보상</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#e74c3c' }}>
                  {userProfile?.totalCheers.toLocaleString()}
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>총 응원</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#aed581' }}>
                  {userProfile?.totalBadges}
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>뱃지</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 방 인테리어 */}
      <div className="card">
        <h2 style={{ margin: '0 0 20px 0', color: '#333', textAlign: 'center' }}>🏠 내 집</h2>
        
        {/* 방 배경 */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '500px',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          borderRadius: '20px',
          border: '3px solid #aed581',
          overflow: 'hidden',
          marginBottom: '20px'
        }}>
          {/* 바닥 패턴 */}
          <div style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            height: '100px',
            background: 'repeating-linear-gradient(90deg, #aed581 0px, #aed581 20px, #9ccc65 20px, #9ccc65 40px)',
            opacity: 0.3
          }}></div>
          
          {/* 벽지 패턴 */}
          <div style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '100px',
            background: 'radial-gradient(circle at 20% 50%, rgba(174, 213, 129, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 183, 77, 0.1) 0%, transparent 50%)'
          }}></div>

          {/* 가구들 */}
          {furniture.map((item) => (
            <div
              key={item.id}
              onClick={() => handleFurnitureClick(item)}
              style={{
                position: 'absolute',
                left: `${item.position.x}%`,
                top: `${item.position.y}%`,
                transform: 'translate(-50%, -50%)',
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
                zIndex: 10
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)';
              }}
            >
              <div style={{
                fontSize: '48px',
                textAlign: 'center',
                marginBottom: '8px',
                filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))'
              }}>
                {item.icon}
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '4px 8px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#333',
                textAlign: 'center',
                whiteSpace: 'nowrap',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                {item.name}
              </div>
            </div>
          ))}

          {/* 장식 요소들 */}
          <div style={{
            position: 'absolute',
            top: '10%',
            left: '10%',
            fontSize: '24px',
            opacity: 0.3
          }}>🪟</div>
          <div style={{
            position: 'absolute',
            top: '10%',
            right: '10%',
            fontSize: '24px',
            opacity: 0.3
          }}>🪟</div>
          <div style={{
            position: 'absolute',
            top: '5%',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '20px',
            opacity: 0.2
          }}>💡</div>
        </div>

        {/* 가구 설명 */}
        <div style={{
          background: '#f8f9fa',
          padding: '16px',
          borderRadius: '12px',
          border: '1px solid #e9ecef',
          marginBottom: '20px'
        }}>
          <p style={{ margin: '0', color: '#666', fontSize: '14px', textAlign: 'center' }}>
            💡 가구를 클릭하여 확인해보세요! 💡
          </p>
        </div>
      </div>

      {/* 선택된 가구의 콘텐츠 */}
      {selectedFurniture && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, color: '#333' }}>
              {selectedFurniture.icon} {selectedFurniture.name}
            </h3>
            <button 
              onClick={() => setSelectedFurniture(null)}
              style={{
                background: '#f8f9fa',
                border: '1px solid #e9ecef',
                borderRadius: '8px',
                padding: '8px 16px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              ✕ 닫기
            </button>
          </div>
          {renderFurnitureContent()}
        </div>
      )}
    </div>
  );
}

export default Collection;
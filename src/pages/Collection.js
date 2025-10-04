import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import furnitureService from "../services/furnitureService";

function Collection() {
  const [selectedFurniture, setSelectedFurniture] = useState(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const { userLevel } = useAuth();

  // 이모지 마스터 데이터 (ProfileEdit.js와 동일)
  const emojiMaster = [
    { id: 1, emoji: "🧚", category: "fantasy", name: "요정" },
    { id: 2, emoji: "🎵", category: "music", name: "음표" },
    { id: 3, emoji: "🎤", category: "music", name: "마이크" },
    { id: 4, emoji: "🎧", category: "music", name: "헤드폰" },
    { id: 5, emoji: "🎸", category: "music", name: "기타" },
    { id: 6, emoji: "🎹", category: "music", name: "피아노" },
    { id: 7, emoji: "🥁", category: "music", name: "드럼" },
    { id: 8, emoji: "🎺", category: "music", name: "트럼펫" },
    { id: 9, emoji: "🎻", category: "music", name: "바이올린" },
    { id: 10, emoji: "🎼", category: "music", name: "악보" },
    // ... 더 많은 이모지들 (실제로는 API에서 가져올 데이터)
  ];

  // 색상 마스터 데이터 (ProfileEdit.js와 동일)
  const colorMaster = [
    { id: 1, gradient: "linear-gradient(135deg, #aed581 0%, #ffb74d 100%)", name: "자연" },
    { id: 2, gradient: "linear-gradient(135deg, #4fc3f7 0%, #29b6f6 100%)", name: "바다" },
    { id: 3, gradient: "linear-gradient(135deg, #ff7043 0%, #ff5722 100%)", name: "일몰" },
    { id: 4, gradient: "linear-gradient(135deg, #ba68c8 0%, #9c27b0 100%)", name: "보라" },
    { id: 5, gradient: "linear-gradient(135deg, #f06292 0%, #e91e63 100%)", name: "핑크" },
    { id: 6, gradient: "linear-gradient(135deg, #4db6ac 0%, #009688 100%)", name: "청록" },
    { id: 7, gradient: "linear-gradient(135deg, #ffd54f 0%, #ffc107 100%)", name: "황금" },
    { id: 8, gradient: "linear-gradient(135deg, #90a4ae 0%, #607d8b 100%)", name: "은색" },
    { id: 9, gradient: "linear-gradient(135deg, #ef5350 0%, #f44336 100%)", name: "빨강" },
    { id: 10, gradient: "linear-gradient(135deg, #66bb6a 0%, #4caf50 100%)", name: "초록" },
    { id: 11, gradient: "linear-gradient(135deg, #42a5f5 0%, #2196f3 100%)", name: "파랑" },
    { id: 12, gradient: "linear-gradient(135deg, #ffa726 0%, #ff9800 100%)", name: "주황" },
    { id: 13, gradient: "linear-gradient(135deg, #8e24aa 0%, #7b1fa2 100%)", name: "딥퍼플" },
    { id: 14, gradient: "linear-gradient(135deg, #00acc1 0%, #0097a7 100%)", name: "시안" },
    { id: 15, gradient: "linear-gradient(135deg, #5d4037 0%, #4e342e 100%)", name: "브라운" },
    { id: 16, gradient: "linear-gradient(135deg, #795548 0%, #6d4c41 100%)", name: "라이트브라운" },
    { id: 17, gradient: "linear-gradient(135deg, #607d8b 0%, #455a64 100%)", name: "블루그레이" },
    { id: 18, gradient: "linear-gradient(135deg, #ff5722 0%, #d84315 100%)", name: "딥오렌지" },
    { id: 19, gradient: "linear-gradient(135deg, #4caf50 0%, #388e3c 100%)", name: "딥그린" },
    { id: 20, gradient: "linear-gradient(135deg, #3f51b5 0%, #303f9f 100%)", name: "인디고" }
  ];

  // 데모용 사용자 데이터
  const userData = {
    nickname: "음악의 요정",
    walletAddress: "0x1234...abcd",
    totalRewards: 2.45,
    totalCheers: 15420,
    totalBadges: 8,
    profileImageId: 1, // 요정 이모지 ID
    profileColorId: 1  // 자연 색상 ID
  };

  // 사용자 레벨에 따른 가구 데이터 생성
  const getFurnitureData = () => {
    const level = userLevel?.level || 1;
    const allFurniture = furnitureService.getAllFurniture(level);
    
    return [
      {
        id: "bed",
        name: allFurniture.bed.function.name,
        icon: allFurniture.bed.image,
        position: { x: 52.8, y: 27 },
        description: allFurniture.bed.function.description,
        content: "rewards",
        isColor: allFurniture.bed.isColor,
        size: 1.6 
      },
      {
        id: "closet",
        name: allFurniture.closet.function.name,
        icon: allFurniture.closet.image,
        position: { x: 85, y: 60 },
        description: allFurniture.closet.function.description,
        content: "contents",
        isColor: allFurniture.closet.isColor,
        size: 1.7 // 기본 크기로 되돌림
      },
      {
        id: "mirror",
        name: allFurniture.mirror.function.name,
        icon: allFurniture.mirror.image,
        position: { x: 73, y: 22 },
        description: allFurniture.mirror.function.description,
        content: "badges",
        isColor: allFurniture.mirror.isColor,
        size: 0.7 // 0.7배
      },
      {
        id: "desk",
        name: allFurniture.desk.function.name,
        icon: allFurniture.desk.image,
        position: { x: 30, y: 51 },
        description: allFurniture.desk.function.description,
        content: "guide",
        isColor: allFurniture.desk.isColor,
        size: 1.5 // 기본 크기로 되돌림
      },
      {
        id: "pots",
        name: allFurniture.pots.function.name,
        icon: allFurniture.pots.image,
        position: { x: 14, y: 77 },
        description: allFurniture.pots.function.description,
        content: "stats",
        isColor: allFurniture.pots.isColor,
        size: 1.4 // 기본 크기 유지
      }
    ];
  };

  const furniture = getFurnitureData();

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
      earnedDate: "2025-01-15",
      image: "🏆"
    },
    {
      id: "2",
      name: "라이징 스타",
      description: "첫 콘텐츠 등록",
      earnedDate: "2025-01-10",
      image: "⭐"
    },
    {
      id: "3",
      name: "응원 마스터",
      description: "1000개 이상 응원 받기",
      earnedDate: "2025-01-12",
      image: "💖"
    },
    {
      id: "4",
      name: "챌린지 승자",
      description: "챌린지 우승",
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
                🛡️ 새 콘텐츠 등록
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
                    <Link to={`/content-edit/${content.id}`} className="btn btn-outline" style={{ fontSize: '14px', padding: '8px 16px' }}>
                      수정
                    </Link>
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
                  border: '2px solid #e9ecef',
                  borderRadius: '12px',
                  padding: '20px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '12px' }}>{badge.image}</div>
                  <h4 style={{ margin: '0 0 8px 0', color: '#333' }}>{badge.name}</h4>
                  <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
                    {badge.description}
                  </p>
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
            <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>📊 내 집 통계</h3>
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
            background: colorMaster.find(color => color.id === userProfile?.profileColorId)?.gradient || 'linear-gradient(135deg, #aed581 0%, #ffb74d 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '32px',
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
          }}>
            {emojiMaster.find(emoji => emoji.id === userProfile?.profileImageId)?.emoji || userProfile?.nickname?.charAt(0) || '🎵'}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <h1 style={{ margin: 0, color: '#333' }}>{userProfile?.nickname}</h1>
              <Link to="/profile-edit" className="btn btn-outline" style={{ fontSize: '12px', padding: '6px 12px' }}>
                ✏️ 프로필 변경
              </Link>
            </div>
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
          backgroundImage: `url(${furnitureService.getBackgroundImage()})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '20px',
          border: '3px solid #aed581',
          overflow: 'hidden',
          marginBottom: '20px'
        }}>

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
                width: `${180 * (item.size || 1)}px`,
                height: `${180 * (item.size || 1)}px`,
                backgroundImage: `url(${item.icon})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))'
              }}></div>
            </div>
          ))}

          {/* 레벨 정보 표시 */}
          <div style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '8px 12px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#333',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            {userLevel?.emoji} {userLevel?.name} LEVEL{userLevel?.level || 1}
          </div>
        </div>

        {/* 레벨별 가구 정보 */}
        <div style={{
          background: '#f8f9fa',
          padding: '16px',
          borderRadius: '12px',
          border: '1px solid #e9ecef',
          marginBottom: '20px'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '12px' }}>
            <h4 style={{ margin: '0 0 8px 0', color: '#333', fontSize: '16px' }}>
              🏠 현재 레벨 :  {userLevel?.level || 1} 단계 🏠 
            </h4>
            <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
              💡 가구를 클릭하여 자세한 내용을 확인해보세요! 💡
            </p>
          </div>
          
          {/* 컬러/흑백 가구 정보 */}
          <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '12px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#4CAF50', fontWeight: 'bold', marginBottom: '4px' }}>
                🎨 컬러
              </div>
              <div style={{ color: '#666' }}>
                {furniture.filter(item => item.isColor).map(item => item.name).join(', ')}
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#999', fontWeight: 'bold', marginBottom: '4px' }}>
                ⚫ 흑백
              </div>
              <div style={{ color: '#666' }}>
                {furniture.filter(item => !item.isColor).map(item => item.name).join(', ')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 모달 오버레이 */}
      {selectedFurniture && (
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
          padding: '20px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '30px',
            maxWidth: '800px',
            width: '100%',
            maxHeight: '80vh',
            overflow: 'auto',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
            position: 'relative'
          }}>
            {/* 모달 헤더 */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '20px',
              borderBottom: '1px solid #e9ecef',
              paddingBottom: '15px'
            }}>
              <h3 style={{ margin: 0, color: '#333', fontSize: '24px' }}>
                {selectedFurniture.icon} {selectedFurniture.name}
              </h3>
              <button 
                onClick={() => setSelectedFurniture(null)}
                style={{
                  background: '#f8f9fa',
                  border: '1px solid #e9ecef',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  cursor: 'pointer',
                  fontSize: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#e9ecef';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#f8f9fa';
                }}
              >
                ✕
              </button>
            </div>
            
            {/* 모달 콘텐츠 */}
            <div style={{ maxHeight: '60vh', overflow: 'auto' }}>
              {renderFurnitureContent()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Collection;
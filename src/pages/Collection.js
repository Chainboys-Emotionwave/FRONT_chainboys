import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Collection() {
  const [activeTab, setActiveTab] = useState("contents");
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  // 데모용 사용자 데이터
  const userData = {
    nickname: "MusicLover123",
    walletAddress: "0x1234...abcd",
    totalRewards: 2.45,
    totalCheers: 15420,
    totalBadges: 8,
    profileImage: null
  };

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
  }, []);

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
            <h1 style={{ color: '#333', marginBottom: '16px' }}>💎 마이페이지</h1>
            <p style={{ color: '#666', fontSize: '18px', marginBottom: '24px' }}>
              지갑을 연결하여 개인화된 서비스를 이용하세요
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
            background: '#667eea',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '32px',
            fontWeight: 'bold'
          }}>
            {userProfile?.nickname?.charAt(0).toUpperCase() || 'U'}
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
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#667eea' }}>
                  {userProfile?.totalBadges}
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>뱃지</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="card">
        <div style={{ 
          display: 'flex', 
          borderBottom: '1px solid #e9ecef',
          marginBottom: '20px'
        }}>
          {[
            { id: 'contents', label: '📝 콘텐츠 관리', icon: '📝' },
            { id: 'rewards', label: '💰 보상 내역', icon: '💰' },
            { id: 'badges', label: '🏆 뱃지 컬렉션', icon: '🏆' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '12px 24px',
                border: 'none',
                background: 'none',
                borderBottom: activeTab === tab.id ? '2px solid #667eea' : '2px solid transparent',
                color: activeTab === tab.id ? '#667eea' : '#666',
                fontWeight: activeTab === tab.id ? '600' : '400',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 콘텐츠 관리 탭 */}
        {activeTab === 'contents' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, color: '#333' }}>내 콘텐츠</h3>
              <Link to="/upload" className="btn btn-primary">
                📤 새 콘텐츠 등록
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
        )}

        {/* 보상 내역 탭 */}
        {activeTab === 'rewards' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, color: '#333' }}>보상 내역</h3>
              <button className="btn btn-primary">
                💸 보상 출금
              </button>
            </div>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e9ecef' }}>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#666' }}>날짜</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#666' }}>종류</th>
                    <th style={{ padding: '12px', textAlign: 'right', color: '#666' }}>보상액</th>
                    <th style={{ padding: '12px', textAlign: 'center', color: '#666' }}>상태</th>
                    <th style={{ padding: '12px', textAlign: 'center', color: '#666' }}>트랜잭션</th>
                  </tr>
                </thead>
                <tbody>
                  {rewardHistory.map(reward => (
                    <tr key={reward.id} style={{ borderBottom: '1px solid #f8f9fa' }}>
                      <td style={{ padding: '12px', fontSize: '14px' }}>{reward.date}</td>
                      <td style={{ padding: '12px', fontSize: '14px' }}>
                        {reward.type}
                        {reward.rank && <span style={{ color: '#667eea' }}> ({reward.rank}위)</span>}
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
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <a 
                          href={`https://sepolia.etherscan.io/tx/${reward.txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: '#667eea', textDecoration: 'none', fontSize: '12px' }}
                        >
                          보기
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 뱃지 컬렉션 탭 */}
        {activeTab === 'badges' && (
          <div>
            <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>뱃지 컬렉션</h3>
            
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
        )}
      </div>
    </div>
  );
}

export default Collection;
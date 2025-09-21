import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";

// 데모용 마을 주민 랭킹 데이터
const MOCK_CREATORS = [
  { 
    id: "1", 
    nickname: "🎵 음악의 요정", 
    walletAddress: "0x1234...abcd",
    weeklyCheers: 15420, 
    totalCheers: 89200,
    profileImage: null,
    category: "음악",
    contentCount: 15,
    badges: ["주간 챔피언", "응원 마스터"],
    growthRate: 25.3,
    character: "🎵"
  },
  { 
    id: "2", 
    nickname: "💃 춤추는 꽃", 
    walletAddress: "0x5678...efgh",
    weeklyCheers: 12300, 
    totalCheers: 67800,
    profileImage: null,
    category: "댄스",
    contentCount: 12,
    badges: ["댄스 마스터", "라이징 스타"],
    growthRate: 18.7,
    character: "💃"
  },
  { 
    id: "3", 
    nickname: "🎨 그림쟁이", 
    walletAddress: "0x9abc...ijkl",
    weeklyCheers: 9870, 
    totalCheers: 45600,
    profileImage: null,
    category: "아트",
    contentCount: 8,
    badges: ["아트 마스터"],
    growthRate: 12.4,
    character: "🎨"
  },
  { 
    id: "4", 
    nickname: "🥁 리듬의 마법사", 
    walletAddress: "0xdef0...mnop",
    weeklyCheers: 8750, 
    totalCheers: 38900,
    profileImage: null,
    category: "음악",
    contentCount: 10,
    badges: ["비트 마스터"],
    growthRate: 8.9,
    character: "🥁"
  },
  { 
    id: "5", 
    nickname: "😄 웃음의 요리사", 
    walletAddress: "0x1234...qrst",
    weeklyCheers: 7200, 
    totalCheers: 32100,
    profileImage: null,
    category: "코미디",
    contentCount: 6,
    badges: ["코미디 마스터"],
    growthRate: 15.2,
    character: "😄"
  },
  { 
    id: "6", 
    nickname: "🍳 마을의 요리사", 
    walletAddress: "0x5678...uvwx",
    weeklyCheers: 6500, 
    totalCheers: 28900,
    profileImage: null,
    category: "라이프스타일",
    contentCount: 9,
    badges: ["요리 마스터"],
    growthRate: 22.1,
    character: "🍳"
  }
];

function Ranking() {
  const [activeTab, setActiveTab] = useState("weekly");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [userRank, setUserRank] = useState(null);

  useEffect(() => {
    // 지갑 연결 상태 확인 (데모용)
    setIsWalletConnected(true);
    
    // 사용자 랭킹 정보 (데모용)
    setUserRank({
      weeklyRank: 15,
      weeklyCheers: 3200,
      totalRank: 45,
      totalCheers: 18900
    });
  }, []);

  const categories = ["전체", ...new Set(MOCK_CREATORS.map(c => c.category))];

  const filteredAndRanked = useMemo(() => {
    let filtered = MOCK_CREATORS.filter(c => 
      selectedCategory === "전체" || c.category === selectedCategory
    );

    // 주간/명예의 전당에 따라 정렬 기준 변경
    const sorted = filtered.sort((a, b) => {
      if (activeTab === "weekly") {
        return b.weeklyCheers - a.weeklyCheers;
      } else {
        return b.totalCheers - a.totalCheers;
      }
    });

    return sorted.map((c, i) => ({ 
      ...c, 
      rank: i + 1
    }));
  }, [activeTab, selectedCategory]);

  const rankBadge = (r) => {
    if (r === 1) return { emoji: "🥇", text: "1위", color: "#FFD700" };
    if (r === 2) return { emoji: "🥈", text: "2위", color: "#C0C0C0" };
    if (r === 3) return { emoji: "🥉", text: "3위", color: "#CD7F32" };
    return { emoji: "", text: `${r}위`, color: "#666" };
  };

  const getCurrentWeekRange = () => {
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6));
    return `${startOfWeek.toLocaleDateString()} ~ ${endOfWeek.toLocaleDateString()}`;
  };

  const totalWeeklyCheers = MOCK_CREATORS.reduce((sum, c) => sum + c.weeklyCheers, 0);
  const totalAllTimeCheers = MOCK_CREATORS.reduce((sum, c) => sum + c.totalCheers, 0);
  const activeCreators = MOCK_CREATORS.length;

  return (
    <div>
      {/* 헤더 섹션 */}
      <div className="card hero-section">
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <h1 style={{ color: '#333', marginBottom: '16px', fontSize: '2rem' }}>
            🎪 전체 랭킹
          </h1>
          <p style={{ color: '#666', fontSize: '18px', marginBottom: '24px' }}>
            마을 주민들의 응원으로 결정되는 실시간 랭킹
          </p>
          
          {/* 통계 카드 */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
            gap: '16px',
            marginBottom: '24px'
          }}>
            <div style={{ 
              background: '#f8f9fa', 
              padding: '16px', 
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#e74c3c' }}>
                {totalWeeklyCheers.toLocaleString()}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>주간 총총 응원</div>
            </div>
            <div style={{ 
              background: '#f8f9fa', 
              padding: '16px', 
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#27ae60' }}>
                {totalAllTimeCheers.toLocaleString()}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>누적 총 응원</div>
            </div>
            <div style={{ 
              background: '#f8f9fa', 
              padding: '16px', 
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#667eea' }}>
                {activeCreators}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>활성 창작자</div>
            </div>
          </div>
        </div>
      </div>

      {/* 내 순위 (로그인 시에만 표시) */}
      {isWalletConnected && userRank && (
        <div className="card" style={{ 
          background: 'linear-gradient(135deg, #aed581 0%, #ffb74d 100%)',
          color: 'white',
          marginBottom: '20px'
        }}>
          <div style={{ padding: '20px' }}>
            <h3 style={{ margin: '0 0 16px 0', color: 'white' }}>🎯 내 순위</h3>
            <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                  {userRank.weeklyRank}위
                </div>
                <div style={{ fontSize: '14px', opacity: 0.9 }}>주간 랭킹</div>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>
                  {userRank.weeklyCheers.toLocaleString()} 응원
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                  {userRank.totalRank}위
                </div>
                <div style={{ fontSize: '14px', opacity: 0.9 }}>명예의 전당</div>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>
                  {userRank.totalCheers.toLocaleString()} 응원
                </div>
              </div>
              <div style={{ flex: 1, textAlign: 'right' }}>
                <Link to="/upload" className="btn-transparent">
                  🛡️ 수호신 등록하기
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 탭 및 필터 */}
      <div className="card">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          {/* 탭 */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setActiveTab("weekly")}
              style={{
                padding: '12px 24px',
                border: 'none',
                background: activeTab === "weekly" ? '#aed581' : '#f8f9fa',
                color: activeTab === "weekly" ? 'white' : '#666',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: activeTab === "weekly" ? '600' : '400'
              }}
            >
              📅 주간 랭킹
            </button>
            <button
              onClick={() => setActiveTab("hallOfFame")}
              style={{
                padding: '12px 24px',
                border: 'none',
                background: activeTab === "hallOfFame" ? '#aed581' : '#f8f9fa',
                color: activeTab === "hallOfFame" ? 'white' : '#666',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: activeTab === "hallOfFame" ? '600' : '400'
              }}
            >
              🏆 명예의 전당
            </button>
          </div>

          {/* 카테고리 필터 */}
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ 
              padding: '12px 16px', 
              borderRadius: '8px', 
              border: '1px solid #ddd',
              fontSize: '14px'
            }}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* 랭킹 기간 정보 */}
        {activeTab === "weekly" && (
          <div style={{ 
            background: '#e8f4f8', 
            padding: '12px 16px', 
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '14px',
            color: '#0c5460'
          }}>
            📅 이번 주 랭킹 집계 기간: {getCurrentWeekRange()}
          </div>
        )}

        {/* 랭킹 리스트 */}
        <div style={{ display: 'grid', gap: '16px' }}>
          {filteredAndRanked.map((creator, index) => {
            const badge = rankBadge(creator.rank);
            return (
              <div key={creator.id} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '20px',
                padding: '20px',
                background: index < 3 ? '#fff8e1' : '#f8f9fa',
                borderRadius: '12px',
                border: index < 3 ? '2px solid #ffc107' : '1px solid #e9ecef',
                transition: 'transform 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                
                {/* 순위 */}
                <div style={{ 
                  minWidth: '60px', 
                  textAlign: 'center',
                  color: badge.color,
                  fontWeight: 'bold',
                  fontSize: '18px'
                }}>
                  {badge.emoji}<br />
                  {badge.text}
                </div>

                {/* 프로필 */}
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  borderRadius: '50%', 
                  background: 'linear-gradient(135deg, #aed581 0%, #ffb74d 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '32px',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 12px rgba(139, 195, 74, 0.3)'
                }}>
                  {creator.character}
                </div>

                {/* 정보 */}
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 8px 0', color: '#333' }}>
                    {creator.nickname}
                  </h3>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                    <span>📂 {creator.category}</span>
                    <span>📝 콘텐츠 {creator.contentCount}개</span>
                    <span style={{ color: creator.growthRate > 0 ? '#27ae60' : '#e74c3c' }}>
                      📈 {creator.growthRate > 0 ? '+' : ''}{creator.growthRate}%
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {creator.badges.map((badge, idx) => (
                      <span 
                        key={idx}
                        style={{
                          background: '#aed581',
                          color: 'white',
                          padding: '2px 8px',
                          borderRadius: '12px',
                          fontSize: '12px'
                        }}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 통계 */}
                <div style={{ textAlign: 'center', minWidth: '120px' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#e74c3c' }}>
                    {activeTab === "weekly" 
                      ? creator.weeklyCheers.toLocaleString() 
                      : creator.totalCheers.toLocaleString()
                    }
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    {activeTab === "weekly" ? "주간 응원" : "누적 응원"}
                  </div>
                </div>

                {/* 액션 버튼 */}
                <Link 
                  to={`/creator/${creator.id}`}
                  className="btn btn-outline"
                  style={{ fontSize: '14px', padding: '8px 16px' }}
                >
                  프로필 보기
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* 차트 섹션 */}
      <div className="card">
        <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>📊 응원 트렌드</h3>
        <div style={{ 
          background: '#f8f9fa', 
          padding: '20px', 
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-around', 
            alignItems: 'end',
            height: '200px',
            gap: '16px'
          }}>
            {filteredAndRanked.slice(0, 5).map((creator, index) => {
              const maxCheers = Math.max(...filteredAndRanked.slice(0, 5).map(c => 
                activeTab === "weekly" ? c.weeklyCheers : c.totalCheers
              ));
              const currentCheers = activeTab === "weekly" ? creator.weeklyCheers : creator.totalCheers;
              const height = (currentCheers / maxCheers) * 150;
              
              return (
                <div key={creator.id} style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{ 
                    width: '40px',
                    height: `${height}px`,
                    background: index < 3 ? '#ffc107' : '#aed581',
                    borderRadius: '4px 4px 0 0',
                    transition: 'height 0.5s ease',
                    animation: `growUp 0.5s ease ${index * 0.1}s forwards`
                  }}></div>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#333' }}>
                    {creator.nickname}
                  </div>
                  <div style={{ fontSize: '10px', color: '#666' }}>
                    {currentCheers.toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ranking;
  
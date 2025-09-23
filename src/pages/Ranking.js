import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";

// 데모용 마을 주민 랭킹 데이터 (상위 10위)
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
    character: "🍳"
  },
  { 
    id: "7", 
    nickname: "🎭 연극의 달인", 
    walletAddress: "0x9abc...yz12",
    weeklyCheers: 5800, 
    totalCheers: 25600,
    profileImage: null,
    category: "연극",
    contentCount: 7,
    badges: ["연극 마스터"],
    character: "🎭"
  },
  { 
    id: "8", 
    nickname: "📸 사진작가", 
    walletAddress: "0xdef0...3456",
    weeklyCheers: 5200, 
    totalCheers: 22300,
    profileImage: null,
    category: "사진",
    contentCount: 11,
    badges: ["포토 마스터"],
    character: "📸"
  },
  { 
    id: "9", 
    nickname: "🎪 서커스 아티스트", 
    walletAddress: "0x1234...7890",
    weeklyCheers: 4800, 
    totalCheers: 19800,
    profileImage: null,
    category: "서커스",
    contentCount: 5,
    badges: ["서커스 마스터"],
    character: "🎪"
  },
  { 
    id: "10", 
    nickname: "🎨 디지털 아티스트", 
    walletAddress: "0x5678...abcd",
    weeklyCheers: 4200, 
    totalCheers: 17500,
    profileImage: null,
    category: "아트",
    contentCount: 13,
    badges: ["디지털 마스터"],
    character: "🎨"
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

      {/* 카테고리별 인기도 차트 섹션 */}
      <div className="card">
        <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>📊 카테고리별 인기도</h3>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '40px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {/* 원그래프 */}
          <div style={{ position: 'relative', width: '300px', height: '300px' }}>
            <svg width="300" height="300" style={{ transform: 'rotate(-90deg)' }}>
              {(() => {
                // 카테고리별 총 응원 수 계산
                const categoryData = categories
                  .filter(cat => cat !== "전체")
                  .map(category => {
                    const categoryCreators = MOCK_CREATORS.filter(c => c.category === category);
                    const totalCheers = categoryCreators.reduce((sum, creator) => {
                      return sum + (activeTab === "weekly" ? creator.weeklyCheers : creator.totalCheers);
                    }, 0);
                    return { category, totalCheers, count: categoryCreators.length };
                  })
                  .sort((a, b) => b.totalCheers - a.totalCheers);

                const totalCheers = categoryData.reduce((sum, item) => sum + item.totalCheers, 0);
                const colors = ['#8bc34a', '#ff9800', '#e91e63', '#2196f3', '#9c27b0', '#f44336', '#00bcd4', '#4caf50'];
                
                let currentAngle = 0;
                const radius = 120;
                const centerX = 150;
                const centerY = 150;

                return categoryData.map((item, index) => {
                  const percentage = (item.totalCheers / totalCheers) * 100;
                  const angle = (item.totalCheers / totalCheers) * 360;
                  const startAngle = currentAngle;
                  const endAngle = currentAngle + angle;
                  
                  const x1 = centerX + radius * Math.cos((startAngle * Math.PI) / 180);
                  const y1 = centerY + radius * Math.sin((startAngle * Math.PI) / 180);
                  const x2 = centerX + radius * Math.cos((endAngle * Math.PI) / 180);
                  const y2 = centerY + radius * Math.sin((endAngle * Math.PI) / 180);
                  
                  const largeArcFlag = angle > 180 ? 1 : 0;
                  const pathData = [
                    `M ${centerX} ${centerY}`,
                    `L ${x1} ${y1}`,
                    `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                    'Z'
                  ].join(' ');

                  currentAngle += angle;

                  return (
                    <path
                      key={item.category}
                      d={pathData}
                      fill={colors[index % colors.length]}
                      stroke="white"
                      strokeWidth="2"
                      style={{ 
                        opacity: 0.8,
                        transition: 'opacity 0.3s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.opacity = '1';
                        e.target.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.opacity = '0.8';
                        e.target.style.transform = 'scale(1)';
                      }}
                    />
                  );
                });
              })()}
            </svg>
            
            {/* 중앙 텍스트 */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              color: '#333'
            }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>
                {activeTab === "weekly" ? "주간" : "누적"}
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                카테고리별<br />인기도
              </div>
            </div>
          </div>

          {/* 범례 */}
          <div style={{ flex: 1, minWidth: '300px' }}>
            {(() => {
              const categoryData = categories
                .filter(cat => cat !== "전체")
                .map(category => {
                  const categoryCreators = MOCK_CREATORS.filter(c => c.category === category);
                  const totalCheers = categoryCreators.reduce((sum, creator) => {
                    return sum + (activeTab === "weekly" ? creator.weeklyCheers : creator.totalCheers);
                  }, 0);
                  return { category, totalCheers, count: categoryCreators.length };
                })
                .sort((a, b) => b.totalCheers - a.totalCheers);

              const totalCheers = categoryData.reduce((sum, item) => sum + item.totalCheers, 0);
              const colors = ['#8bc34a', '#ff9800', '#e91e63', '#2196f3', '#9c27b0', '#f44336', '#00bcd4', '#4caf50'];

              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {categoryData.map((item, index) => {
                    const percentage = ((item.totalCheers / totalCheers) * 100).toFixed(1);
                    return (
                      <div key={item.category} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px',
                        background: '#f8f9fa',
                        borderRadius: '8px',
                        border: '1px solid #e9ecef',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#e8f5e8';
                        e.currentTarget.style.transform = 'translateX(4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#f8f9fa';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}>
                        <div style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '4px',
                          background: colors[index % colors.length],
                          flexShrink: 0
                        }}></div>
                        <div style={{ flex: 1 }}>
                          <div style={{ 
                            fontSize: '16px', 
                            fontWeight: 'bold', 
                            color: '#333',
                            marginBottom: '2px'
                          }}>
                            {item.category}
                          </div>
                          <div style={{ 
                            fontSize: '12px', 
                            color: '#666' 
                          }}>
                            {item.count}명의 크리에이터
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ 
                            fontSize: '18px', 
                            fontWeight: 'bold', 
                            color: colors[index % colors.length]
                          }}>
                            {percentage}%
                          </div>
                          <div style={{ 
                            fontSize: '12px', 
                            color: '#666' 
                          }}>
                            {item.totalCheers.toLocaleString()} 응원
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        </div>
        
        {/* 추가 정보 */}
        <div style={{ 
          marginTop: '20px', 
          padding: '16px', 
          background: '#e8f4f8', 
          borderRadius: '8px',
          fontSize: '14px',
          color: '#0c5460'
        }}>
          💡 <strong>인기도 계산 방식:</strong> 각 카테고리의 모든 크리에이터 응원 수를 합산하여 계산됩니다.
          {activeTab === "weekly" ? " 주간 응원 수 기준으로 집계됩니다." : " 누적 응원 수 기준으로 집계됩니다."}
        </div>
      </div>
    </div>
  );
}

export default Ranking;
  
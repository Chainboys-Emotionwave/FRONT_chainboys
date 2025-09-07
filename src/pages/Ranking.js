import { useMemo, useState, useEffect } from "react";

const MOCK_CONTENTS = [
  { 
    id: "1", 
    title: "팬 커버송 #1", 
    price: 0.05, 
    icon: "🎵", 
    category: "음악",
    creator: "MusicLover123",
    views: 15420,
    uploadDate: "2025-08-15",
    description: "인기곡을 아름다운 목소리로 커버한 작품",
    tags: ["커버", "발라드", "감성"]
  },
  { 
    id: "2", 
    title: "팬 아트 #2", 
    price: 0.03, 
    icon: "📸", 
    category: "아트",
    creator: "ArtMaster",
    views: 8930,
    uploadDate: "2025-08-14",
    description: "디지털 아트로 표현한 팬아트 작품",
    tags: ["디지털아트", "팬아트", "일러스트"]
  },
  { 
    id: "3", 
    title: "댄스 챌린지 #3", 
    price: 0.04, 
    icon: "🎤", 
    category: "댄스",
    creator: "DanceQueen",
    views: 22100,
    uploadDate: "2025-08-13",
    description: "트렌디한 댄스 챌린지 영상",
    tags: ["댄스", "챌린지", "트렌드"]
  },
  { 
    id: "4", 
    title: "리믹스 트랙 #4", 
    price: 0.06, 
    icon: "🎧", 
    category: "음악",
    creator: "BeatMaker",
    views: 18750,
    uploadDate: "2025-08-12",
    description: "독창적인 리믹스로 재탄생한 히트곡",
    tags: ["리믹스", "EDM", "힙합"]
  },
  { 
    id: "5", 
    title: "코믹 스케치 #5", 
    price: 0.02, 
    icon: "🎭", 
    category: "코미디",
    creator: "ComedyKing",
    views: 12300,
    uploadDate: "2025-08-11",
    description: "웃음이 터지는 코믹 스케치",
    tags: ["코미디", "스케치", "유머"]
  },
  { 
    id: "6", 
    title: "OO아이돌 레시피 #6", 
    price: 0.04, 
    icon: "🍳", 
    category: "라이프스타일",
    creator: "ChefMaster",
    views: 9650,
    uploadDate: "2025-08-10",
    description: "OO아이돌이 추천한 그 레시피? 직접 만들어보세요!",
    tags: ["요리", "레시피", "홈쿡"]
  }
];

function Ranking() {
  const [likes, setLikes] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [sortBy, setSortBy] = useState("likes");
  const [timeFilter, setTimeFilter] = useState("all");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("emo.ranking.likes");
      if (saved) setLikes(JSON.parse(saved));
    } catch (_) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("emo.ranking.likes", JSON.stringify(likes));
    } catch (_) {}
  }, [likes]);

  const categories = ["전체", ...new Set(MOCK_CONTENTS.map(c => c.category))];

  const filteredAndRanked = useMemo(() => {
    let filtered = MOCK_CONTENTS.filter(c => 
      selectedCategory === "전체" || c.category === selectedCategory
    );

    // 시간 필터 적용 (실제로는 날짜 계산이 필요하지만 여기서는 간단히 처리)
    if (timeFilter === "week") {
      filtered = filtered.filter(c => c.uploadDate >= "2025-01-08");
    } else if (timeFilter === "month") {
      filtered = filtered.filter(c => c.uploadDate >= "2024-12-15");
    }

    // 정렬
    const sorted = filtered.sort((a, b) => {
      if (sortBy === "likes") {
        return (b.likes || 0) - (a.likes || 0);
      } else if (sortBy === "views") {
        return b.views - a.views;
      } else if (sortBy === "price") {
        return b.price - a.price;
      }
      return 0;
    });

    return sorted.map((c, i) => ({ 
      ...c, 
      rank: i + 1,
      likes: Number(likes[c.id] || 0)
    }));
  }, [likes, selectedCategory, sortBy, timeFilter]);

  const like = (id) => setLikes((m) => ({ ...m, [id]: Number(m[id] || 0) + 1 }));

  const rankBadge = (r) => {
    if (r === 1) return { emoji: "🥇", text: "1위", color: "#FFD700" };
    if (r === 2) return { emoji: "🥈", text: "2위", color: "#C0C0C0" };
    if (r === 3) return { emoji: "🥉", text: "3위", color: "#CD7F32" };
    return { emoji: "", text: `${r}위`, color: "#666" };
  };

  const totalLikes = Object.values(likes).reduce((sum, count) => sum + count, 0);
  const totalViews = MOCK_CONTENTS.reduce((sum, c) => sum + c.views, 0);
  const avgPrice = (MOCK_CONTENTS.reduce((sum, c) => sum + c.price, 0) / MOCK_CONTENTS.length).toFixed(3);

  return (
    <div className="ranking-container">
      {/* 헤더 섹션 */}
      <div className="card ranking-header">
        <div className="header-content">
          <div className="header-text">
            <h1 className="ranking-title">🏆 인기 랭킹</h1>
            <p className="ranking-subtitle">응원 수 기준 실시간 랭킹을 확인하세요</p>
          </div>
          <div className="header-stats">
            <div className="stat-item">
              <div className="stat-number">{totalLikes}</div>
              <div className="stat-label">총 응원</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{totalViews.toLocaleString()}</div>
              <div className="stat-label">총 조회수</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{avgPrice} ETH</div>
              <div className="stat-label">평균 가격</div>
            </div>
          </div>
        </div>
      </div>

      {/* 필터 섹션 */}
      <div className="card filter-section">
        <div className="filter-row">
          <div className="filter-group">
            <label>카테고리</label>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>정렬 기준</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="likes">응원 수</option>
              <option value="views">조회수</option>
              <option value="price">가격</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>기간</label>
            <select 
              value={timeFilter} 
              onChange={(e) => setTimeFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">전체</option>
              <option value="week">최근 1주</option>
              <option value="month">최근 1개월</option>
            </select>
          </div>
        </div>
      </div>

      {/* 랭킹 리스트 */}
      <div className="card ranking-list">
        <div className="ranking-grid">
          {filteredAndRanked.map((c, index) => {
            const badge = rankBadge(c.rank);
            return (
              <div key={c.id} className={`ranking-item ${index < 3 ? 'top-three' : ''}`}>
                <div className="rank-section">
                  <div 
                    className="rank-badge"
                    style={{ color: badge.color }}
                  >
                    {badge.emoji} {badge.text}
                  </div>
                </div>
                
                <div className="content-section">
                  <div className="content-icon">{c.icon}</div>
                  <div className="content-info">
                    <h3 className="content-title">{c.title}</h3>
                    <p className="content-description">{c.description}</p>
                    <div className="content-meta">
                      <span className="creator">👤 {c.creator}</span>
                      <span className="category">📂 {c.category}</span>
                      <span className="date">📅 {c.uploadDate}</span>
                    </div>
                    <div className="content-tags">
                      {c.tags.map(tag => (
                        <span key={tag} className="tag">#{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="stats-section">
                  <div className="stat-row">
                    <div className="stat">
                      <div className="stat-value">{c.likes}</div>
                      <div className="stat-label">응원</div>
                    </div>
                    <div className="stat">
                      <div className="stat-value">{c.views.toLocaleString()}</div>
                      <div className="stat-label">조회</div>
                    </div>
                    <div className="stat">
                      <div className="stat-value">{c.price} ETH</div>
                      <div className="stat-label">가격</div>
                    </div>
                  </div>
                  <button 
                    className="like-btn"
                    onClick={() => like(c.id)}
                  >
                    💖 응원하기
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 차트 섹션 */}
      <div className="card chart-section">
        <h3>📊 인기도 트렌드</h3>
        <div className="chart-placeholder">
          <div className="chart-bars">
            {filteredAndRanked.slice(0, 5).map((c, index) => (
              <div key={c.id} className="chart-bar">
                <div 
                  className="bar-fill"
                  style={{ 
                    height: `${Math.max((c.likes / Math.max(...filteredAndRanked.map(item => item.likes), 1)) * 100, 10)}%`,
                    animationDelay: `${index * 0.1}s`
                  }}
                ></div>
                <div className="bar-label">{c.title}</div>
                <div className="bar-value">{c.likes}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ranking;
  
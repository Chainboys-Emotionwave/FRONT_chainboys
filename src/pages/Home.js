import { Link } from "react-router-dom";
import { useState } from "react";
import RewardPoolPanel from "../components/RewardPoolPanel";

// 데모용 인기 콘텐츠 데이터
const POPULAR_CONTENTS = [
  {
    id: "1",
    title: "아이돌 커버송 메들리",
    creator: "MusicLover123",
    thumbnail: "🎵",
    category: "음악",
    cheers: 15420,
    price: "0.05 ETH",
    uploadDate: "2025-01-15",
    description: "인기곡을 아름다운 목소리로 커버한 작품"
  },
  {
    id: "2", 
    title: "팬 아트 컬렉션",
    creator: "ArtMaster",
    thumbnail: "🎨",
    category: "아트",
    cheers: 8930,
    price: "0.03 ETH",
    uploadDate: "2025-01-14",
    description: "디지털 아트로 표현한 팬아트 작품"
  },
  {
    id: "3",
    title: "댄스 챌린지",
    creator: "DanceQueen", 
    thumbnail: "💃",
    category: "댄스",
    cheers: 22100,
    price: "0.08 ETH",
    uploadDate: "2025-01-13",
    description: "트렌디한 댄스 챌린지 영상"
  },
  {
    id: "4",
    title: "리믹스 트랙",
    creator: "BeatMaker",
    thumbnail: "🎧", 
    category: "음악",
    cheers: 18750,
    price: "0.06 ETH",
    uploadDate: "2025-01-12",
    description: "독창적인 리믹스로 재탄생한 히트곡"
  },
  {
    id: "5",
    title: "코믹 스케치",
    creator: "ComedyKing",
    thumbnail: "🎭",
    category: "코미디", 
    cheers: 12300,
    price: "0.02 ETH",
    uploadDate: "2025-01-11",
    description: "웃음이 터지는 코믹 스케치"
  },
  {
    id: "6",
    title: "아이돌 레시피",
    creator: "ChefMaster",
    thumbnail: "🍳",
    category: "라이프스타일",
    cheers: 9650,
    price: "0.04 ETH", 
    uploadDate: "2025-01-10",
    description: "아이돌이 추천한 그 레시피? 직접 만들어보세요!"
  }
];

function Home() {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [sortBy, setSortBy] = useState("cheers");

  const categories = ["전체", ...new Set(POPULAR_CONTENTS.map(c => c.category))];

  const filteredContents = POPULAR_CONTENTS
    .filter(content => selectedCategory === "전체" || content.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === "cheers") return b.cheers - a.cheers;
      if (sortBy === "price") return parseFloat(b.price) - parseFloat(a.price);
      if (sortBy === "date") return new Date(b.uploadDate) - new Date(a.uploadDate);
      return 0;
    });

  return (
    <div>
      <RewardPoolPanel />

      {/* 메인 히어로 섹션 */}
      <div className="card hero-section">
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
          <h1 style={{ color: '#333', marginBottom: '16px', fontSize: '2.5rem' }}>
            🎵 EmotionWave
          </h1>
          <p style={{ color: '#666', fontSize: '20px', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px auto' }}>
            K-POP 팬 창작자의 열정과 기여가 정당한 가치로 인정받는 생태계
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link className="btn btn-primary" to="/upload" style={{ fontSize: '18px', padding: '12px 24px' }}>
              📤 콘텐츠 등록하기
            </Link>
            <Link className="btn btn-secondary" to="/ranking" style={{ fontSize: '18px', padding: '12px 24px' }}>
              🏆 랭킹 보기
            </Link>
          </div>
        </div>
      </div>

      {/* 통계 섹션 */}
      <div className="card stats-section">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', textAlign: 'center' }}>
          <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '12px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📊</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>1,247</div>
            <div style={{ color: '#666' }}>등록된 콘텐츠</div>
          </div>
          <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '12px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>👥</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>892</div>
            <div style={{ color: '#666' }}>활성 창작자</div>
          </div>
          <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '12px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>💎</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>45.2 ETH</div>
            <div style={{ color: '#666' }}>총 보상 풀</div>
          </div>
          <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '12px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🏆</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>156</div>
            <div style={{ color: '#666' }}>발급된 배지</div>
          </div>
        </div>
      </div>

      {/* 인기 콘텐츠 섹션 */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <h2 style={{ color: '#333', margin: 0 }}>🔥 인기 콘텐츠</h2>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #ddd' }}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #ddd' }}
            >
              <option value="cheers">응원순</option>
              <option value="price">가격순</option>
              <option value="date">최신순</option>
            </select>
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {filteredContents.map((content) => (
            <div key={content.id} style={{ 
              background: '#fff', 
              border: '1px solid #e9ecef',
              borderRadius: '12px', 
              overflow: 'hidden',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{ padding: '20px', textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>{content.thumbnail}</div>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem' }}>
                  <Link to={`/content/${content.id}`} style={{ textDecoration: 'none', color: '#333' }}>
                    {content.title}
                  </Link>
                </h3>
                <p style={{ color: '#666', fontSize: '14px', margin: '0 0 8px 0' }}>
                  👤 {content.creator}
                </p>
                <p style={{ color: '#666', fontSize: '13px', margin: '0 0 12px 0' }}>
                  📂 {content.category} • 📅 {content.uploadDate}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ color: '#e74c3c', fontSize: '14px', fontWeight: 'bold' }}>
                    ❤️ {content.cheers.toLocaleString()}
                  </span>
                  <span style={{ color: '#27ae60', fontSize: '14px', fontWeight: 'bold' }}>
                    💰 {content.price}
                  </span>
                </div>
                <Link 
                  className="btn" 
                  to={`/content/${content.id}`}
                  style={{ 
                    fontSize: '14px', 
                    padding: '10px 20px', 
                    display: 'inline-block',
                    width: '100%',
                    textAlign: 'center'
                  }}
                >
                  자세히 보기
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <Link className="btn btn-outline" to="/ranking" style={{ padding: '12px 24px' }}>
            더 많은 콘텐츠 보기 →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;  
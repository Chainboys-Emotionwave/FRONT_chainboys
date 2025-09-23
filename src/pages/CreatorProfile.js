import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

// 데모용 크리에이터 데이터 (Ranking.js와 동일)
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
    character: "🎵",
    joinDate: "2024-01-15",
    description: "K-POP 커버곡과 오리지널 음악을 만드는 음악의 요정입니다. 다양한 장르의 음악을 시도하며 팬들과 소통하는 것을 좋아합니다.",
    socialLinks: {
      youtube: "https://youtube.com/@musicfairy",
      instagram: "@music_fairy_official",
      twitter: "@musicfairy_kpop"
    }
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
    character: "💃",
    joinDate: "2024-02-03",
    description: "K-POP 댄스 커버와 오리지널 안무를 만드는 댄서입니다. 섬세한 표현력과 강렬한 퍼포먼스로 많은 사랑을 받고 있습니다.",
    socialLinks: {
      youtube: "https://youtube.com/@dancingflower",
      instagram: "@dancing_flower_kpop",
      tiktok: "@dancingflower_official"
    }
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
    character: "🎨",
    joinDate: "2024-01-28",
    description: "K-POP 아이돌 팬아트와 디지털 일러스트를 전문으로 하는 아티스트입니다. 생동감 넘치는 색감과 독특한 스타일이 특징입니다.",
    socialLinks: {
      instagram: "@art_master_kpop",
      twitter: "@artmaster_illust"
    }
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
    character: "🥁",
    joinDate: "2024-02-10",
    description: "드럼과 비트메이킹을 전문으로 하는 뮤지션입니다. K-POP의 강렬한 리듬을 재해석하여 새로운 사운드를 만들어냅니다.",
    socialLinks: {
      youtube: "https://youtube.com/@rhythmwizard",
      instagram: "@rhythm_wizard_drums"
    }
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
    character: "😄",
    joinDate: "2024-02-15",
    description: "K-POP 관련 코미디 콘텐츠와 패러디를 만드는 크리에이터입니다. 유쾌한 에너지로 팬들에게 웃음을 선사합니다.",
    socialLinks: {
      youtube: "https://youtube.com/@comedychef",
      tiktok: "@comedy_chef_kpop"
    }
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
    character: "🍳",
    joinDate: "2024-01-20",
    description: "K-POP 아이돌들이 좋아할 만한 요리와 간식을 만드는 요리사입니다. 팬들과 함께하는 요리 시간을 즐깁니다.",
    socialLinks: {
      youtube: "https://youtube.com/@villagechef",
      instagram: "@village_chef_kpop"
    }
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
    character: "🎭",
    joinDate: "2024-02-05",
    description: "K-POP 뮤직비디오와 무대를 연극적으로 재해석하는 아티스트입니다. 감정 표현의 달인으로 유명합니다.",
    socialLinks: {
      youtube: "https://youtube.com/@theatermaster",
      instagram: "@theater_master_kpop"
    }
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
    character: "📸",
    joinDate: "2024-01-25",
    description: "K-POP 콘서트와 이벤트 사진을 전문으로 촬영하는 포토그래퍼입니다. 순간의 아름다움을 포착하는 것이 특기입니다.",
    socialLinks: {
      instagram: "@photo_master_kpop",
      twitter: "@photographer_kpop"
    }
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
    character: "🎪",
    joinDate: "2024-02-12",
    description: "K-POP 댄스와 서커스 기술을 결합한 독특한 퍼포먼스를 선보이는 아티스트입니다. 화려한 묘기를 자랑합니다.",
    socialLinks: {
      youtube: "https://youtube.com/@circusartist",
      instagram: "@circus_artist_kpop"
    }
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
    character: "🎨",
    joinDate: "2024-01-30",
    description: "3D 모델링과 디지털 아트로 K-POP 아이돌을 재현하는 아티스트입니다. 현실적인 디지털 아트가 특기입니다.",
    socialLinks: {
      instagram: "@digital_artist_kpop",
      artstation: "@digitalartist_kpop"
    }
  }
];

// 데모용 콘텐츠 데이터
const MOCK_CONTENTS = [
  {
    id: "content1",
    creatorId: "1",
    title: "NewJeans - Get Up 커버",
    thumbnail: "https://via.placeholder.com/300x200/8bc34a/ffffff?text=NewJeans+Cover",
    views: 15420,
    cheers: 892,
    uploadDate: "2024-02-20",
    category: "음악"
  },
  {
    id: "content2", 
    creatorId: "1",
    title: "LE SSERAFIM - UNFORGIVEN 리믹스",
    thumbnail: "https://via.placeholder.com/300x200/ff9800/ffffff?text=LE+SSERAFIM+Remix",
    views: 12300,
    cheers: 678,
    uploadDate: "2024-02-18",
    category: "음악"
  },
  {
    id: "content3",
    creatorId: "2", 
    title: "aespa - Drama 댄스 커버",
    thumbnail: "https://via.placeholder.com/300x200/e91e63/ffffff?text=aespa+Dance",
    views: 9870,
    cheers: 456,
    uploadDate: "2024-02-19",
    category: "댄스"
  }
];

function CreatorProfile() {
  const { id } = useParams();
  const [creator, setCreator] = useState(null);
  const [creatorContents, setCreatorContents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 크리에이터 정보 로드
    const foundCreator = MOCK_CREATORS.find(c => c.id === id);
    if (foundCreator) {
      setCreator(foundCreator);
      
      // 해당 크리에이터의 콘텐츠 로드
      const contents = MOCK_CONTENTS.filter(content => content.creatorId === id);
      setCreatorContents(contents);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <div style={{ fontSize: '24px', marginBottom: '16px' }}>⏳</div>
        <p>크리에이터 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (!creator) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>😵</div>
        <h2>크리에이터를 찾을 수 없습니다</h2>
        <p style={{ color: '#666', marginBottom: '24px' }}>
          요청하신 크리에이터가 존재하지 않거나 삭제되었습니다.
        </p>
        <Link to="/ranking" className="btn btn-primary">
          랭킹으로 돌아가기
        </Link>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div>
      {/* 크리에이터 프로필 헤더 */}
      <div className="card hero-section" style={{
        background: 'linear-gradient(135deg, #aed581 0%, #ffb74d 100%)',
        color: 'white',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '20px' }}>
          {/* 프로필 이미지 */}
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px',
            border: '4px solid rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(10px)'
          }}>
            {creator.character}
          </div>

          {/* 크리에이터 정보 */}
          <div style={{ flex: 1 }}>
            <h1 style={{ margin: '0 0 8px 0', fontSize: '2rem' }}>
              {creator.nickname}
            </h1>
            <div style={{ 
              display: 'flex', 
              gap: '16px', 
              marginBottom: '12px',
              fontSize: '14px',
              opacity: 0.9
            }}>
              <span>📂 {creator.category}</span>
              <span>📅 가입일: {formatDate(creator.joinDate)}</span>
              <span>📍 {creator.walletAddress}</span>
            </div>
            <p style={{ 
              margin: '0 0 16px 0', 
              fontSize: '16px',
              opacity: 0.9,
              lineHeight: '1.5'
            }}>
              {creator.description}
            </p>
            
            {/* 뱃지 */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {creator.badges.map((badge, idx) => (
                <span 
                  key={idx}
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    border: '1px solid rgba(255, 255, 255, 0.3)'
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* 통계 */}
          <div style={{ textAlign: 'center', minWidth: '150px' }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '16px',
              marginBottom: '16px'
            }}>
              <div>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                  {creator.weeklyCheers.toLocaleString()}
                </div>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>주간 응원</div>
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                  {creator.totalCheers.toLocaleString()}
                </div>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>누적 응원</div>
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                  {creator.contentCount}
                </div>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>콘텐츠</div>
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                  {creator.badges.length}
                </div>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>뱃지</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 소셜 링크 */}
      {creator.socialLinks && (
        <div className="card" style={{ marginBottom: '24px' }}>
          <h3 style={{ margin: '0 0 16px 0', color: '#333' }}>🔗 소셜 링크</h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {Object.entries(creator.socialLinks).map(([platform, link]) => {
              const platformEmoji = {
                youtube: '📺',
                instagram: '📷',
                twitter: '🐦',
                tiktok: '🎵',
                artstation: '🎨'
              };
              
              return (
                <a 
                  key={platform}
                  href={link.startsWith('http') ? link : `https://${platform}.com/${link.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    background: '#f8f9fa',
                    borderRadius: '20px',
                    textDecoration: 'none',
                    color: '#333',
                    border: '1px solid #e9ecef',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#aed581';
                    e.target.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = '#f8f9fa';
                    e.target.style.color = '#333';
                  }}
                >
                  <span>{platformEmoji[platform] || '🔗'}</span>
                  <span style={{ fontSize: '14px', fontWeight: 'bold' }}>
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* 크리에이터 콘텐츠 */}
      <div className="card">
        <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>
          📝 {creator.nickname}의 콘텐츠
        </h3>
        
        {creatorContents.length > 0 ? (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '20px' 
          }}>
            {creatorContents.map(content => (
              <div key={content.id} style={{
                background: '#f8f9fa',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid #e9ecef',
                transition: 'transform 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                <div style={{
                  width: '100%',
                  height: '200px',
                  background: `url(${content.thumbnail}) center/cover`,
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    background: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}>
                    {content.category}
                  </div>
                </div>
                <div style={{ padding: '16px' }}>
                  <h4 style={{ 
                    margin: '0 0 8px 0', 
                    color: '#333',
                    fontSize: '16px',
                    lineHeight: '1.4'
                  }}>
                    {content.title}
                  </h4>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    fontSize: '12px',
                    color: '#666',
                    marginBottom: '12px'
                  }}>
                    <span>👀 {content.views.toLocaleString()} 조회</span>
                    <span>🎉 {content.cheers.toLocaleString()} 응원</span>
                  </div>
                  <div style={{ 
                    fontSize: '12px', 
                    color: '#999' 
                  }}>
                    업로드: {formatDate(content.uploadDate)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px',
            color: '#666'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📝</div>
            <p>아직 업로드된 콘텐츠가 없습니다.</p>
          </div>
        )}
      </div>

      {/* 액션 버튼 */}
      <div style={{ 
        display: 'flex', 
        gap: '16px', 
        justifyContent: 'center',
        marginTop: '24px'
      }}>
        <Link to="/ranking" className="btn btn-outline">
          ← 랭킹으로 돌아가기
        </Link>
        <button className="btn btn-primary">
          🎉 응원하기
        </button>
      </div>
    </div>
  );
}

export default CreatorProfile;

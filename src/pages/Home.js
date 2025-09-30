import { Link } from "react-router-dom";
import { useState } from "react";
import VillageMap from "../components/VillageMap";
import BuildingModal from "../components/BuildingModal";
import RewardPoolPanel from "../components/RewardPoolPanel";

// 데모용 인기 콘텐츠 데이터
const POPULAR_CONTENTS = [
  {
    id: "1",
    title: "아이돌 커버송 메들리",
    creator: "MusicLover123",
    category: "K-POP",
    cheers: 156,
    price: "0.05 ETH",
    uploadDate: "2025-01-15"
  },
  {
    id: "2", 
    title: "감성 발라드 모음",
    creator: "BalladMaster",
    category: "Ballad",
    cheers: 89,
    price: "0.03 ETH",
    uploadDate: "2025-01-14"
  },
  {
    id: "3",
    title: "힙합 비트 컬렉션",
    creator: "HipHopKing",
    category: "Hip-Hop",
    cheers: 234,
    price: "0.08 ETH",
    uploadDate: "2025-01-13"
  }
];

function Home() {
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleBuildingClick = (building) => {
    setSelectedBuilding(building);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBuilding(null);
    setSelectedCategory(null);
  };

  const handleVillageClick = (category) => {
    setSelectedCategory(category);
  };


  // 카테고리별 게시물 데이터
  const categoryPosts = {
    music: [
      { id: "m1", title: "BTS Dynamite 커버", creator: "ARMY_cover", cheers: 234, price: "0.08 ETH", uploadDate: "2025-01-15" },
      { id: "m2", title: "아이유 팔레트 리메이크", creator: "IU_fan", cheers: 189, price: "0.06 ETH", uploadDate: "2025-01-14" },
      { id: "m3", title: "NewJeans OMG 믹스", creator: "Bunnies_mix", cheers: 156, price: "0.05 ETH", uploadDate: "2025-01-13" },
      { id: "m4", title: "LE SSERAFIM UNFORGIVEN", creator: "FEARNOT_music", cheers: 167, price: "0.07 ETH", uploadDate: "2025-01-12" },
      { id: "m5", title: "ITZY SNEAKERS 리믹스", creator: "MIDZY_remix", cheers: 145, price: "0.06 ETH", uploadDate: "2025-01-11" },
      { id: "m6", title: "aespa Girls 아카펠라", creator: "MY_vocal", cheers: 178, price: "0.08 ETH", uploadDate: "2025-01-10" },
      { id: "m7", title: "TWICE Talk that Talk 커버", creator: "ONCE_singer", cheers: 201, price: "0.07 ETH", uploadDate: "2025-01-09" },
      { id: "m8", title: "BLACKPINK Shut Down 믹스", creator: "BLINK_dj", cheers: 223, price: "0.09 ETH", uploadDate: "2025-01-08" },
      { id: "m9", title: "Red Velvet Feel My Rhythm", creator: "Reveluv_cover", cheers: 134, price: "0.05 ETH", uploadDate: "2025-01-07" },
      { id: "m10", title: "Stray Kids Thunderous 리메이크", creator: "STAY_producer", cheers: 189, price: "0.08 ETH", uploadDate: "2025-01-06" }
    ],
    art: [
      { id: "a1", title: "BTS 아미 아트워크", creator: "ARMY_artist", cheers: 145, price: "0.09 ETH", uploadDate: "2025-01-15" },
      { id: "a2", title: "아이유 팬아트 컬렉션", creator: "IU_art", cheers: 123, price: "0.07 ETH", uploadDate: "2025-01-14" },
      { id: "a3", title: "NewJeans 캐릭터 디자인", creator: "Bunnies_design", cheers: 98, price: "0.05 ETH", uploadDate: "2025-01-13" },
      { id: "a4", title: "K-POP 아이돌 일러스트", creator: "Kpop_illustrator", cheers: 187, price: "0.08 ETH", uploadDate: "2025-01-12" },
      { id: "a5", title: "LE SSERAFIM 팬아트 갤러리", creator: "FEARNOT_artist", cheers: 156, price: "0.07 ETH", uploadDate: "2025-01-11" },
      { id: "a6", title: "ITZY 댄스 포즈 스케치", creator: "MIDZY_sketch", cheers: 134, price: "0.06 ETH", uploadDate: "2025-01-10" },
      { id: "a7", title: "aespa AI 아트 컬렉션", creator: "MY_ai_art", cheers: 167, price: "0.08 ETH", uploadDate: "2025-01-09" },
      { id: "a8", title: "TWICE 컬러풀 팬아트", creator: "ONCE_colorful", cheers: 145, price: "0.07 ETH", uploadDate: "2025-01-08" },
      { id: "a9", title: "BLACKPINK 팝아트 스타일", creator: "BLINK_pop", cheers: 178, price: "0.09 ETH", uploadDate: "2025-01-07" },
      { id: "a10", title: "Red Velvet 드림캐처 아트", creator: "Reveluv_dream", cheers: 123, price: "0.06 ETH", uploadDate: "2025-01-06" }
    ],
    dance: [
      { id: "d1", title: "BTS 댄스 커버 영상", creator: "ARMY_dancer", cheers: 198, price: "0.06 ETH", uploadDate: "2025-01-15" },
      { id: "d2", title: "아이유 댄스 튜토리얼", creator: "IU_dance", cheers: 134, price: "0.05 ETH", uploadDate: "2025-01-14" },
      { id: "d3", title: "NewJeans 댄스 배틀", creator: "Bunnies_battle", cheers: 167, price: "0.07 ETH", uploadDate: "2025-01-13" },
      { id: "d4", title: "K-POP 댄스 챌린지", creator: "Kpop_challenge", cheers: 223, price: "0.09 ETH", uploadDate: "2025-01-12" },
      { id: "d5", title: "LE SSERAFIM 댄스 커버", creator: "FEARNOT_dance", cheers: 145, price: "0.06 ETH", uploadDate: "2025-01-11" },
      { id: "d6", title: "ITZY 에너지 댄스", creator: "MIDZY_energy", cheers: 189, price: "0.08 ETH", uploadDate: "2025-01-10" },
      { id: "d7", title: "aespa 시네마틱 댄스", creator: "MY_cinema", cheers: 156, price: "0.07 ETH", uploadDate: "2025-01-09" },
      { id: "d8", title: "TWICE 그룹 댄스", creator: "ONCE_group", cheers: 201, price: "0.08 ETH", uploadDate: "2025-01-08" },
      { id: "d9", title: "BLACKPINK 파워 댄스", creator: "BLINK_power", cheers: 234, price: "0.09 ETH", uploadDate: "2025-01-07" },
      { id: "d10", title: "Red Velvet 우아한 댄스", creator: "Reveluv_elegant", cheers: 167, price: "0.07 ETH", uploadDate: "2025-01-06" }
    ],
    comedy: [
      { id: "c1", title: "BTS 코미디 스케치", creator: "ARMY_comedy", cheers: 156, price: "0.05 ETH", uploadDate: "2025-01-15" },
      { id: "c2", title: "아이유 개그 콘텐츠", creator: "IU_funny", cheers: 112, price: "0.04 ETH", uploadDate: "2025-01-14" },
      { id: "c3", title: "NewJeans 유머 영상", creator: "Bunnies_humor", cheers: 89, price: "0.03 ETH", uploadDate: "2025-01-13" },
      { id: "c4", title: "K-POP 팬 코미디", creator: "Kpop_comedy", cheers: 145, price: "0.06 ETH", uploadDate: "2025-01-12" },
      { id: "c5", title: "LE SSERAFIM 개그 쇼", creator: "FEARNOT_gag", cheers: 123, price: "0.05 ETH", uploadDate: "2025-01-11" },
      { id: "c6", title: "ITZY 에너지 코미디", creator: "MIDZY_energy", cheers: 134, price: "0.06 ETH", uploadDate: "2025-01-10" },
      { id: "c7", title: "aespa AI 개그", creator: "MY_ai_comedy", cheers: 98, price: "0.04 ETH", uploadDate: "2025-01-09" },
      { id: "c8", title: "TWICE 그룹 코미디", creator: "ONCE_group", cheers: 167, price: "0.07 ETH", uploadDate: "2025-01-08" },
      { id: "c9", title: "BLACKPINK 파워 코미디", creator: "BLINK_power", cheers: 189, price: "0.08 ETH", uploadDate: "2025-01-07" },
      { id: "c10", title: "Red Velvet 달콤한 개그", creator: "Reveluv_sweet", cheers: 145, price: "0.06 ETH", uploadDate: "2025-01-06" }
    ]
  };

  const renderBuildingContent = (building) => {
    switch (building.id) {
      case 'townhall':
        return (
          <div>
            <h3 style={{ color: '#2E7D32', fontFamily: 'Fredoka, sans-serif', marginBottom: '20px' }}>
              🏛️ 마을회관에 오신 것을 환영합니다!
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              <div style={{ background: 'rgba(139, 195, 74, 0.1)', padding: '20px', borderRadius: '15px' }}>
                <h4 style={{ color: '#2E7D32', fontFamily: 'Fredoka, sans-serif' }}>📜 마을 규칙</h4>
                <ul style={{ fontFamily: 'Nunito, sans-serif', color: '#666' }}>
                  <li>서로를 존중하고 예의를 지켜주세요</li>
                  <li>창작물에 대한 건설적인 피드백을 제공하세요</li>
                  <li>마을 발전에 적극적으로 참여해주세요</li>
                </ul>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.9)', padding: '20px', borderRadius: '15px' }}>
                <h4 style={{ color: '#2E7D32', fontFamily: 'Fredoka, sans-serif' }}>🗺️ 마을 가이드</h4>
                <p style={{ fontFamily: 'Nunito, sans-serif', color: '#666' }}>
                  EmotionWave Village에서의 즐거운 생활을 위한 가이드입니다.
                </p>
                <Link to="/guide" className="btn" style={{ marginTop: '10px' }}>
                  가이드 보기 →
                </Link>
              </div>
            </div>
          </div>
        );

      case 'musicstudio':
        return (
          <div>
            <h3 style={{ color: '#2E7D32', fontFamily: 'Fredoka, sans-serif', marginBottom: '20px' }}>
              🎵 음악실에서 창작의 시간을 가져보세요!
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.9)', padding: '20px', borderRadius: '15px', textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '10px' }}>🎤</div>
                <h4 style={{ color: '#2E7D32', fontFamily: 'Fredoka, sans-serif' }}>음악 업로드</h4>
                <p style={{ fontFamily: 'Nunito, sans-serif', color: '#666', marginBottom: '15px' }}>
                  새로운 음악을 업로드하고 마을 주민들과 공유하세요
                </p>
                <Link to="/upload" className="btn">
                  업로드하기 →
                </Link>
              </div>
              <div style={{ background: 'rgba(76, 175, 80, 0.1)', padding: '20px', borderRadius: '15px', textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '10px' }}>🎧</div>
                <h4 style={{ color: '#2E7D32', fontFamily: 'Fredoka, sans-serif' }}>내 음악 관리</h4>
                <p style={{ fontFamily: 'Nunito, sans-serif', color: '#666', marginBottom: '15px' }}>
                  업로드한 음악들을 관리하고 통계를 확인하세요
                </p>
                <Link to="/collection" className="btn">
                  관리하기 →
                </Link>
              </div>
            </div>
          </div>
        );

      case 'festivalground':
        return (
          <div>
            <h3 style={{ color: '#2E7D32', fontFamily: 'Fredoka, sans-serif', marginBottom: '20px' }}>
              🏆 랭킹 라운지에서 마을의 인기 작품들을 확인하세요!
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              {POPULAR_CONTENTS.slice(0, 4).map((content) => (
                <div key={content.id} style={{ 
                  background: 'rgba(255, 183, 77, 0.1)', 
                  padding: '15px', 
                  borderRadius: '15px',
                  border: '2px solid rgba(255, 183, 77, 0.3)'
                }}>
                  <h4 style={{ color: '#2E7D32', fontFamily: 'Fredoka, sans-serif', fontSize: '14px', marginBottom: '8px' }}>
                    {content.title}
                  </h4>
                  <p style={{ fontFamily: 'Nunito, sans-serif', color: '#666', fontSize: '12px', marginBottom: '8px' }}>
                    by {content.creator}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: '#FF9800' }}>🎫 {content.cheers}</span>
                    <span style={{ fontSize: '12px', color: '#4CAF50' }}>💰 {content.price}</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <Link to="/ranking" className="btn">
                전체 랭킹 보기 →
              </Link>
            </div>
          </div>
        );

      case 'residentscenter':
        // 랜덤 게시물 추천 데이터
        const randomPosts = [
          {
            id: "1",
            title: "BTS 새 앨범 리뷰",
            creator: "ARMY_forever",
            category: "K-POP",
            cheers: 234,
            price: "0.08 ETH",
            uploadDate: "2025-01-15",
            thumbnail: "🎵"
          },
          {
            id: "2", 
            title: "아이유 감성 발라드 모음",
            creator: "IU_lover",
            category: "Ballad",
            cheers: 189,
            price: "0.06 ETH",
            uploadDate: "2025-01-14",
            thumbnail: "🎤"
          },
          {
            id: "3",
            title: "NewJeans 최신곡 커버",
            creator: "Bunnies_crew",
            category: "K-POP",
            cheers: 156,
            price: "0.05 ETH",
            uploadDate: "2025-01-13",
            thumbnail: "🐰"
          },
          {
            id: "4",
            title: "LE SSERAFIM 댄스 커버",
            creator: "FEARNOT_artist",
            category: "Dance",
            cheers: 98,
            price: "0.04 ETH",
            uploadDate: "2025-01-12",
            thumbnail: "💃"
          },
          {
            id: "5",
            title: "ITZY 에너지 넘치는 믹스",
            creator: "MIDZY_music",
            category: "K-POP",
            cheers: 167,
            price: "0.07 ETH",
            uploadDate: "2025-01-11",
            thumbnail: "⚡"
          },
          {
            id: "6",
            title: "aespa AI 컨셉 음악",
            creator: "MY_world",
            category: "Experimental",
            cheers: 145,
            price: "0.09 ETH",
            uploadDate: "2025-01-10",
            thumbnail: "🤖"
          }
        ];

        // 랜덤하게 4개 선택
        const shuffled = [...randomPosts].sort(() => 0.5 - Math.random());
        const selectedPosts = shuffled.slice(0, 4);

        return (
          <div>
            <h3 style={{ color: '#2E7D32', fontFamily: 'Fredoka, sans-serif', marginBottom: '20px' }}>
              🎲 주민센터에서 추천하는 랜덤 게시물을 확인하세요!
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
              {selectedPosts.map((post, index) => (
                <div key={post.id} style={{ 
                  background: 'rgba(76, 175, 80, 0.1)', 
                  padding: '15px', 
                  borderRadius: '15px',
                  border: '2px solid rgba(76, 175, 80, 0.3)',
                  transition: 'transform 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <div style={{ fontSize: '24px', marginRight: '10px' }}>{post.thumbnail}</div>
                    <div>
                      <h4 style={{ color: '#2E7D32', fontFamily: 'Fredoka, sans-serif', fontSize: '14px', marginBottom: '4px' }}>
                        {post.title}
                      </h4>
                      <p style={{ fontFamily: 'Nunito, sans-serif', color: '#666', fontSize: '12px' }}>
                        by {post.creator}
                      </p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ 
                      background: '#4CAF50', 
                      color: 'white', 
                      padding: '2px 6px', 
                      borderRadius: '8px', 
                      fontSize: '10px',
                      fontFamily: 'Quicksand, sans-serif',
                      fontWeight: 'bold'
                    }}>
                      {post.category}
                    </span>
                    <span style={{ fontSize: '12px', color: '#666' }}>
                      {post.uploadDate}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: '#FF9800' }}>🎫 {post.cheers}</span>
                    <span style={{ fontSize: '12px', color: '#4CAF50', fontWeight: 'bold' }}>💰 {post.price}</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button 
                onClick={() => window.location.reload()} 
                style={{
                  background: 'linear-gradient(135deg, #4CAF50, #45a049)',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontFamily: 'Fredoka, sans-serif',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: '0 4px 8px rgba(76, 175, 80, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 12px rgba(76, 175, 80, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 8px rgba(76, 175, 80, 0.3)';
                }}
              >
                🎲 다른 추천 보기
              </button>
            </div>
          </div>
        );

      case 'badgehall':
        return (
          <div>
            <h3 style={{ color: '#2E7D32', fontFamily: 'Fredoka, sans-serif', marginBottom: '20px' }}>
              🏅 명예의 훈장을 확인하세요!
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
              {[
                { icon: "🌱", name: "신입 주민", earned: true },
                { icon: "🎵", name: "활발한 주민", earned: false },
                { icon: "⭐", name: "인기 주민", earned: false },
                { icon: "👑", name: "명예 시민", earned: false }
              ].map((badge, index) => (
                <div key={index} style={{
                  background: badge.earned ? 'rgba(156, 39, 176, 0.1)' : 'rgba(200, 200, 200, 0.1)',
                  padding: '15px',
                  borderRadius: '15px',
                  border: `2px solid ${badge.earned ? 'rgba(156, 39, 176, 0.3)' : 'rgba(200, 200, 200, 0.3)'}`,
                  textAlign: 'center',
                  opacity: badge.earned ? 1 : 0.6
                }}>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>{badge.icon}</div>
                  <h4 style={{ 
                    color: badge.earned ? '#2E7D32' : '#999', 
                    fontFamily: 'Fredoka, sans-serif', 
                    fontSize: '12px',
                    marginBottom: '4px'
                  }}>
                    {badge.name}
                  </h4>
                  {badge.earned && (
                    <div style={{ 
                      fontSize: '10px',
                      color: '#4CAF50',
                      fontFamily: 'Quicksand, sans-serif',
                      fontWeight: 'bold'
                    }}>
                      획득!
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'treasury':
        return (
          <div>
            <h3 style={{ color: '#2E7D32', fontFamily: 'Fredoka, sans-serif', marginBottom: '20px' }}>
              💰 마을 공동 금고 현황
            </h3>
            <RewardPoolPanel />
          </div>
        );


      case 'eventhall':
        return (
          <div>
            <h3 style={{ color: '#2E7D32', fontFamily: 'Fredoka, sans-serif', marginBottom: '20px' }}>
              🎊 축제 홀에서 다양한 축제와 이벤트를 즐기세요!
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
              {[
                { title: "🎪 K-POP 축제", time: "2일 남음", status: "진행중", participants: 156 },
                { title: "🎵 음악 축제", time: "1시간 전", status: "진행중", participants: 89 },
                { title: "💃 댄스 축제", time: "30분 후", status: "예정", participants: 67 },
                { title: "🎭 문화 축제", time: "1일 후", status: "예정", participants: 45 }
              ].map((event, index) => (
                <div key={index} style={{ 
                  background: 'rgba(244, 67, 54, 0.1)', 
                  padding: '15px', 
                  borderRadius: '15px',
                  border: '2px solid rgba(244, 67, 54, 0.3)'
                }}>
                  <h4 style={{ color: '#2E7D32', fontFamily: 'Fredoka, sans-serif', fontSize: '14px', marginBottom: '8px' }}>
                    {event.title}
                  </h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#666' }}>⏰ {event.time}</span>
                    <span style={{ fontSize: '12px', color: '#666' }}>👥 {event.participants}명</span>
                  </div>
                  <div style={{ 
                    background: event.status === '진행중' ? '#4CAF50' : '#FF9800',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '10px',
                    fontSize: '10px',
                    fontFamily: 'Quicksand, sans-serif',
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}>
                    {event.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return <div>건물 정보를 불러오는 중...</div>;
    }
  };

  return (
    <div>
      {/* 마을 지도 */}
      <div style={{ marginBottom: '30px' }}>
        <VillageMap onBuildingClick={handleBuildingClick} />
      </div>

      {/* 건물 모달 */}
      <BuildingModal 
        building={selectedBuilding}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      >
        {selectedBuilding && renderBuildingContent(selectedBuilding)}
      </BuildingModal>
    </div>
  );
}

export default Home;

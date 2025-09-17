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

  const handleBuildingClick = (building) => {
    setSelectedBuilding(building);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBuilding(null);
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
              <div style={{ background: 'rgba(33, 150, 243, 0.1)', padding: '20px', borderRadius: '15px' }}>
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
              <div style={{ background: 'rgba(33, 150, 243, 0.1)', padding: '20px', borderRadius: '15px', textAlign: 'center' }}>
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
              🏆 축제장에서 마을의 인기 작품들을 확인하세요!
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
        return (
          <div>
            <h3 style={{ color: '#2E7D32', fontFamily: 'Fredoka, sans-serif', marginBottom: '20px' }}>
              👥 현재 온라인 주민들을 만나보세요!
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              {[
                { name: "MusicLover123", avatar: "🎵", level: "성숙 주민", activity: "음악 창작 중" },
                { name: "ArtMaster", avatar: "🎨", level: "명예 시민", activity: "아트 갤러리 관람" },
                { name: "DanceQueen", avatar: "💃", level: "활발 주민", activity: "댄스 연습 중" },
                { name: "ComedyKing", avatar: "🎭", level: "신규 주민", activity: "코미디 쇼 관람" }
              ].map((resident, index) => (
                <div key={index} style={{ 
                  background: 'rgba(76, 175, 80, 0.1)', 
                  padding: '15px', 
                  borderRadius: '15px',
                  border: '2px solid rgba(76, 175, 80, 0.3)',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>{resident.avatar}</div>
                  <h4 style={{ color: '#2E7D32', fontFamily: 'Fredoka, sans-serif', fontSize: '14px', marginBottom: '4px' }}>
                    {resident.name}
                  </h4>
                  <p style={{ fontFamily: 'Nunito, sans-serif', color: '#666', fontSize: '12px', marginBottom: '4px' }}>
                    {resident.level}
                  </p>
                  <p style={{ fontFamily: 'Nunito, sans-serif', color: '#4CAF50', fontSize: '11px' }}>
                    {resident.activity}
                  </p>
                </div>
              ))}
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

      case 'artgallery':
        return (
          <div>
            <h3 style={{ color: '#2E7D32', fontFamily: 'Fredoka, sans-serif', marginBottom: '20px' }}>
              🎨 아티스트별 전용 마을을 탐험하세요!
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              {[
                { name: "음악 마을", icon: "🎵", residents: 45, color: "#2196F3" },
                { name: "아트 마을", icon: "🎨", residents: 32, color: "#E91E63" },
                { name: "댄스 마을", icon: "💃", residents: 28, color: "#FF9800" },
                { name: "코미디 마을", icon: "🎭", residents: 19, color: "#9C27B0" }
              ].map((village, index) => (
                <div key={index} style={{ 
                  background: `rgba(${village.color === "#2196F3" ? "33, 150, 243" : 
                                   village.color === "#E91E63" ? "233, 30, 99" :
                                   village.color === "#FF9800" ? "255, 152, 0" : "156, 39, 176"}, 0.1)`, 
                  padding: '15px', 
                  borderRadius: '15px',
                  border: `2px solid ${village.color}40`,
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>{village.icon}</div>
                  <h4 style={{ color: '#2E7D32', fontFamily: 'Fredoka, sans-serif', fontSize: '14px', marginBottom: '4px' }}>
                    {village.name}
                  </h4>
                  <p style={{ fontFamily: 'Nunito, sans-serif', color: '#666', fontSize: '12px' }}>
                    주민 {village.residents}명
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'eventhall':
        return (
          <div>
            <h3 style={{ color: '#2E7D32', fontFamily: 'Fredoka, sans-serif', marginBottom: '20px' }}>
              🎊 실시간 이벤트를 확인하세요!
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
              {[
                { title: "🎵 음악 창작 대회", time: "2일 남음", status: "진행중", participants: 45 },
                { title: "🎨 아트 갤러리 전시", time: "1시간 전", status: "진행중", participants: 23 },
                { title: "💃 댄스 배틀", time: "30분 후", status: "예정", participants: 12 },
                { title: "🎭 코미디 쇼", time: "1일 후", status: "예정", participants: 8 }
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

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import VillageMap from "../components/VillageMap";
import BuildingModal from "../components/BuildingModal";
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
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather, setWeather] = useState("sunny"); // sunny, rainy, snowy
  const [onlineResidents, setOnlineResidents] = useState([
    { id: 1, name: "MusicLover123", avatar: "🎵", level: "성숙 주민", activity: "음악 창작 중" },
    { id: 2, name: "ArtMaster", avatar: "🎨", level: "명예 시민", activity: "음악실에서 활동" },
    { id: 3, name: "DanceQueen", avatar: "💃", level: "성장 주민", activity: "댄스 연습" },
    { id: 4, name: "BeatMaker", avatar: "🎧", level: "성숙 주민", activity: "비트 제작" },
    { id: 5, name: "ComedyKing", avatar: "🎭", level: "새싹 주민", activity: "코미디 스케치" }
  ]);
  const [dailyQuests] = useState([
    { id: 1, title: "음악 창작하기", description: "새로운 음악 작품을 업로드하세요", reward: "🎫 5개", completed: false },
    { id: 2, title: "축제 참여하기", description: "다른 주민의 작품에 축제 참여권을 사용하세요", reward: "🏅 경험치 +100", completed: true },
    { id: 3, title: "마을 탐험하기", description: "3개 이상의 마을 건물을 방문하세요", reward: "💰 0.01 ETH", completed: false }
  ]);
  const [villageEvents] = useState([
    { id: 1, title: "봄 축제", description: "봄을 맞이한 특별한 음악 축제", date: "2025-03-20", type: "seasonal" },
    { id: 2, title: "주간 창작 대회", description: "이번 주 최고의 창작물을 뽑아보세요", date: "2025-01-20", type: "weekly" },
    { id: 3, title: "신규 주민 환영회", description: "새로 입주한 주민들을 환영해주세요", date: "2025-01-18", type: "community" }
  ]);
  const [villageNews] = useState([
    { id: 1, title: "새로운 마을 기능 업데이트!", content: "명예의 훈장 시스템이 추가되었습니다. 특별한 활동으로 훈장을 획득해보세요!", type: "update", date: "2025-01-15" },
    { id: 2, title: "인기 작품 소식", content: "MusicLover123님의 '아이돌 커버송 메들리'가 이번 주 최고 인기 작품으로 선정되었습니다! 🎵", type: "popular", date: "2025-01-14" },
    { id: 3, title: "신규 주민 환영", content: "ComedyKing님과 ChefMaster님이 마을에 새로 입주하셨습니다! 따뜻한 환영 인사를 전해주세요! 🎉", type: "welcome", date: "2025-01-13" },
    { id: 4, title: "축제 참여권 이벤트", content: "이번 주말까지 축제 참여권을 2배로 받을 수 있는 특별 이벤트가 진행 중입니다!", type: "event", date: "2025-01-12" }
  ]);

  const categories = ["전체", ...new Set(POPULAR_CONTENTS.map(c => c.category))];

  // 시간대별 테마 설정
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // 1분마다 업데이트

    return () => clearInterval(timer);
  }, []);

  const getTimeTheme = () => {
    const hour = currentTime.getHours();
    if (hour >= 6 && hour < 12) return "morning";
    if (hour >= 12 && hour < 18) return "afternoon";
    if (hour >= 18 && hour < 22) return "evening";
    return "night";
  };

  const getBackgroundStyle = () => {
    const theme = getTimeTheme();
    const baseStyle = {
      position: 'relative',
      background: 'linear-gradient(135deg, #f0f8e8 0%, #fff5e6 50%, #e8f4fd 100%)'
    };

    switch (theme) {
      case "morning":
        return {
          ...baseStyle,
          background: 'linear-gradient(135deg, #e8f4fd 0%, #f0f8e8 50%, #fff8e1 100%)'
        };
      case "afternoon":
        return {
          ...baseStyle,
          background: 'linear-gradient(135deg, #e8f5e8 0%, #f0f8e8 50%, #e8f4fd 100%)'
        };
      case "evening":
        return {
          ...baseStyle,
          background: 'linear-gradient(135deg, #fce4ec 0%, #fff3e0 50%, #f3e5f5 100%)'
        };
      case "night":
        return {
          ...baseStyle,
          background: 'linear-gradient(135deg, #e8eaf6 0%, #f3e5f5 50%, #e0f2f1 100%)'
        };
      default:
        return baseStyle;
    }
  };

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
      {/* 마을 배경 요소들 - 임시로 제거됨 */}

      {/* 메인 콘텐츠 */}
      <div style={{ position: 'relative', zIndex: 10, background: 'transparent' }}>
      <RewardPoolPanel />

        {/* 온라인 주민 섹션 */}
        <div className="card" style={{ 
          background: 'rgba(232, 245, 232, 0.9)',
          border: '2px solid rgba(139, 195, 74, 0.3)',
          marginBottom: '24px',
          backdropFilter: 'blur(10px)'
        }}>
          <h2 style={{ 
            color: '#2E7D32', 
            marginBottom: '20px',
            fontFamily: 'Fredoka, sans-serif',
            textAlign: 'center'
          }}>
            👥 현재 온라인 주민들
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '16px' 
          }}>
            {onlineResidents.map((resident) => (
              <div key={resident.id} style={{
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '16px',
                borderRadius: '20px',
                border: '2px solid rgba(139, 195, 74, 0.3)',
                textAlign: 'center',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer'
              }}
>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>{resident.avatar}</div>
                <h3 style={{ 
                  color: '#2E7D32', 
                  margin: '0 0 4px 0', 
                  fontSize: '16px',
                  fontFamily: 'Fredoka, sans-serif'
                }}>
                  {resident.name}
                </h3>
                <p style={{ 
                  color: '#8bc34a', 
                  margin: '0 0 8px 0', 
                  fontSize: '12px',
                  fontFamily: 'Quicksand, sans-serif',
                  fontWeight: 'bold'
                }}>
                  {resident.level}
                </p>
                <p style={{ 
                  color: '#666', 
                  margin: '0', 
                  fontSize: '11px',
                  fontFamily: 'Nunito, sans-serif'
                }}>
                  {resident.activity}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 명예의 훈장 섹션 */}
        <div className="card" style={{ 
          background: 'rgba(255, 248, 225, 0.9)',
          border: '2px solid rgba(255, 183, 77, 0.3)',
          marginBottom: '24px',
          backdropFilter: 'blur(10px)'
        }}>
          <h2 className="animated-text" style={{ 
            color: '#2E7D32', 
            marginBottom: '20px',
            fontFamily: 'Fredoka, sans-serif',
            textAlign: 'center'
          }}>
            🏅 명예의 훈장
          </h2>
          
          {/* 훈장 등급 시스템 */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '16px',
            marginBottom: '24px'
          }}>
            {[
              { 
                id: 1, 
                name: "신입 주민", 
                icon: "🌱", 
                description: "마을에 새로 입주한 주민",
                requirement: "가입 완료",
                color: "#8BC34A"
              },
              { 
                id: 2, 
                name: "활발한 주민", 
                icon: "🎵", 
                description: "음악을 업로드한 주민",
                requirement: "음악 1곡 업로드",
                color: "#2196F3"
              },
              { 
                id: 3, 
                name: "인기 주민", 
                icon: "⭐", 
                description: "많은 응원을 받은 주민",
                requirement: "응원 100개 이상",
                color: "#FF9800"
              },
              { 
                id: 4, 
                name: "명예 시민", 
                icon: "👑", 
                description: "마을 발전에 기여한 주민",
                requirement: "특별한 기여",
                color: "#9C27B0"
              }
            ].map((badge) => (
              <div key={badge.id} style={{
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '20px',
                borderRadius: '20px',
                border: `2px solid ${badge.color}40`,
                textAlign: 'center',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
>
                <div className="animated-icon" style={{ fontSize: '48px', marginBottom: '12px' }}>
                  {badge.icon}
                </div>
                <h3 style={{ 
                  color: badge.color,
                  margin: '0 0 8px 0',
                  fontFamily: 'Fredoka, sans-serif',
                  fontSize: '18px'
                }}>
                  {badge.name}
                </h3>
                <p style={{ 
                  color: '#666', 
                  margin: '0 0 8px 0',
                  fontSize: '14px',
                  fontFamily: 'Nunito, sans-serif'
                }}>
                  {badge.description}
                </p>
                <div style={{ 
                  background: `${badge.color}20`,
                  color: badge.color,
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontFamily: 'Quicksand, sans-serif',
                  fontWeight: 'bold'
                }}>
                  {badge.requirement}
                </div>
              </div>
            ))}
          </div>

          {/* 나의 훈장 현황 */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '20px',
            borderRadius: '20px',
            border: '2px solid rgba(139, 195, 74, 0.3)',
            textAlign: 'center'
          }}>
            <h3 style={{ 
              color: '#2E7D32', 
              marginBottom: '16px',
              fontFamily: 'Fredoka, sans-serif'
            }}>
              🏆 나의 훈장 현황
            </h3>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '16px',
              flexWrap: 'wrap'
            }}>
              {[
                { icon: "🌱", name: "신입 주민", earned: true },
                { icon: "🎵", name: "활발한 주민", earned: false },
                { icon: "⭐", name: "인기 주민", earned: false },
                { icon: "👑", name: "명예 시민", earned: false }
              ].map((badge, index) => (
                <div key={index} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '12px',
                  borderRadius: '15px',
                  background: badge.earned ? 'rgba(139, 195, 74, 0.2)' : 'rgba(200, 200, 200, 0.2)',
                  border: `2px solid ${badge.earned ? 'rgba(139, 195, 74, 0.5)' : 'rgba(200, 200, 200, 0.5)'}`,
                  opacity: badge.earned ? 1 : 0.5,
                  minWidth: '80px'
                }}>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>
                    {badge.icon}
                  </div>
                  <div style={{ 
                    fontSize: '12px',
                    fontFamily: 'Quicksand, sans-serif',
                    fontWeight: 'bold',
                    color: badge.earned ? '#2E7D32' : '#999',
                    textAlign: 'center'
                  }}>
                    {badge.name}
                  </div>
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
        </div>

        {/* 마을 건물들 */}
        <div className="card" style={{ 
          background: 'rgba(255, 248, 225, 0.9)',
          border: '2px solid rgba(255, 183, 77, 0.3)',
          marginBottom: '24px',
          backdropFilter: 'blur(10px)'
        }}>
          <h2 style={{ 
            color: '#2E7D32', 
            marginBottom: '20px',
            fontFamily: 'Fredoka, sans-serif',
            textAlign: 'center'
          }}>
            🏘️ 마을 건물들
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '20px' 
          }}>
            <Link to="/upload" style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '24px',
                borderRadius: '20px',
                border: '2px solid rgba(255, 183, 77, 0.3)',
                textAlign: 'center',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer'
              }}
>
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>🎵</div>
                <h3 style={{ 
                  color: '#2E7D32', 
                  margin: '0 0 8px 0',
                  fontFamily: 'Fredoka, sans-serif'
                }}>
                  음악실
                </h3>
                <p style={{ 
                  color: '#666', 
                  margin: '0',
                  fontSize: '14px',
                  fontFamily: 'Nunito, sans-serif'
                }}>
                  여러분의 감정을 음악으로 표현해보세요
                </p>
              </div>
            </Link>
            
            <Link to="/ranking" style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '24px',
                borderRadius: '20px',
                border: '2px solid rgba(255, 183, 77, 0.3)',
                textAlign: 'center',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer'
              }}
>
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>🏆</div>
                <h3 style={{ 
                  color: '#2E7D32', 
                  margin: '0 0 8px 0',
                  fontFamily: 'Fredoka, sans-serif'
                }}>
                  축제장
                </h3>
                <p style={{ 
                  color: '#666', 
                  margin: '0',
                  fontSize: '14px',
                  fontFamily: 'Nunito, sans-serif'
                }}>
                  마을 축제와 인기 작품을 확인하세요
                </p>
              </div>
            </Link>
            
            <Link to="/guide" style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '24px',
                borderRadius: '20px',
                border: '2px solid rgba(255, 183, 77, 0.3)',
                textAlign: 'center',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer'
              }}
>
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>🏛️</div>
                <h3 style={{ 
                  color: '#2E7D32', 
                  margin: '0 0 8px 0',
                  fontFamily: 'Fredoka, sans-serif'
                }}>
                  시청
                </h3>
                <p style={{ 
                  color: '#666', 
                  margin: '0',
                  fontSize: '14px',
                  fontFamily: 'Nunito, sans-serif'
                }}>
                  마을 가이드와 공지사항을 확인하세요
                </p>
              </div>
            </Link>
            
            <Link to="/collection" style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '24px',
                borderRadius: '20px',
                border: '2px solid rgba(255, 183, 77, 0.3)',
                textAlign: 'center',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer'
              }}
>
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>🏠</div>
                <h3 style={{ 
                  color: '#2E7D32', 
                  margin: '0 0 8px 0',
                  fontFamily: 'Fredoka, sans-serif'
                }}>
                  내 집
                </h3>
                <p style={{ 
                  color: '#666', 
                  margin: '0',
                  fontSize: '14px',
                  fontFamily: 'Nunito, sans-serif'
                }}>
                  나의 작품과 훈장을 관리하세요
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* 아티스트별 전용 마을 */}
        <div className="card" style={{ 
          background: 'rgba(227, 242, 253, 0.9)',
          border: '2px solid rgba(33, 150, 243, 0.3)',
          marginBottom: '24px',
          backdropFilter: 'blur(10px)'
        }}>
          <h2 className="animated-text" style={{ 
            color: '#2E7D32', 
            marginBottom: '20px',
            fontFamily: 'Fredoka, sans-serif',
            textAlign: 'center'
          }}>
            🎨 아티스트별 전용 마을
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '20px'
          }}>
            {[
              {
                id: 1,
                name: "음악 마을",
                icon: "🎵",
                description: "음악 창작자들을 위한 특별한 공간",
                features: ["음악 스튜디오", "콜라보 공간", "음악 도구 상점"],
                color: "#2196F3",
                residents: 45,
                status: "활발"
              },
              {
                id: 2,
                name: "아트 마을",
                icon: "🎨",
                description: "시각 예술가들의 창작 공간",
                features: ["갤러리", "작업실", "전시장"],
                color: "#E91E63",
                residents: 32,
                status: "성장"
              },
              {
                id: 3,
                name: "댄스 마을",
                icon: "💃",
                description: "댄서들의 리듬과 움직임의 공간",
                features: ["댄스 스튜디오", "공연장", "의상실"],
                color: "#FF9800",
                residents: 28,
                status: "신규"
              },
              {
                id: 4,
                name: "코미디 마을",
                icon: "🎭",
                description: "유머와 웃음이 가득한 공간",
                features: ["코미디 클럽", "연습실", "관객석"],
                color: "#9C27B0",
                residents: 19,
                status: "소규모"
              }
            ].map((village) => (
              <div key={village.id} style={{
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '24px',
                borderRadius: '20px',
                border: `2px solid ${village.color}40`,
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
>
                {/* 마을 상태 배지 */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: village.status === '활발' ? '#4CAF50' : 
                            village.status === '성장' ? '#2196F3' :
                            village.status === '신규' ? '#FF9800' : '#9E9E9E',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '10px',
                  fontFamily: 'Quicksand, sans-serif',
                  fontWeight: 'bold'
                }}>
                  {village.status}
                </div>

                <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                  <div className="animated-icon" style={{ fontSize: '48px', marginBottom: '12px' }}>
                    {village.icon}
                  </div>
                  <h3 style={{ 
                    color: village.color,
                    margin: '0 0 8px 0',
                    fontFamily: 'Fredoka, sans-serif',
                    fontSize: '20px'
                  }}>
                    {village.name}
                  </h3>
                  <p style={{ 
                    color: '#666', 
                    margin: '0 0 16px 0',
                    fontSize: '14px',
                    fontFamily: 'Nunito, sans-serif',
                    lineHeight: '1.4'
                  }}>
                    {village.description}
                  </p>
                </div>

                {/* 마을 정보 */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '12px'
                  }}>
                    <span style={{ 
                      fontSize: '14px',
                      fontFamily: 'Quicksand, sans-serif',
                      color: '#666'
                    }}>
                      주민 수
                    </span>
                    <span style={{ 
                      fontSize: '16px',
                      fontFamily: 'Fredoka, sans-serif',
                      color: village.color,
                      fontWeight: 'bold'
                    }}>
                      {village.residents}명
                    </span>
                  </div>
                </div>

                {/* 마을 시설 */}
                <div>
                  <h4 style={{ 
                    color: '#2E7D32',
                    margin: '0 0 8px 0',
                    fontSize: '14px',
                    fontFamily: 'Quicksand, sans-serif',
                    fontWeight: 'bold'
                  }}>
                    주요 시설
                  </h4>
                  <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: '6px'
                  }}>
                    {village.features.map((feature, index) => (
                      <span key={index} style={{
                        background: `${village.color}20`,
                        color: village.color,
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontFamily: 'Quicksand, sans-serif',
                        fontWeight: 'bold'
                      }}>
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 입장 버튼 */}
                <div style={{ 
                  textAlign: 'center', 
                  marginTop: '16px'
                }}>
                  <button style={{
                    background: `linear-gradient(135deg, ${village.color} 0%, ${village.color}CC 100%)`,
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontFamily: 'Quicksand, sans-serif',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
>
                    마을 입장하기 →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 마을 활동 */}
        <div className="card" style={{ 
          background: 'rgba(227, 242, 253, 0.9)',
          border: '2px solid rgba(33, 150, 243, 0.3)',
          marginBottom: '24px',
          backdropFilter: 'blur(10px)'
        }}>
          <h2 style={{ 
            color: '#2E7D32', 
            marginBottom: '20px',
            fontFamily: 'Fredoka, sans-serif',
            textAlign: 'center'
          }}>
            🎯 마을 활동
          </h2>
          
          {/* 일일 퀘스트 */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ 
              color: '#1976d2', 
              marginBottom: '16px',
              fontFamily: 'Fredoka, sans-serif',
              textAlign: 'center'
            }}>
              📋 일일 퀘스트
            </h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
              gap: '16px' 
            }}>
              {dailyQuests.map((quest) => (
                <div key={quest.id} style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  padding: '16px',
                  borderRadius: '15px',
                  border: quest.completed ? '2px solid #4caf50' : '2px solid rgba(33, 150, 243, 0.3)',
                  position: 'relative'
                }}>
                  {quest.completed && (
                    <div style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      fontSize: '20px'
                    }}>✅</div>
                  )}
                  <h4 style={{ 
                    color: '#2E7D32', 
                    margin: '0 0 8px 0',
                    fontFamily: 'Fredoka, sans-serif'
                  }}>
                    {quest.title}
                  </h4>
                  <p style={{ 
                    color: '#666', 
                    margin: '0 0 12px 0',
                    fontSize: '14px',
                    fontFamily: 'Nunito, sans-serif'
                  }}>
                    {quest.description}
                  </p>
                  <div style={{ 
                    color: '#ff9800',
                    fontSize: '12px',
                    fontFamily: 'Quicksand, sans-serif',
                    fontWeight: 'bold'
                  }}>
                    보상: {quest.reward}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 마을 이벤트 */}
          <div>
            <h3 style={{ 
              color: '#1976d2', 
              marginBottom: '16px',
              fontFamily: 'Fredoka, sans-serif',
              textAlign: 'center'
            }}>
              🎉 마을 이벤트
            </h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '16px' 
            }}>
              {villageEvents.map((event) => (
                <div key={event.id} style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  padding: '16px',
                  borderRadius: '15px',
                  border: '2px solid rgba(33, 150, 243, 0.3)',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>
                    {event.type === 'seasonal' ? '🌸' : event.type === 'weekly' ? '📅' : '🎊'}
                  </div>
                  <h4 style={{ 
                    color: '#2E7D32', 
                    margin: '0 0 8px 0',
                    fontFamily: 'Fredoka, sans-serif'
                  }}>
                    {event.title}
                  </h4>
                  <p style={{ 
                    color: '#666', 
                    margin: '0 0 8px 0',
                    fontSize: '13px',
                    fontFamily: 'Nunito, sans-serif'
                  }}>
                    {event.description}
                  </p>
                  <div style={{ 
                    color: '#1976d2',
                    fontSize: '11px',
                    fontFamily: 'Quicksand, sans-serif',
                    fontWeight: 'bold'
                  }}>
                    📅 {event.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 마을 소식 */}
        <div className="card" style={{ 
          background: 'rgba(232, 245, 232, 0.9)',
          border: '2px solid rgba(139, 195, 74, 0.3)',
          marginBottom: '24px',
          backdropFilter: 'blur(10px)'
        }}>
          <h2 style={{ 
            color: '#2E7D32', 
            marginBottom: '20px',
            fontFamily: 'Fredoka, sans-serif',
            textAlign: 'center'
          }}>
            📰 마을 소식
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '16px' 
          }}>
            {villageNews.map((news) => (
              <div key={news.id} style={{
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '20px',
                borderRadius: '15px',
                border: '2px solid rgba(233, 30, 99, 0.3)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer'
              }}
>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  marginBottom: '12px' 
                }}>
                  <div style={{ fontSize: '24px', marginRight: '8px' }}>
                    {news.type === 'update' ? '🆕' : 
                     news.type === 'popular' ? '🔥' : 
                     news.type === 'welcome' ? '🎉' : '🎊'}
                  </div>
                  <div style={{ 
                    color: '#e91e63',
                    fontSize: '11px',
                    fontFamily: 'Quicksand, sans-serif',
                    fontWeight: 'bold',
                    background: 'rgba(233, 30, 99, 0.1)',
                    padding: '2px 8px',
                    borderRadius: '10px'
                  }}>
                    {news.type === 'update' ? '업데이트' : 
                     news.type === 'popular' ? '인기' : 
                     news.type === 'welcome' ? '환영' : '이벤트'}
                  </div>
                </div>
                <h4 style={{ 
                  color: '#2E7D32', 
                  margin: '0 0 8px 0',
                  fontFamily: 'Fredoka, sans-serif',
                  fontSize: '16px'
                }}>
                  {news.title}
                </h4>
                <p style={{ 
                  color: '#666', 
                  margin: '0 0 12px 0',
                  fontSize: '14px',
                  fontFamily: 'Nunito, sans-serif',
                  lineHeight: '1.5'
                }}>
                  {news.content}
                </p>
                <div style={{ 
                  color: '#999',
                  fontSize: '11px',
                  fontFamily: 'Quicksand, sans-serif'
                }}>
                  📅 {news.date}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 실시간 이벤트 알림 */}
        <div className="card" style={{ 
          background: 'rgba(252, 228, 236, 0.9)',
          border: '2px solid rgba(233, 30, 99, 0.3)',
          marginBottom: '24px',
          backdropFilter: 'blur(10px)'
        }}>
          <h2 className="animated-text" style={{ 
            color: '#2E7D32', 
            marginBottom: '20px',
            fontFamily: 'Fredoka, sans-serif',
            textAlign: 'center'
          }}>
            🎊 실시간 이벤트 알림
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '16px'
          }}>
            {[
              {
                id: 1,
                title: "🎵 음악 창작 대회",
                description: "이번 주 최고의 창작물을 뽑아보세요! 상금 5 ETH",
                time: "2일 남음",
                status: "진행중",
                participants: 45,
                color: "#2196F3"
              },
              {
                id: 2,
                title: "🎵 음악실 공연",
                description: "ArtMaster님의 신작 전시회가 열렸습니다",
                time: "1시간 전",
                status: "진행중",
                participants: 23,
                color: "#E91E63"
              },
              {
                id: 3,
                title: "💃 댄스 배틀",
                description: "최고의 댄서를 찾아라! 실시간 투표 진행",
                time: "30분 후",
                status: "예정",
                participants: 12,
                color: "#FF9800"
              },
              {
                id: 4,
                title: "🎭 코미디 쇼",
                description: "ComedyKing님의 스탠드업 코미디 쇼",
                time: "1일 후",
                status: "예정",
                participants: 8,
                color: "#9C27B0"
              }
            ].map((event) => (
              <div key={event.id} style={{
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '20px',
                borderRadius: '20px',
                border: `2px solid ${event.color}40`,
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
>
                {/* 이벤트 상태 배지 */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: event.status === '진행중' ? '#4CAF50' : 
                            event.status === '예정' ? '#FF9800' : '#9E9E9E',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '10px',
                  fontFamily: 'Quicksand, sans-serif',
                  fontWeight: 'bold'
                }}>
                  {event.status}
                </div>

                <h3 style={{ 
                  color: event.color,
                  margin: '0 0 8px 0',
                  fontFamily: 'Fredoka, sans-serif',
                  fontSize: '16px',
                  lineHeight: '1.3'
                }}>
                  {event.title}
                </h3>
                
                <p style={{ 
                  color: '#666', 
                  margin: '0 0 12px 0',
                  fontSize: '14px',
                  fontFamily: 'Nunito, sans-serif',
                  lineHeight: '1.4'
                }}>
                  {event.description}
                </p>

                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '12px'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '4px'
                  }}>
                    <span style={{ 
                      fontSize: '12px',
                      fontFamily: 'Quicksand, sans-serif',
                      color: '#666'
                    }}>
                      ⏰
                    </span>
                    <span style={{ 
                      fontSize: '12px',
                      fontFamily: 'Quicksand, sans-serif',
                      color: '#666'
                    }}>
                      {event.time}
                    </span>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '4px'
                  }}>
                    <span style={{ 
                      fontSize: '12px',
                      fontFamily: 'Quicksand, sans-serif',
                      color: '#666'
                    }}>
                      👥
                    </span>
                    <span style={{ 
                      fontSize: '12px',
                      fontFamily: 'Quicksand, sans-serif',
                      color: '#666'
                    }}>
                      {event.participants}명
                    </span>
                  </div>
                </div>

                {/* 참여 버튼 */}
                <div style={{ 
                  textAlign: 'center'
                }}>
                  <button style={{
                    background: `linear-gradient(135deg, ${event.color} 0%, ${event.color}CC 100%)`,
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontFamily: 'Quicksand, sans-serif',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    width: '100%'
                  }}
>
                    {event.status === '진행중' ? '참여하기' : '알림 설정'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      {/* 마을 소개 섹션 */}
      <div className="card" style={{ 
        background: 'rgba(232, 245, 232, 0.9)',
        border: '3px solid rgba(139, 195, 74, 0.3)',
        boxShadow: '0 8px 32px rgba(139, 195, 74, 0.2)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
          <h1 style={{ 
            color: '#2E7D32', 
            marginBottom: '16px', 
            fontSize: '2.5rem',
            fontFamily: 'Fredoka, sans-serif',
            textShadow: '2px 2px 0px #4CAF50'
          }}>
            🏡 EmotionWave Village 🏡
          </h1>
          <p style={{ 
            color: '#2E7D32', 
            fontSize: '20px', 
            marginBottom: '24px', 
            maxWidth: '700px', 
            margin: '0 auto 24px auto',
            fontFamily: 'Nunito, sans-serif',
            lineHeight: '1.6'
          }}>
            환영합니다! 🎉 EmotionWave Village는 K-POP 팬들이 모여 음악과 감정을 나누는 특별한 마을입니다.
          </p>
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.8)', 
            padding: '20px', 
            borderRadius: '20px', 
            marginBottom: '32px',
            border: '2px solid rgba(139, 195, 74, 0.3)'
          }}>
            <h3 style={{ 
              color: '#2E7D32', 
              marginBottom: '16px',
              fontFamily: 'Fredoka, sans-serif'
            }}>
              🌟 마을의 특별함
            </h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '16px',
              textAlign: 'left'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '24px' }}>🎵</span>
                <div>
                  <strong style={{ color: '#2E7D32' }}>음악 창작</strong>
                  <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#666' }}>
                    여러분의 감정을 음악으로 표현해보세요
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '24px' }}>🏆</span>
                <div>
                  <strong style={{ color: '#2E7D32' }}>마을 축제</strong>
                  <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#666' }}>
                    다른 주민들과 함께 축제에 참여하세요
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '24px' }}>🏅</span>
                <div>
                  <strong style={{ color: '#2E7D32' }}>명예의 훈장</strong>
                  <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#666' }}>
                    특별한 활동으로 훈장을 획득하세요
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '24px' }}>💰</span>
                <div>
                  <strong style={{ color: '#2E7D32' }}>공동 금고</strong>
                  <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#666' }}>
                    마을 발전에 기여하고 보상을 받으세요
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link className="btn btn-primary" to="/upload" style={{ fontSize: '18px', padding: '12px 24px' }}>
              🎵 음악 올리기
            </Link>
            <Link className="btn btn-secondary" to="/ranking" style={{ fontSize: '18px', padding: '12px 24px' }}>
              🏆 마을 축제 보기
            </Link>
          </div>
        </div>
      </div>

      {/* 마을 현황 섹션 */}
      <div className="card stats-section" style={{ 
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)'
      }}>
        <h2 style={{ 
          textAlign: 'center', 
          color: '#2E7D32', 
          marginBottom: '24px',
          fontFamily: 'Fredoka, sans-serif'
        }}>
          📊 마을 현황
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', textAlign: 'center' }}>
          <div style={{ 
            padding: '20px', 
            background: 'linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%)', 
            borderRadius: '20px',
            border: '2px solid rgba(255, 183, 77, 0.3)',
            boxShadow: '0 4px 16px rgba(255, 183, 77, 0.2)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🎵</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2E7D32' }}>1,247</div>
            <div style={{ color: '#666', fontFamily: 'Quicksand, sans-serif' }}>마을 음악 작품</div>
          </div>
          <div style={{ 
            padding: '20px', 
            background: 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)', 
            borderRadius: '20px',
            border: '2px solid rgba(139, 195, 74, 0.3)',
            boxShadow: '0 4px 16px rgba(139, 195, 74, 0.2)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>👥</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2E7D32' }}>892</div>
            <div style={{ color: '#666', fontFamily: 'Quicksand, sans-serif' }}>마을 주민</div>
          </div>
          <div style={{ 
            padding: '20px', 
            background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)', 
            borderRadius: '20px',
            border: '2px solid rgba(33, 150, 243, 0.3)',
            boxShadow: '0 4px 16px rgba(33, 150, 243, 0.2)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>💰</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2E7D32' }}>45.2 ETH</div>
            <div style={{ color: '#666', fontFamily: 'Quicksand, sans-serif' }}>공동 금고</div>
          </div>
          <div style={{ 
            padding: '20px', 
            background: 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)', 
            borderRadius: '20px',
            border: '2px solid rgba(139, 195, 74, 0.3)',
            boxShadow: '0 4px 16px rgba(139, 195, 74, 0.2)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🏅</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2E7D32' }}>156</div>
            <div style={{ color: '#666', fontFamily: 'Quicksand, sans-serif' }}>명예의 훈장</div>
          </div>
        </div>
      </div>

      {/* 마을 인기 작품 섹션 */}
      <div className="card" style={{ 
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <h2 style={{ 
            color: '#2E7D32', 
            margin: 0,
            fontFamily: 'Fredoka, sans-serif'
          }}>
            🌟 마을 인기 작품
          </h2>
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
              <option value="cheers">축제 참여순</option>
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
>
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
                    🎫 {content.cheers.toLocaleString()}
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
            🏆 마을 축제에서 더 보기 →
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Home;  
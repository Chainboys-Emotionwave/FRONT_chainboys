import { useState } from "react";
import { Link } from "react-router-dom";

function Festival() {
  const [selectedFestival, setSelectedFestival] = useState(null);

  // 축제 데이터
  const festivals = [
    {
      id: "billboard-challenge",
      title: "🎵 빌보드 HOT100 커버 1등을 뽑아라!",
      description: "세계적인 빌보드 HOT100 차트의 인기곡들을 커버해보세요! 최고의 커버를 뽑아 상금을 획득하세요.",
      startDate: "2025-01-01",
      endDate: "2025-01-31",
      participants: 156,
      prize: "5.0 ETH",
      status: "진행중",
      category: "음악",
      thumbnail: "🎵"
    },
    {
      id: "dance-challenge",
      title: "💃 방구석 스우파 챌린지!",
      description: "집에서도 할 수 있는 댄스 챌린지! 스우파 스타일의 댄스를 선보이고 상금을 획득하세요.",
      startDate: "2025-01-15",
      endDate: "2025-02-15",
      participants: 89,
      prize: "3.0 ETH",
      status: "진행중",
      category: "댄스",
      thumbnail: "💃"
    }
  ];

  // 축제별 참여 콘텐츠 데이터
  const festivalContents = {
    "billboard-challenge": [
      {
        id: "bc1",
        title: "BTS Dynamite 커버",
        creator: "ARMY_cover",
        creatorProfile: "🎵",
        category: "K-POP",
        uploadDate: "2025-01-15",
        cheers: 234,
        thumbnail: "🎤"
      },
      {
        id: "bc2",
        title: "Taylor Swift Anti-Hero 커버",
        creator: "Swiftie_music",
        creatorProfile: "🎸",
        category: "Pop",
        uploadDate: "2025-01-14",
        cheers: 189,
        thumbnail: "🎵"
      },
      {
        id: "bc3",
        title: "The Weeknd Blinding Lights",
        creator: "Weeknd_fan",
        creatorProfile: "🎧",
        category: "R&B",
        uploadDate: "2025-01-13",
        cheers: 156,
        thumbnail: "🎶"
      },
      {
        id: "bc4",
        title: "Olivia Rodrigo Drivers License",
        creator: "Olivia_lover",
        creatorProfile: "🎹",
        category: "Pop",
        uploadDate: "2025-01-12",
        cheers: 167,
        thumbnail: "🎤"
      },
      {
        id: "bc5",
        title: "Ed Sheeran Shape of You",
        creator: "Ed_fan",
        creatorProfile: "🎸",
        category: "Pop",
        uploadDate: "2025-01-11",
        cheers: 145,
        thumbnail: "🎵"
      },
      {
        id: "bc6",
        title: "Billie Eilish Bad Guy",
        creator: "Billie_fan",
        creatorProfile: "🎧",
        category: "Alternative",
        uploadDate: "2025-01-10",
        cheers: 178,
        thumbnail: "🎶"
      }
    ],
    "dance-challenge": [
      {
        id: "dc1",
        title: "스우파 스타일 댄스 커버",
        creator: "Dance_queen",
        creatorProfile: "💃",
        category: "댄스",
        uploadDate: "2025-01-15",
        cheers: 198,
        thumbnail: "💃"
      },
      {
        id: "dc2",
        title: "방구석 댄스 챌린지",
        creator: "Home_dancer",
        creatorProfile: "🕺",
        category: "댄스",
        uploadDate: "2025-01-14",
        cheers: 134,
        thumbnail: "🎭"
      },
      {
        id: "dc3",
        title: "K-POP 댄스 커버",
        creator: "Kpop_dancer",
        creatorProfile: "🎵",
        category: "댄스",
        uploadDate: "2025-01-13",
        cheers: 167,
        thumbnail: "💃"
      },
      {
        id: "dc4",
        title: "힙합 댄스 배틀",
        creator: "Hiphop_king",
        creatorProfile: "🎤",
        category: "댄스",
        uploadDate: "2025-01-12",
        cheers: 223,
        thumbnail: "🕺"
      },
      {
        id: "dc5",
        title: "컨템포러리 댄스",
        creator: "Modern_dancer",
        creatorProfile: "🎭",
        category: "댄스",
        uploadDate: "2025-01-11",
        cheers: 145,
        thumbnail: "💃"
      },
      {
        id: "dc6",
        title: "스트릿 댄스 쇼케이스",
        creator: "Street_dancer",
        creatorProfile: "🕺",
        category: "댄스",
        uploadDate: "2025-01-10",
        cheers: 189,
        thumbnail: "🎭"
      }
    ]
  };

  const handleFestivalClick = (festival) => {
    setSelectedFestival(festival);
  };

  const handleBackClick = () => {
    setSelectedFestival(null);
  };

  if (selectedFestival) {
    const contents = festivalContents[selectedFestival.id] || [];
    
    return (
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* 뒤로가기 버튼 */}
        <div style={{ marginBottom: '20px' }}>
          <button 
            onClick={handleBackClick}
            style={{
              background: '#4CAF50',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '20px',
              fontSize: '14px',
              fontFamily: 'Fredoka, sans-serif',
              cursor: 'pointer',
              boxShadow: '0 4px 8px rgba(76, 175, 80, 0.3)',
              transition: 'all 0.3s ease'
            }}
          >
            ← 축제 목록으로 돌아가기
          </button>
        </div>

        {/* 축제 정보 헤더 */}
        <div style={{
          background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
          padding: '30px',
          borderRadius: '20px',
          color: 'white',
          marginBottom: '30px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '15px' }}>
            {selectedFestival.thumbnail}
          </div>
          <h1 style={{ 
            fontFamily: 'Fredoka, sans-serif', 
            fontSize: '28px', 
            marginBottom: '10px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            {selectedFestival.title}
          </h1>
          <p style={{ 
            fontFamily: 'Nunito, sans-serif', 
            fontSize: '16px', 
            marginBottom: '20px',
            opacity: 0.9
          }}>
            {selectedFestival.description}
          </p>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '30px',
            flexWrap: 'wrap'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '14px', opacity: 0.8 }}>참여자</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{selectedFestival.participants}명</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '14px', opacity: 0.8 }}>상금</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{selectedFestival.prize}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '14px', opacity: 0.8 }}>상태</div>
              <div style={{ 
                fontSize: '16px', 
                fontWeight: 'bold',
                background: 'rgba(255,255,255,0.2)',
                padding: '4px 12px',
                borderRadius: '15px'
              }}>
                {selectedFestival.status}
              </div>
            </div>
          </div>
        </div>

        {/* 참여 콘텐츠 목록 */}
        <div>
          <h2 style={{ 
            fontFamily: 'Fredoka, sans-serif', 
            fontSize: '24px', 
            color: '#2E7D32',
            marginBottom: '20px'
          }}>
            참여 콘텐츠 ({contents.length}개)
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gap: '20px'
          }}>
            {contents.map((content) => (
              <div key={content.id} style={{
                background: 'white',
                border: '2px solid #e9ecef',
                borderRadius: '15px',
                padding: '20px',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
              >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                  <div style={{ 
                    fontSize: '32px', 
                    marginRight: '12px',
                    background: '#f8f9fa',
                    padding: '8px',
                    borderRadius: '50%',
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {content.thumbnail}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ 
                      fontFamily: 'Fredoka, sans-serif', 
                      fontSize: '16px', 
                      color: '#2E7D32',
                      marginBottom: '5px'
                    }}>
                      {content.title}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '20px' }}>{content.creatorProfile}</span>
                      <span style={{ 
                        fontFamily: 'Nunito, sans-serif', 
                        fontSize: '14px', 
                        color: '#666' 
                      }}>
                        {content.creator}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '10px'
                }}>
                  <span style={{ 
                    background: '#4CAF50', 
                    color: 'white', 
                    padding: '4px 8px', 
                    borderRadius: '10px', 
                    fontSize: '12px',
                    fontFamily: 'Quicksand, sans-serif',
                    fontWeight: 'bold'
                  }}>
                    {content.category}
                  </span>
                  <span style={{ 
                    fontFamily: 'Nunito, sans-serif', 
                    fontSize: '12px', 
                    color: '#999' 
                  }}>
                    {content.uploadDate}
                  </span>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '8px'
                }}>
                  <span style={{ 
                    fontSize: '14px', 
                    color: '#FF9800',
                    fontFamily: 'Quicksand, sans-serif',
                    fontWeight: 'bold'
                  }}>
                    🎫 {content.cheers} 응원
                  </span>
                  <Link 
                    to={`/content/${content.id}`}
                    style={{
                      background: 'linear-gradient(135deg, #4CAF50, #45a049)',
                      color: 'white',
                      textDecoration: 'none',
                      padding: '6px 12px',
                      borderRadius: '15px',
                      fontSize: '12px',
                      fontFamily: 'Fredoka, sans-serif',
                      fontWeight: 'bold',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    자세히 보기
                  </Link>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <Link 
                    to={`/creator/${content.creator}`}
                    style={{
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      color: 'white',
                      textDecoration: 'none',
                      padding: '6px 12px',
                      borderRadius: '15px',
                      fontSize: '12px',
                      fontFamily: 'Fredoka, sans-serif',
                      fontWeight: 'bold',
                      transition: 'all 0.3s ease',
                      display: 'inline-block'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-1px)';
                      e.target.style.boxShadow = '0 4px 8px rgba(102, 126, 234, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    👤 창작자 프로필 방문하기
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* 페이지 헤더 */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ 
          fontFamily: 'Fredoka, sans-serif', 
          fontSize: '36px', 
          color: '#2E7D32',
          marginBottom: '10px'
        }}>
          🎊 마을 축제
        </h1>
        <p style={{ 
          fontFamily: 'Nunito, sans-serif', 
          fontSize: '18px', 
          color: '#666' 
        }}>
          다양한 축제에 참여하고 상금을 획득하세요!
        </p>
      </div>

      {/* 축제 목록 */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', 
        gap: '30px' 
      }}>
        {festivals.map((festival) => (
          <div 
            key={festival.id}
            style={{
              background: 'white',
              border: '3px solid #e9ecef',
              borderRadius: '20px',
              padding: '30px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onClick={() => handleFestivalClick(festival)}
          >
            {/* 축제 썸네일 */}
            <div style={{ 
              fontSize: '64px', 
              textAlign: 'center', 
              marginBottom: '20px' 
            }}>
              {festival.thumbnail}
            </div>

            {/* 축제 제목 */}
            <h2 style={{ 
              fontFamily: 'Fredoka, sans-serif', 
              fontSize: '24px', 
              color: '#2E7D32',
              marginBottom: '15px',
              textAlign: 'center'
            }}>
              {festival.title}
            </h2>

            {/* 축제 설명 */}
            <p style={{ 
              fontFamily: 'Nunito, sans-serif', 
              fontSize: '16px', 
              color: '#666',
              marginBottom: '25px',
              lineHeight: '1.6',
              textAlign: 'center'
            }}>
              {festival.description}
            </p>

            {/* 축제 정보 */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)', 
              gap: '15px',
              marginBottom: '25px'
            }}>
              <div style={{ 
                background: '#f8f9fa', 
                padding: '15px', 
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>참여자</div>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#2E7D32' }}>
                  {festival.participants}명
                </div>
              </div>
              <div style={{ 
                background: '#f8f9fa', 
                padding: '15px', 
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>상금</div>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#FF9800' }}>
                  {festival.prize}
                </div>
              </div>
            </div>

            {/* 축제 상태 및 기간 */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <span style={{ 
                background: festival.status === '진행중' ? '#4CAF50' : '#FF9800',
                color: 'white',
                padding: '6px 12px',
                borderRadius: '15px',
                fontSize: '12px',
                fontFamily: 'Quicksand, sans-serif',
                fontWeight: 'bold'
              }}>
                {festival.status}
              </span>
              <span style={{ 
                fontFamily: 'Nunito, sans-serif', 
                fontSize: '12px', 
                color: '#999' 
              }}>
                {festival.startDate} ~ {festival.endDate}
              </span>
            </div>

            {/* 참여하기 버튼 */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                background: 'linear-gradient(135deg, #4CAF50, #45a049)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '25px',
                fontSize: '16px',
                fontFamily: 'Fredoka, sans-serif',
                fontWeight: 'bold',
                display: 'inline-block',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(76, 175, 80, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(76, 175, 80, 0.3)';
              }}>
                축제 참여하기 →
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Festival;

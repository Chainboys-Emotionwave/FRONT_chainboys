import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // 검색 데이터 (실제로는 API에서 가져올 데이터)
  const searchData = {
    creators: [
      { id: "c1", name: "ARMY_cover", profile: "🎵", followers: 1234, category: "K-POP" },
      { id: "c2", name: "IU_lover", profile: "🎤", followers: 987, category: "Ballad" },
      { id: "c3", name: "Bunnies_mix", profile: "🐰", followers: 756, category: "K-POP" },
      { id: "c4", name: "FEARNOT_music", profile: "🎧", followers: 654, category: "K-POP" },
      { id: "c5", name: "MIDZY_remix", profile: "⚡", followers: 543, category: "K-POP" },
      { id: "c6", name: "MY_vocal", profile: "🤖", followers: 432, category: "Experimental" },
      { id: "c7", name: "ONCE_singer", profile: "🎵", followers: 321, category: "K-POP" },
      { id: "c8", name: "BLINK_dj", profile: "🎧", followers: 876, category: "K-POP" },
      { id: "c9", name: "Reveluv_cover", profile: "🎤", followers: 234, category: "K-POP" },
      { id: "c10", name: "STAY_producer", profile: "🎹", followers: 567, category: "K-POP" },
      { id: "c11", name: "Dance_queen", profile: "💃", followers: 345, category: "Dance" },
      { id: "c12", name: "Home_dancer", profile: "🕺", followers: 123, category: "Dance" },
      { id: "c13", name: "Kpop_dancer", profile: "🎵", followers: 456, category: "Dance" },
      { id: "c14", name: "Hiphop_king", profile: "🎤", followers: 789, category: "Hip-Hop" },
      { id: "c15", name: "Modern_dancer", profile: "🎭", followers: 234, category: "Dance" }
    ],
    contents: [
      { id: "ct1", title: "BTS Dynamite 커버", creator: "ARMY_cover", category: "K-POP", cheers: 234, uploadDate: "2025-01-15" },
      { id: "ct2", title: "아이유 팔레트 리메이크", creator: "IU_lover", category: "Ballad", cheers: 189, uploadDate: "2025-01-14" },
      { id: "ct3", title: "NewJeans OMG 믹스", creator: "Bunnies_mix", category: "K-POP", cheers: 156, uploadDate: "2025-01-13" },
      { id: "ct4", title: "LE SSERAFIM UNFORGIVEN", creator: "FEARNOT_music", category: "K-POP", cheers: 167, uploadDate: "2025-01-12" },
      { id: "ct5", title: "ITZY SNEAKERS 리믹스", creator: "MIDZY_remix", category: "K-POP", cheers: 145, uploadDate: "2025-01-11" },
      { id: "ct6", title: "aespa Girls 아카펠라", creator: "MY_vocal", category: "Experimental", cheers: 178, uploadDate: "2025-01-10" },
      { id: "ct7", title: "TWICE Talk that Talk 커버", creator: "ONCE_singer", category: "K-POP", cheers: 201, uploadDate: "2025-01-09" },
      { id: "ct8", title: "BLACKPINK Shut Down 믹스", creator: "BLINK_dj", category: "K-POP", cheers: 223, uploadDate: "2025-01-08" },
      { id: "ct9", title: "Red Velvet Feel My Rhythm", creator: "Reveluv_cover", category: "K-POP", cheers: 134, uploadDate: "2025-01-07" },
      { id: "ct10", title: "Stray Kids Thunderous 리메이크", creator: "STAY_producer", category: "K-POP", cheers: 189, uploadDate: "2025-01-06" },
      { id: "ct11", title: "스우파 스타일 댄스 커버", creator: "Dance_queen", category: "Dance", cheers: 198, uploadDate: "2025-01-15" },
      { id: "ct12", title: "방구석 댄스 챌린지", creator: "Home_dancer", category: "Dance", cheers: 134, uploadDate: "2025-01-14" },
      { id: "ct13", title: "K-POP 댄스 커버", creator: "Kpop_dancer", category: "Dance", cheers: 167, uploadDate: "2025-01-13" },
      { id: "ct14", title: "힙합 댄스 배틀", creator: "Hiphop_king", category: "Hip-Hop", cheers: 223, uploadDate: "2025-01-12" },
      { id: "ct15", title: "컨템포러리 댄스", creator: "Modern_dancer", category: "Dance", cheers: 145, uploadDate: "2025-01-11" },
      { id: "ct16", title: "BTS 아미 아트워크", creator: "ARMY_artist", category: "Art", cheers: 145, uploadDate: "2025-01-15" },
      { id: "ct17", title: "아이유 팬아트 컬렉션", creator: "IU_art", category: "Art", cheers: 123, uploadDate: "2025-01-14" },
      { id: "ct18", title: "NewJeans 캐릭터 디자인", creator: "Bunnies_design", category: "Art", cheers: 98, uploadDate: "2025-01-13" },
      { id: "ct19", title: "K-POP 아이돌 일러스트", creator: "Kpop_illustrator", category: "Art", cheers: 187, uploadDate: "2025-01-12" },
      { id: "ct20", title: "BTS 코미디 스케치", creator: "ARMY_comedy", category: "Comedy", cheers: 156, uploadDate: "2025-01-15" }
    ]
  };

  // 검색 실행 함수
  const performSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    // 실제 검색 로직 (여기서는 간단한 문자열 매칭)
    const lowerQuery = query.toLowerCase();
    
    const creatorResults = searchData.creators.filter(creator => 
      creator.name.toLowerCase().includes(lowerQuery) ||
      creator.category.toLowerCase().includes(lowerQuery)
    ).map(creator => ({ ...creator, type: 'creator' }));

    const contentResults = searchData.contents.filter(content => 
      content.title.toLowerCase().includes(lowerQuery) ||
      content.creator.toLowerCase().includes(lowerQuery) ||
      content.category.toLowerCase().includes(lowerQuery)
    ).map(content => ({ ...content, type: 'content' }));

    const allResults = [...creatorResults, ...contentResults];
    setSearchResults(allResults);
    setIsSearching(false);
  };

  // 검색어 변경 핸들러
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setSearchParams({ q: query });
    performSearch(query);
  };

  // 컴포넌트 마운트 시 URL 파라미터로 검색 실행
  useEffect(() => {
    if (searchQuery) {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      
      // 실제 검색 로직 (여기서는 간단한 문자열 매칭)
      const lowerQuery = searchQuery.toLowerCase();
      
      const creatorResults = searchData.creators.filter(creator => 
        creator.name.toLowerCase().includes(lowerQuery) ||
        creator.category.toLowerCase().includes(lowerQuery)
      ).map(creator => ({ ...creator, type: 'creator' }));

      const contentResults = searchData.contents.filter(content => 
        content.title.toLowerCase().includes(lowerQuery) ||
        content.creator.toLowerCase().includes(lowerQuery) ||
        content.category.toLowerCase().includes(lowerQuery)
      ).map(content => ({ ...content, type: 'content' }));

      const allResults = [...creatorResults, ...contentResults];
      setSearchResults(allResults);
      setIsSearching(false);
    }
  }, [searchQuery]);

  // 검색 결과 렌더링
  const renderSearchResults = () => {
    if (isSearching) {
      return (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ fontSize: '24px', marginBottom: '10px' }}>🔍</div>
          <p style={{ fontFamily: 'Nunito, sans-serif', color: '#666' }}>검색 중...</p>
        </div>
      );
    }

    if (!searchQuery.trim()) {
      return null;
    }

    if (searchResults.length === 0) {
      return (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>😔</div>
          <h3 style={{ fontFamily: 'Fredoka, sans-serif', color: '#2E7D32', marginBottom: '10px' }}>
            검색 결과가 없습니다
          </h3>
          <p style={{ fontFamily: 'Nunito, sans-serif', color: '#666' }}>
            다른 키워드로 검색해보세요
          </p>
        </div>
      );
    }

    const creators = searchResults.filter(result => result.type === 'creator');
    const contents = searchResults.filter(result => result.type === 'content');

    return (
      <div>
        {/* 검색 결과 요약 */}
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ 
            fontFamily: 'Fredoka, sans-serif', 
            fontSize: '24px', 
            color: '#2E7D32',
            marginBottom: '10px'
          }}>
            검색 결과: "{searchQuery}"
          </h2>
          <p style={{ 
            fontFamily: 'Nunito, sans-serif', 
            color: '#666',
            fontSize: '16px'
          }}>
            창작자 {creators.length}명, 콘텐츠 {contents.length}개를 찾았습니다
          </p>
        </div>

        {/* 창작자 결과 */}
        {creators.length > 0 && (
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ 
              fontFamily: 'Fredoka, sans-serif', 
              fontSize: '20px', 
              color: '#2E7D32',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              👥 창작자 ({creators.length}명)
            </h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '20px' 
            }}>
              {creators.map((creator) => (
                <div key={creator.id} style={{
                  background: 'white',
                  border: '2px solid #e9ecef',
                  borderRadius: '15px',
                  padding: '20px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-5px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                  e.target.style.borderColor = '#4CAF50';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                  e.target.style.borderColor = '#e9ecef';
                }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <div style={{ 
                      fontSize: '32px', 
                      marginRight: '15px',
                      background: '#f8f9fa',
                      padding: '10px',
                      borderRadius: '50%',
                      width: '52px',
                      height: '52px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {creator.profile}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ 
                        fontFamily: 'Fredoka, sans-serif', 
                        fontSize: '18px', 
                        color: '#2E7D32',
                        marginBottom: '5px'
                      }}>
                        {creator.name}
                      </h4>
                      <p style={{ 
                        fontFamily: 'Nunito, sans-serif', 
                        fontSize: '14px', 
                        color: '#666',
                        marginBottom: '5px'
                      }}>
                        팔로워 {creator.followers.toLocaleString()}명
                      </p>
                    </div>
                  </div>
                  
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center'
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
                      {creator.category}
                    </span>
                    <Link 
                      to={`/creator/${creator.id}`}
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
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-1px)';
                        e.target.style.boxShadow = '0 4px 8px rgba(76, 175, 80, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      프로필 보기
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 콘텐츠 결과 */}
        {contents.length > 0 && (
          <div>
            <h3 style={{ 
              fontFamily: 'Fredoka, sans-serif', 
              fontSize: '20px', 
              color: '#2E7D32',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              🎵 콘텐츠 ({contents.length}개)
            </h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
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
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-5px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                  e.target.style.borderColor = '#4CAF50';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                  e.target.style.borderColor = '#e9ecef';
                }}
                >
                  <h4 style={{ 
                    fontFamily: 'Fredoka, sans-serif', 
                    fontSize: '16px', 
                    color: '#2E7D32',
                    marginBottom: '10px'
                  }}>
                    {content.title}
                  </h4>
                  
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    marginBottom: '10px',
                    gap: '8px'
                  }}>
                    <span style={{ fontSize: '16px' }}>👤</span>
                    <span style={{ 
                      fontFamily: 'Nunito, sans-serif', 
                      fontSize: '14px', 
                      color: '#666' 
                    }}>
                      {content.creator}
                    </span>
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
                    alignItems: 'center'
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
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-1px)';
                        e.target.style.boxShadow = '0 4px 8px rgba(76, 175, 80, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      자세히 보기
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

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
          🔍 검색
        </h1>
        <p style={{ 
          fontFamily: 'Nunito, sans-serif', 
          fontSize: '18px', 
          color: '#666' 
        }}>
          창작자와 콘텐츠를 찾아보세요
        </p>
      </div>

      {/* 검색 입력창 */}
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto 40px auto',
        position: 'relative'
      }}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="창작자 이름, 콘텐츠 제목, 카테고리로 검색..."
          style={{
            width: '100%',
            padding: '15px 20px',
            fontSize: '16px',
            fontFamily: 'Nunito, sans-serif',
            border: '2px solid #e9ecef',
            borderRadius: '25px',
            outline: 'none',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#4CAF50';
            e.target.style.boxShadow = '0 4px 15px rgba(76, 175, 80, 0.2)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#e9ecef';
            e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
          }}
        />
        <div style={{
          position: 'absolute',
          right: '15px',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '20px',
          color: '#666'
        }}>
          🔍
        </div>
      </div>

      {/* 검색 결과 */}
      {renderSearchResults()}
    </div>
  );
}

export default Search;

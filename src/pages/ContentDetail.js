import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function ContentDetail() {
  const { id } = useParams();
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [cheerTokens, setCheerTokens] = useState(0);
  const [hasCheered, setHasCheered] = useState(false);
  const [isCheering, setIsCheering] = useState(false);
  const [cheerMessage, setCheerMessage] = useState("");

  // 데모용 더미 데이터
  const content = {
    id,
    title: "아이돌 커버송 메들리",
    creator: "MusicLover123",
    creatorAddress: "0x1234...abcd",
    createdAt: "2025-01-15",
    link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    cheers: 892,
    category: "음악",
    description: "팬이 직접 제작한 커버송 메들리입니다. 여러 인기곡을 아름다운 목소리로 커버한 작품으로, 많은 팬들의 사랑을 받고 있습니다.",
    challenge: "🎵 2025 신곡 커버 챌린지"
  };

  useEffect(() => {
    // 지갑 연결 상태 및 응원권 확인 (데모용)
    setIsWalletConnected(true);
    setCheerTokens(5);
    
    // 이미 응원했는지 확인 (데모용)
    setHasCheered(false);
  }, []);

  const handleCheer = async () => {
    if (!isWalletConnected) {
      setCheerMessage("지갑을 먼저 연결해주세요.");
      return;
    }

    if (cheerTokens < 1) {
      setCheerMessage("응원권이 부족합니다. 광고를 시청하여 응원권을 획득하세요.");
      return;
    }

    if (hasCheered) {
      setCheerMessage("이미 이 콘텐츠에 응원을 보냈습니다.");
      return;
    }

    try {
      setIsCheering(true);
      setCheerMessage("");

      // 실제로는 블록체인 트랜잭션 실행 (가스비 대납)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 성공 처리
      setCheerTokens(prev => prev - 1);
      setHasCheered(true);
      setCheerMessage("응원이 완료되었습니다! 💖");
      
    } catch (error) {
      setCheerMessage("응원 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsCheering(false);
    }
  };

  const getVideoEmbedUrl = (url) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = new URL(url).searchParams.get('v') || url.split('/').pop();
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

  return (
    <div>
      {/* 뒤로가기 및 기본 정보 */}
      <div className="card">
        <Link to="/" style={{ color: '#667eea', textDecoration: 'none', fontSize: '14px' }}>
          ← 홈으로 돌아가기
        </Link>
        <h1 style={{ margin: '16px 0 8px 0', fontSize: '1.8rem' }}>{content.title}</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ 
              width: '32px', 
              height: '32px', 
              borderRadius: '50%', 
              background: '#667eea',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '14px',
              fontWeight: 'bold'
            }}>
              {content.creator.charAt(0).toUpperCase()}
            </div>
            <div>
              <div style={{ fontWeight: '600', color: '#333' }}>{content.creator}</div>
              <div style={{ fontSize: '12px', color: '#666' }}>{content.creatorAddress}</div>
            </div>
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>
            📅 {content.createdAt}
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>
            📂 {content.category}
          </div>
        </div>
      </div>

      {/* 영상 플레이어 */}
      <div className="card">
        <div style={{ position: 'relative', paddingTop: '56.25%', borderRadius: '12px', overflow: 'hidden' }}>
          <iframe
            title="content-video"
            src={getVideoEmbedUrl(content.link)}
            style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100%', 
              border: 0 
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      {/* 콘텐츠 정보 및 액션 */}
      <div className="card">
        <div style={{ display: 'grid', gap: '20px' }}>
          {/* 설명 */}
          <div>
            <h3 style={{ margin: '0 0 12px 0', color: '#333' }}>설명</h3>
            <p style={{ color: '#666', lineHeight: '1.6', margin: 0 }}>
              {content.description}
            </p>
          </div>


          {/* 챌린지 참여 정보 */}
          {content.challenge && (
            <div style={{
              background: '#e8f4f8',
              padding: '16px',
              borderRadius: '8px',
              border: '1px solid #b8daff'
            }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#0c5460' }}>🏆 챌린지 참여</h4>
              <p style={{ margin: 0, color: '#0c5460', fontSize: '14px' }}>
                {content.challenge}
              </p>
            </div>
          )}

          {/* 통계 및 액션 */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '20px',
            background: '#f8f9fa',
            borderRadius: '12px',
            border: '1px solid #e9ecef'
          }}>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#e74c3c' }}>
                  {content.cheers.toLocaleString()}
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>응원</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#27ae60' }}>
                  {content.cheers * 0.001} ETH
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>예상 보상</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              {!isWalletConnected ? (
                <button className="btn btn-primary" disabled>
                  🔗 지갑 연결 필요
                </button>
              ) : cheerTokens < 1 ? (
                <button className="btn btn-secondary">
                  💖 응원권 획득하기
                </button>
              ) : hasCheered ? (
                <button className="btn btn-success" disabled>
                  ✅ 응원 완료
                </button>
              ) : (
                <button 
                  className="btn btn-primary" 
                  onClick={handleCheer}
                  disabled={isCheering}
                  style={{ 
                    padding: '12px 24px',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}
                >
                  {isCheering ? '응원 중...' : '💖 응원하기'}
                </button>
              )}
              
              <button className="btn btn-outline">
                📤 공유하기
              </button>
            </div>
          </div>

          {/* 응원 메시지 */}
          {cheerMessage && (
            <div style={{ 
              padding: '12px 16px',
              borderRadius: '8px',
              color: cheerMessage.includes('완료') ? '#155724' : '#721c24',
              background: cheerMessage.includes('완료') ? '#d4edda' : '#f8d7da',
              border: `1px solid ${cheerMessage.includes('완료') ? '#c3e6cb' : '#f5c6cb'}`,
              fontSize: '14px'
            }}>
              {cheerMessage}
            </div>
          )}
        </div>
      </div>

      {/* 창작자의 다른 콘텐츠 */}
      <div className="card">
        <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>
          {content.creator}의 다른 콘텐츠
        </h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '16px' 
        }}>
          {/* 데모용 다른 콘텐츠 */}
          <div style={{ 
            background: '#fff', 
            border: '1px solid #e9ecef',
            borderRadius: '8px', 
            padding: '16px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>🎤</div>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>댄스 커버</h4>
            <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>❤️ 234</p>
          </div>
          <div style={{ 
            background: '#fff', 
            border: '1px solid #e9ecef',
            borderRadius: '8px', 
            padding: '16px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>🎨</div>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>팬아트</h4>
            <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>❤️ 156</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentDetail;



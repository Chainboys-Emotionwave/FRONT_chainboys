import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 데모용 진행 중인 마을 축제 데이터
const ACTIVE_CHALLENGES = [
  {
    id: "challenge_1",
    title: "🎵 빌보드 HOT100 커버 1등을 뽑아라!",
    description: "가을을 맞아 마을에 새로운 선율을 선사해주세요!",
    endDate: "2025-02-15",
    reward: "1위: 2 ETH, 2-3위: 1 ETH, 4-10위: 0.5 ETH"
  },
  {
    id: "challenge_2", 
    title: "💃 방구석 스우파 챌린지!",
    description: "본인과 어울리는 즐거운 춤을 춰보세요!",
    endDate: "2025-02-20",
    reward: "1위: 1.5 ETH, 2-5위: 0.8 ETH"
  }
];

function Upload() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [selectedChallenge, setSelectedChallenge] = useState("");
  const [category, setCategory] = useState("음악");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [previewMeta, setPreviewMeta] = useState(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const categories = ["음악", "댄스", "아트", "코미디", "라이프스타일", "기타"];

  useEffect(() => {
    // 지갑 연결 상태 확인 (데모용)
    setIsWalletConnected(true);
  }, []);

  function isYouTubeUrl(url) {
    return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//.test(url);
  }

  function isTikTokUrl(url) {
    return /^(https?:\/\/)?(www\.)?(tiktok\.com|vm\.tiktok\.com)\//.test(url);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!isWalletConnected) {
      setMessage("지갑을 먼저 연결해주세요.");
      return;
    }

    if (!title.trim() || !link.trim()) {
      setMessage("제목과 링크는 필수입니다.");
      return;
    }

    if (!isYouTubeUrl(link) && !isTikTokUrl(link)) {
      setMessage("유튜브 또는 틱톡 링크만 지원됩니다.");
      return;
    }

    if (title.length > 100) {
      setMessage("제목은 100자 이하로 입력해주세요.");
      return;
    }

    if (description.length > 1000) {
      setMessage("설명은 1000자 이하로 입력해주세요.");
      return;
    }

    try {
      setSubmitting(true);
      
      // 실제 API 연동 전, 데모용 지연
      await new Promise((r) => setTimeout(r, 1500));
      
      setMessage("등록이 완료되었습니다! 🎉");
      
      // 2초 후 콘텐츠 상세 페이지로 이동
      setTimeout(() => {
        navigate("/");
      }, 2000);
      
    } catch (err) {
      setMessage("등록 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setSubmitting(false);
    }
  };

  const buildBadgeMetadata = () => {
    const metadata = {
      name: `Badge - ${title || 'Untitled'}`,
      description: description || '팬 활동 뱃지',
      external_url: link || undefined,
      attributes: [
        { trait_type: 'Platform', value: 'EmotionWave' },
        { trait_type: 'Type', value: 'SBT' },
        { trait_type: 'Category', value: category },
        ...(selectedChallenge ? [{ trait_type: 'Challenge', value: selectedChallenge }] : [])
      ]
    };
    setPreviewMeta(metadata);
  };

  return (
    <div>
      {/* 헤더 섹션 */}
      <div className="card hero-section">
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <h1 style={{ color: '#333', marginBottom: '16px', fontSize: '2rem' }}>
            🛡️ 컨텐츠 등록
          </h1>
          <p style={{ color: '#666', fontSize: '18px', marginBottom: '24px' }}>
            당신의 창작물로 마을 지도의 디자인을 업그레이드 시키세요!
          </p>
          
          {!isWalletConnected && (
            <div style={{ 
              background: '#fff3cd', 
              border: '1px solid #ffeaa7', 
              borderRadius: '8px', 
              padding: '12px', 
              marginBottom: '20px',
              color: '#856404'
            }}>
              ⚠️ 마을 수호신 등록을 위해 지갑 연결이 필요합니다.
            </div>
          )}
        </div>
      </div>

      {/* 등록 폼 */}
      <div className="card">
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
          {/* 제목 */}
          <label style={{ display: 'grid', gap: '8px' }}>
            <span style={{ fontWeight: 600, fontSize: '16px' }}>제목 *</span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예) 마을을 위한 아름다운 선율"
              maxLength={100}
              style={{ 
                padding: '12px 16px', 
                borderRadius: '8px', 
                border: '1px solid #ddd',
                fontSize: '16px'
              }}
            />
            <div style={{ fontSize: '12px', color: '#666', textAlign: 'right' }}>
              {title.length}/100
            </div>
          </label>

          {/* 영상 링크 */}
          <label style={{ display: 'grid', gap: '8px' }}>
            <span style={{ fontWeight: 600, fontSize: '16px' }}>영상 링크 *</span>
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=... 또는 https://www.tiktok.com/@... 또는 직접 파일 업로드"
              style={{ 
                padding: '12px 16px', 
                borderRadius: '8px', 
                border: '1px solid #ddd',
                fontSize: '16px'
              }}
            />
            <div style={{ fontSize: '12px', color: '#666' }}>
              유튜브, 틱톡 링크 또는 직접 파일을 업로드해주세요
            </div>
          </label>

          {/* 카테고리 */}
          <label style={{ display: 'grid', gap: '8px' }}>
            <span style={{ fontWeight: 600, fontSize: '16px' }}>카테고리</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ 
                padding: '12px 16px', 
                borderRadius: '8px', 
                border: '1px solid #ddd',
                fontSize: '16px'
              }}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </label>

          {/* 설명 */}
          <label style={{ display: 'grid', gap: '8px' }}>
            <span style={{ fontWeight: 600, fontSize: '16px' }}>설명</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="마을 수호신이 될 창작물에 대한 설명을 입력하세요"
              rows={4}
              maxLength={1000}
              style={{ 
                padding: '12px 16px', 
                borderRadius: '8px', 
                border: '1px solid #ddd', 
                resize: 'vertical',
                fontSize: '16px'
              }}
            />
            <div style={{ fontSize: '12px', color: '#666', textAlign: 'right' }}>
              {description.length}/1000
            </div>
          </label>

          {/* 챌린지 참여 */}
          {ACTIVE_CHALLENGES.length > 0 && (
            <label style={{ display: 'grid', gap: '8px' }}>
              <span style={{ fontWeight: 600, fontSize: '16px' }}>마을 축제 참여 (선택)</span>
              <select
                value={selectedChallenge}
                onChange={(e) => setSelectedChallenge(e.target.value)}
                style={{ 
                  padding: '12px 16px', 
                  borderRadius: '8px', 
                  border: '1px solid #ddd',
                  fontSize: '16px'
                }}
              >
                <option value="">마을 축제에 참여하지 않음</option>
                {ACTIVE_CHALLENGES.map(challenge => (
                  <option key={challenge.id} value={challenge.id}>
                    {challenge.title} (마감: {challenge.endDate})
                  </option>
                ))}
              </select>
              
              {selectedChallenge && (
                <div style={{ 
                  background: '#e8f4f8', 
                  padding: '12px', 
                  borderRadius: '8px',
                  fontSize: '14px'
                }}>
                  {ACTIVE_CHALLENGES.find(c => c.id === selectedChallenge)?.description}
                  <br />
                  <strong>보상: </strong>{ACTIVE_CHALLENGES.find(c => c.id === selectedChallenge)?.reward}
                </div>
              )}
            </label>
          )}

          {/* 제출 버튼 */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
            <button 
              className="btn btn-primary" 
              type="submit" 
              disabled={submitting || !isWalletConnected}
              style={{ 
                flex: 1,
                padding: '14px 24px',
                fontSize: '16px',
                fontWeight: '600'
              }}
            >
              {submitting ? '수호신 등록 중...' : '수호신 등록하기'}
            </button>
            <button 
              className="btn btn-secondary" 
              type="button" 
              onClick={buildBadgeMetadata}
              style={{ 
                padding: '14px 24px',
                fontSize: '16px'
              }}
            >
              메타데이터 미리보기
            </button>
          </div>
        </form>

        {message && (
          <div style={{ 
            marginTop: '20px', 
            padding: '12px 16px',
            borderRadius: '8px',
            color: message.includes('완료') ? '#155724' : '#721c24',
            background: message.includes('완료') ? '#d4edda' : '#f8d7da',
            border: `1px solid ${message.includes('완료') ? '#c3e6cb' : '#f5c6cb'}`
          }}>
            {message}
          </div>
        )}
      </div>

      {/* 메타데이터 미리보기 */}
      {previewMeta && (
        <div className="card">
          <h3 style={{ color: '#333', marginBottom: '16px' }}>🏅 배지 메타데이터 미리보기</h3>
          <div style={{ 
            background: '#f8f9fa', 
            padding: '16px', 
            borderRadius: '8px', 
            overflowX: 'auto',
            border: '1px solid #e9ecef'
          }}>
            <pre style={{ margin: 0, fontSize: '14px', lineHeight: '1.5' }}>
{JSON.stringify(previewMeta, null, 2)}
            </pre>
          </div>
          <p style={{ color: '#666', fontSize: '14px', marginTop: '12px' }}>
            이 메타데이터는 IPFS에 업로드되어 블록체인에 기록됩니다.
          </p>
        </div>
      )}

      {/* 가이드 섹션 */}
      <div className="card">
        <h3 style={{ color: '#333', marginBottom: '16px' }}>📋 마을 수호신 등록 가이드</h3>
        <div style={{ display: 'grid', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
            <span style={{ color: '#667eea', fontSize: '16px' }}>1️⃣</span>
            <span style={{ fontSize: '14px', color: '#666' }}>
              유튜브, 틱톡에 영상을 업로드하거나 직접 파일을 업로드해주세요
            </span>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
            <span style={{ color: '#667eea', fontSize: '16px' }}>2️⃣</span>
            <span style={{ fontSize: '14px', color: '#666' }}>
              제목과 설명을 입력하여 마을 주민들이 쉽게 찾을 수 있도록 해주세요
            </span>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
            <span style={{ color: '#667eea', fontSize: '16px' }}>3️⃣</span>
            <span style={{ fontSize: '14px', color: '#666' }}>
              진행 중인 마을 축제에 참여하면 추가 보상을 받을 수 있습니다
            </span>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
            <span style={{ color: '#667eea', fontSize: '16px' }}>4️⃣</span>
            <span style={{ fontSize: '14px', color: '#666' }}>
              등록된 수호신은 마을 주민들의 응원을 받아 랭킹에 반영됩니다
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upload;



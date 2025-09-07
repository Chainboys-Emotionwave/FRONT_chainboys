import { useState } from "react";

function Upload() {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [previewMeta, setPreviewMeta] = useState(null);

  function isYouTubeUrl(url) {
    return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//.test(url);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!title.trim() || !link.trim()) {
      setMessage("제목과 링크는 필수입니다.");
      return;
    }
    if (!isYouTubeUrl(link)) {
      setMessage("유튜브 링크 형식이 아닙니다.");
      return;
    }

    try {
      setSubmitting(true);
      // 실제 API 연동 전, 데모용 지연
      await new Promise((r) => setTimeout(r, 800));
      setMessage("등록이 완료되었습니다! (데모)");
      setTitle("");
      setLink("");
      setDescription("");
      setPreviewMeta(null);
    } catch (err) {
      setMessage("등록 중 오류가 발생했습니다.");
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
      ]
    };
    setPreviewMeta(metadata);
  };

  return (
    <div>
      <div className="card">
        <h1 style={{ color: '#333', marginBottom: '16px' }}>📤 콘텐츠 등록</h1>
        <p style={{ color: '#666', fontSize: '16px', marginBottom: '24px' }}>
          유튜브 링크, 제목, 설명을 입력해 팬 콘텐츠를 등록하세요.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
          <label style={{ display: 'grid', gap: 6 }}>
            <span style={{ fontWeight: 600 }}>제목</span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예) 아이돌 커버송 메들리"
              style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd' }}
            />
          </label>

          <label style={{ display: 'grid', gap: 6 }}>
            <span style={{ fontWeight: 600 }}>유튜브 링크</span>
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd' }}
            />
          </label>

          <label style={{ display: 'grid', gap: 6 }}>
            <span style={{ fontWeight: 600 }}>설명</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="콘텐츠에 대한 간단한 설명을 입력하세요"
              rows={4}
              style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd', resize: 'vertical' }}
            />
          </label>

          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn" type="submit" disabled={submitting}>
              {submitting ? '등록 중...' : '등록하기'}
            </button>
            <button className="btn" type="button" onClick={buildBadgeMetadata}>
              배지 메타데이터 미리보기
            </button>
          </div>
        </form>

        {message && (
          <div style={{ marginTop: 16, color: message.includes('완료') ? '#2f9e44' : '#d9480f' }}>
            {message}
          </div>
        )}
      </div>

      {previewMeta && (
        <div className="card">
          <h3 style={{ color: '#333', marginBottom: '12px' }}>🏅 배지 메타데이터 프리뷰</h3>
          <pre style={{ background: '#f8f9fa', padding: 12, borderRadius: 8, overflowX: 'auto' }}>
{JSON.stringify(previewMeta, null, 2)}
          </pre>
          <p style={{ color: '#666', fontSize: 12 }}>
            이 JSON을 IPFS에 업로드 후 URI를 `배지 데모 패널`에 입력하면 테스트 민팅 가능합니다.
          </p>
        </div>
      )}
    </div>
  );
}

export default Upload;



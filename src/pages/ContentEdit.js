import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

// 데모용 콘텐츠 데이터 (Collection.js와 동일)
const MOCK_CONTENTS = [
  {
    id: "1",
    title: "아이돌 커버송 메들리",
    category: "음악",
    description: "인기 K-POP 아이돌들의 대표곡들을 메들리로 커버한 영상입니다. 각 곡의 특징을 살리면서도 하나의 스토리로 연결했습니다.",
    thumbnail: "🎵",
    uploadDate: "2025-01-15",
    cheers: 892,
  },
  {
    id: "2",
    title: "댄스 챌린지 영상",
    category: "댄스",
    description: "최신 K-POP 댄스 챌린지에 참여한 영상입니다. 원곡의 안무를 정확히 따라하면서도 개성 있는 표현을 담았습니다.",
    thumbnail: "💃",
    uploadDate: "2025-01-12",
    cheers: 456,
  },
  {
    id: "3",
    title: "팬아트 컬렉션",
    category: "아트",
    description: "좋아하는 K-POP 아이돌들을 그린 팬아트 모음입니다. 다양한 스타일과 기법으로 표현했습니다.",
    thumbnail: "🎨",
    uploadDate: "2025-01-10",
    cheers: 234,
  }
];

// 카테고리 옵션
const CATEGORIES = [
  "음악", "댄스", "아트", "코미디", "라이프스타일", "연극", "사진", "서커스"
];

function ContentEdit() {
  const { id } = useParams();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  // 폼 상태
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: ""
  });

  useEffect(() => {
    // 콘텐츠 정보 로드
    const foundContent = MOCK_CONTENTS.find(c => c.id === id);
    if (foundContent) {
      setContent(foundContent);
      setFormData({
        title: foundContent.title,
        category: foundContent.category,
        description: foundContent.description
      });
    }
    setLoading(false);
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const handleSave = async () => {
    setSaving(true);
    setSaveMessage("");
    
    try {
      // 실제로는 API 호출
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSaveMessage("✅ 콘텐츠가 성공적으로 수정되었습니다!");
      
      // 2초 후 메시지 제거
      setTimeout(() => {
        setSaveMessage("");
      }, 3000);
    } catch (error) {
      setSaveMessage("❌ 저장 중 오류가 발생했습니다.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("정말로 이 콘텐츠를 삭제하시겠습니까?")) {
      setSaving(true);
      try {
        // 실제로는 API 호출
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // 삭제 후 내 집 페이지로 이동
        window.location.href = "/collection";
      } catch (error) {
        setSaveMessage("❌ 삭제 중 오류가 발생했습니다.");
        setSaving(false);
      }
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <div style={{ fontSize: '24px', marginBottom: '16px' }}>⏳</div>
        <p>콘텐츠 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (!content) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>😵</div>
        <h2>콘텐츠를 찾을 수 없습니다</h2>
        <p style={{ color: '#666', marginBottom: '24px' }}>
          요청하신 콘텐츠가 존재하지 않거나 삭제되었습니다.
        </p>
        <Link to="/collection" className="btn btn-primary">
          내 집으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* 헤더 */}
      <div className="card hero-section" style={{
        background: 'linear-gradient(135deg, #aed581 0%, #ffb74d 100%)',
        color: 'white',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '20px' }}>
          <div style={{ fontSize: '48px' }}>{content.thumbnail}</div>
          <div style={{ flex: 1 }}>
            <h1 style={{ margin: '0 0 8px 0', fontSize: '2rem' }}>
              📝 콘텐츠 수정
            </h1>
            <p style={{ margin: '0', opacity: 0.9 }}>
              {content.title} - {content.category}
            </p>
          </div>
          <Link to="/collection" className="btn-transparent" style={{ color: 'white' }}>
            ← 내 집으로 돌아가기
          </Link>
        </div>
      </div>

      {/* 수정 폼 */}
      <div className="card">
        <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>📝 콘텐츠 정보 수정</h3>
        
        <div style={{ display: 'grid', gap: '20px' }}>
          {/* 제목 */}
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: 'bold', 
              color: '#333' 
            }}>
              제목 *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e9ecef',
                borderRadius: '8px',
                fontSize: '16px',
                fontFamily: 'inherit'
              }}
              placeholder="콘텐츠 제목을 입력하세요"
            />
          </div>

          {/* 카테고리 */}
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: 'bold', 
              color: '#333' 
            }}>
              카테고리 *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e9ecef',
                borderRadius: '8px',
                fontSize: '16px',
                fontFamily: 'inherit',
                background: 'white'
              }}
            >
              <option value="">카테고리를 선택하세요</option>
              {CATEGORIES.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* 설명 */}
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: 'bold', 
              color: '#333' 
            }}>
              설명 *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={6}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e9ecef',
                borderRadius: '8px',
                fontSize: '16px',
                fontFamily: 'inherit',
                resize: 'vertical'
              }}
              placeholder="콘텐츠에 대한 설명을 입력하세요"
            />
          </div>


          {/* 저장 메시지 */}
          {saveMessage && (
            <div style={{
              padding: '12px 16px',
              borderRadius: '8px',
              background: saveMessage.includes('✅') ? '#d4edda' : '#f8d7da',
              color: saveMessage.includes('✅') ? '#155724' : '#721c24',
              border: `1px solid ${saveMessage.includes('✅') ? '#c3e6cb' : '#f5c6cb'}`
            }}>
              {saveMessage}
            </div>
          )}

          {/* 액션 버튼 */}
          <div style={{ 
            display: 'flex', 
            gap: '16px', 
            justifyContent: 'flex-end',
            marginTop: '20px'
          }}>
            <button
              onClick={handleDelete}
              disabled={saving}
              style={{
                padding: '12px 24px',
                background: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                cursor: saving ? 'not-allowed' : 'pointer',
                opacity: saving ? 0.6 : 1
              }}
            >
              🗑️ 삭제
            </button>
            <button
              onClick={handleSave}
              disabled={saving || !formData.title || !formData.category || !formData.description}
              style={{
                padding: '12px 24px',
                background: saving || !formData.title || !formData.category || !formData.description ? '#6c757d' : '#aed581',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                cursor: saving || !formData.title || !formData.category || !formData.description ? 'not-allowed' : 'pointer'
              }}
            >
              {saving ? '💾 저장 중...' : '💾 저장'}
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default ContentEdit;

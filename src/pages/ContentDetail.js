import { useParams, Link } from "react-router-dom";

function ContentDetail() {
  const { id } = useParams();

  // 데모용 더미 데이터
  const content = {
    id,
    title: "아이돌 커버송 메들리",
    creator: "0x1234...abcd",
    createdAt: "2025-09-07",
    link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    likes: 892,
    price: "0.15 ETH",
    description: "팬이 직접 제작한 커버송 메들리입니다."
  };

  return (
    <div>
      <div className="card">
        <Link to="/" style={{ color: '#667eea', textDecoration: 'none' }}>← 돌아가기</Link>
        <h1 style={{ margin: '12px 0 8px 0' }}>{content.title}</h1>
        <p style={{ margin: 0, color: '#666' }}>창작자: {content.creator} · 등록일: {content.createdAt}</p>
      </div>

      <div className="card">
        <div style={{ display: 'grid', gap: 12 }}>
          <div style={{ position: 'relative', paddingTop: '56.25%' }}>
            <iframe
              title="youtube"
              src={`https://www.youtube.com/embed/${new URL(content.link).searchParams.get('v')}`}
              style={{ position: 'absolute', top:0, left:0, width: '100%', height: '100%', border: 0, borderRadius: 8 }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <p style={{ color: '#333' }}>{content.description}</p>
          <p style={{ color: '#666', fontSize: 14 }}>❤️ {content.likes} · 💰 {content.price}</p>

          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn">응원하기</button>
            <button className="btn">구매하기</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentDetail;



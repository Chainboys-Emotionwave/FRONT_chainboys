import { Link } from "react-router-dom";
import RewardPoolPanel from "../components/RewardPoolPanel";

function Home() {
  return (
    <div>
      <RewardPoolPanel />

      <div className="card">
        <h1 style={{ color: '#333', marginBottom: '16px' }}>🎵 팬 콘텐츠 NFT 마켓</h1>
        <p style={{ color: '#666', fontSize: '18px', marginBottom: '24px' }}>
          최신 팬 영상과 챌린지를 NFT로 만나보세요.
        </p>
        <Link className="btn" to="/upload">📤 콘텐츠 업로드</Link>
      </div>

      <div className="card">
        <h3 style={{ color: '#333', marginBottom: '16px' }}>🔥 인기 콘텐츠</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
          <div style={{ background: '#f8f9fa', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '8px' }}>🎵</div>
            <h4><Link to="/content/1" style={{ textDecoration: 'none', color: '#333' }}>팬 커버송 #1</Link></h4>
            <p style={{ color: '#666', fontSize: '14px' }}>💰 0.05 ETH</p>
            <Link className="btn" style={{ fontSize: '14px', padding: '8px 16px', display: 'inline-block' }} to="/content/1">자세히</Link>
          </div>
          <div style={{ background: '#f8f9fa', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '8px' }}>📸</div>
            <h4><Link to="/content/2" style={{ textDecoration: 'none', color: '#333' }}>팬 아트 #2</Link></h4>
            <p style={{ color: '#666', fontSize: '14px' }}>💰 0.03 ETH</p>
            <Link className="btn" style={{ fontSize: '14px', padding: '8px 16px', display: 'inline-block' }} to="/content/2">자세히</Link>
          </div>
          <div style={{ background: '#f8f9fa', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '8px' }}>🎤</div>
            <h4><Link to="/content/3" style={{ textDecoration: 'none', color: '#333' }}>챌린지 영상 #3</Link></h4>
            <p style={{ color: '#666', fontSize: '14px' }}>💰 0.08 ETH</p>
            <Link className="btn" style={{ fontSize: '14px', padding: '8px 16px', display: 'inline-block' }} to="/content/3">자세히</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;  
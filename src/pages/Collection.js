function Collection() {
  return (
    <div>
      <div className="card">
        <h1 style={{ color: '#333', marginBottom: '16px' }}>💎 내 NFT 보관함</h1>
        <p style={{ color: '#666', fontSize: '16px', marginBottom: '24px' }}>
          지갑에 연결된 NFT를 확인하세요.
        </p>
        <button className="btn" style={{ marginBottom: '20px' }}>🔗 지갑 연결</button>
      </div>

      <div className="card">
        <h3 style={{ color: '#333', marginBottom: '20px' }}>내가 소유한 콘텐츠</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <div style={{ background: '#f8f9fa', padding: '16px', borderRadius: '8px', textAlign: 'center', border: '2px solid #667eea' }}>
            <div style={{ fontSize: '40px', marginBottom: '8px' }}>🎵</div>
            <h4 style={{ margin: '8px 0' }}>팬 영상 #1</h4>
            <p style={{ color: '#667eea', fontSize: '12px', margin: '4px 0' }}>소유중</p>
            <p style={{ color: '#666', fontSize: '14px' }}>구매가: 0.05 ETH</p>
          </div>
          <div style={{ background: '#f8f9fa', padding: '16px', borderRadius: '8px', textAlign: 'center', border: '2px solid #667eea' }}>
            <div style={{ fontSize: '40px', marginBottom: '8px' }}>📸</div>
            <h4 style={{ margin: '8px 0' }}>팬 아트 #2</h4>
            <p style={{ color: '#667eea', fontSize: '12px', margin: '4px 0' }}>소유중</p>
            <p style={{ color: '#666', fontSize: '14px' }}>구매가: 0.03 ETH</p>
          </div>
          <div style={{ background: '#f8f9fa', padding: '16px', borderRadius: '8px', textAlign: 'center', border: '2px solid #667eea' }}>
            <div style={{ fontSize: '40px', marginBottom: '8px' }}>🎤</div>
            <h4 style={{ margin: '8px 0' }}>팬 커버송 #3</h4>
            <p style={{ color: '#667eea', fontSize: '12px', margin: '4px 0' }}>소유중</p>
            <p style={{ color: '#666', fontSize: '14px' }}>구매가: 0.08 ETH</p>
          </div>
        </div>
      </div>

      

      <div className="card">
        <h3 style={{ color: '#333', marginBottom: '16px' }}>💰 수익 현황</h3>
        <div style={{ background: '#e8f4f8', padding: '16px', borderRadius: '8px' }}>
          <p style={{ margin: '8px 0', color: '#333' }}>🎯 총 로열티 수익: <strong>0.12 ETH</strong></p>
          <p style={{ margin: '8px 0', color: '#333' }}>📊 내 콘텐츠 거래 횟수: <strong>23회</strong></p>
          <button className="btn" style={{ fontSize: '14px', padding: '8px 16px' }}>💸 수익 출금</button>
        </div>
      </div>
    </div>
  );
}

export default Collection;
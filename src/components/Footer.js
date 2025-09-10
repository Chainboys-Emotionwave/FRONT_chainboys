function Footer() {
  return (
    <footer style={{
      background: '#f8f9fa',
      borderTop: '1px solid #e9ecef',
      marginTop: '60px',
      padding: '40px 20px 20px 20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '32px',
          marginBottom: '32px'
        }}>
          {/* 서비스 소개 */}
          <div>
            <h3 style={{ 
              margin: '0 0 16px 0', 
              color: '#333',
              fontSize: '18px',
              fontWeight: '600'
            }}>
              🎵 EmotionWave
            </h3>
            <p style={{ 
              color: '#666', 
              lineHeight: '1.6',
              margin: '0 0 16px 0'
            }}>
              K-POP 팬 창작자의 열정과 기여가 정당한 가치로 인정받는 생태계
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <span style={{ color: '#666', cursor: 'pointer' }}>📘</span>
              <span style={{ color: '#666', cursor: 'pointer' }}>📷</span>
              <span style={{ color: '#666', cursor: 'pointer' }}>🐦</span>
              <span style={{ color: '#666', cursor: 'pointer' }}>📺</span>
            </div>
          </div>

          {/* 서비스 */}
          <div>
            <h4 style={{ 
              margin: '0 0 16px 0', 
              color: '#333',
              fontSize: '16px',
              fontWeight: '600'
            }}>
              서비스
            </h4>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <li><a href="/" style={{ color: '#666', textDecoration: 'none' }}>홈</a></li>
              <li><a href="/upload" style={{ color: '#666', textDecoration: 'none' }}>콘텐츠 등록</a></li>
              <li><a href="/ranking" style={{ color: '#666', textDecoration: 'none' }}>랭킹</a></li>
              <li><a href="/collection" style={{ color: '#666', textDecoration: 'none' }}>마이페이지</a></li>
            </ul>
          </div>

          {/* 지원 */}
          <div>
            <h4 style={{ 
              margin: '0 0 16px 0', 
              color: '#333',
              fontSize: '16px',
              fontWeight: '600'
            }}>
              지원
            </h4>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <li><span style={{ color: '#666', cursor: 'pointer' }}>이용약관</span></li>
              <li><span style={{ color: '#666', cursor: 'pointer' }}>개인정보처리방침</span></li>
              <li><span style={{ color: '#666', cursor: 'pointer' }}>서비스 가이드</span></li>
              <li><span style={{ color: '#666', cursor: 'pointer' }}>자주 묻는 질문</span></li>
            </ul>
          </div>

          {/* 연락처 */}
          <div>
            <h4 style={{ 
              margin: '0 0 16px 0', 
              color: '#333',
              fontSize: '16px',
              fontWeight: '600'
            }}>
              연락처
            </h4>
            <div style={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              color: '#666'
            }}>
              <div>📧 support@emotionwave.com</div>
              <div>💬 Discord 커뮤니티</div>
              <div>📱 Telegram 채널</div>
              <div>🤝 제휴 문의</div>
            </div>
          </div>
        </div>

        {/* 하단 저작권 */}
        <div style={{
          borderTop: '1px solid #e9ecef',
          paddingTop: '20px',
          textAlign: 'center',
          color: '#999',
          fontSize: '14px'
        }}>
          <p style={{ margin: 0 }}>
            © 2025 EmotionWave. All rights reserved. | 
            Built with ❤️ for K-POP fans
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

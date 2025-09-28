import { Link } from "react-router-dom";

function VillageGuide() {
  return (
    <div>
      {/* 마을 가이드 헤더 */}
      <div className="card" style={{ 
        background: 'linear-gradient(135deg, #e8f5e8 0%, #f0f8e8 50%, #e8f4fd 100%)',
        border: '3px solid #8bc34a',
        boxShadow: '0 8px 32px rgba(139, 195, 74, 0.3)',
        marginBottom: '24px'
      }}>
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
          <h1 style={{ 
            color: '#2E7D32', 
            marginBottom: '16px', 
            fontSize: '2.5rem',
            fontFamily: 'Fredoka, sans-serif',
            textShadow: '2px 2px 0px #4CAF50'
          }}>
            🏡 마을 가이드 🏡
          </h1>
          <p style={{ 
            color: '#2E7D32', 
            fontSize: '18px', 
            maxWidth: '600px', 
            margin: '0 auto',
            fontFamily: 'Nunito, sans-serif',
            lineHeight: '1.6'
          }}>
            EmotionWave Village에 오신 것을 환영합니다!<br/>
            마을에서의 즐거운 생활을 위한 가이드입니다.
          </p>
        </div>
      </div>

      {/* 마을 규칙 */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <h2 style={{ 
          color: '#2E7D32', 
          marginBottom: '20px',
          fontFamily: 'Fredoka, sans-serif',
          textAlign: 'center'
        }}>
          📜 마을 규칙
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '20px' 
        }}>
          <div style={{ 
            background: 'linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%)',
            padding: '20px',
            borderRadius: '20px',
            border: '2px solid rgba(255, 183, 77, 0.3)'
          }}>
            <h3 style={{ color: '#2E7D32', marginBottom: '12px', fontFamily: 'Fredoka, sans-serif' }}>
              🤝 서로 존중하기
            </h3>
            <p style={{ color: '#666', lineHeight: '1.6', fontFamily: 'Nunito, sans-serif' }}>
              모든 마을 주민들을 존중하는 마음으로 소통
            </p>
          </div>
          <div style={{ 
            background: 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)',
            padding: '20px',
            borderRadius: '20px',
            border: '2px solid rgba(139, 195, 74, 0.3)'
          }}>
            <h3 style={{ color: '#2E7D32', marginBottom: '12px', fontFamily: 'Fredoka, sans-serif' }}>
              🎵 창작물 보호
            </h3>
            <p style={{ color: '#666', lineHeight: '1.6', fontFamily: 'Nunito, sans-serif' }}>
              창작물을 무단으로 사용하거나 복제 금지
            </p>
          </div>
          <div style={{ 
            background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
            padding: '20px',
            borderRadius: '20px',
            border: '2px solid rgba(33, 150, 243, 0.3)'
          }}>
            <h3 style={{ color: '#2E7D32', marginBottom: '12px', fontFamily: 'Fredoka, sans-serif' }}>
              🌟 긍정적 에너지
            </h3>
            <p style={{ color: '#666', lineHeight: '1.6', fontFamily: 'Nunito, sans-serif' }}>
              긍정적인 에너지로 함께 성장
            </p>
          </div>
        </div>
      </div>

      {/* 마을 시스템 가이드 */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <h2 style={{ 
          color: '#2E7D32', 
          marginBottom: '20px',
          fontFamily: 'Fredoka, sans-serif',
          textAlign: 'center'
        }}>
          🎮 마을 시스템 가이드
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: '20px' 
          }}>
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '20px',
            borderRadius: '20px',
            border: '2px solid rgba(139, 195, 74, 0.3)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎵</div>
            <h3 style={{ color: '#2E7D32', marginBottom: '12px', fontFamily: 'Fredoka, sans-serif' }}>
              음악 창작
            </h3>
            <p style={{ color: '#666', lineHeight: '1.6', fontFamily: 'Nunito, sans-serif', marginBottom: '16px' }}>
              여러분의 감정과 아이디어를 음악으로 표현해보세요.<br/>
              창작물은 마을 주민들과 공유됩니다.
            </p>
            <Link className="btn btn-primary" to="/upload" style={{ fontSize: '14px', padding: '8px 16px' }}>
              음악 올리기
            </Link>
          </div>
          
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '20px',
            borderRadius: '20px',
            border: '2px solid rgba(139, 195, 74, 0.3)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏆</div>
            <h3 style={{ color: '#2E7D32', marginBottom: '12px', fontFamily: 'Fredoka, sans-serif' }}>
              마을 축제
            </h3>
            <p style={{ color: '#666', lineHeight: '1.6', fontFamily: 'Nunito, sans-serif', marginBottom: '16px' }}>
              다른 주민들의 작품을 응원하고,<br/>
              인기 작품을 확인해보세요.
            </p>
            <Link className="btn btn-primary" to="/ranking" style={{ fontSize: '14px', padding: '8px 16px' }}>
              축제 참여하기
            </Link>
          </div>
          
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '20px',
            borderRadius: '20px',
            border: '2px solid rgba(139, 195, 74, 0.3)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏅</div>
            <h3 style={{ color: '#2E7D32', marginBottom: '12px', fontFamily: 'Fredoka, sans-serif' }}>
              명예의 뱃지
            </h3>
            <p style={{ color: '#666', lineHeight: '1.6', fontFamily: 'Nunito, sans-serif', marginBottom: '16px' }}>
              특별한 활동이나 기여에 대해 명예의 뱃지(SBT)를를 받을 수 있습니다.<br/>
              마을의 명예 시민이 되어보세요!
            </p>
            <Link className="btn btn-primary" to="/collection" style={{ fontSize: '14px', padding: '8px 16px' }}>
              내 뱃지 보기
            </Link>
          </div>
          
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '20px',
            borderRadius: '20px',
            border: '2px solid rgba(139, 195, 74, 0.3)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>💰</div>
            <h3 style={{ color: '#2E7D32', marginBottom: '12px', fontFamily: 'Fredoka, sans-serif' }}>
              공동 금고
            </h3>
            <p style={{ color: '#666', lineHeight: '1.6', fontFamily: 'Nunito, sans-serif', marginBottom: '16px' }}>
              마을 발전에 기여한 주민들에게 공동 금고에서 보상이 지급됩니다.<br/>
              함께 마을을 발전시켜보세요!
            </p>
            <Link className="btn btn-primary" to="/home" style={{ fontSize: '14px', padding: '8px 16px' }}>
              금고 확인하기
            </Link>
          </div>
        </div>
      </div>


      {/* 마을 레벨업 시스템 */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <h2 style={{ 
          color: '#2E7D32', 
          marginBottom: '20px',
          fontFamily: 'Fredoka, sans-serif',
          textAlign: 'center'
        }}>
          📈 마을 레벨업 시스템
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '20px' 
        }}>
          {/* 1단계 */}
          <div style={{ 
            background: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
            padding: '20px',
            borderRadius: '20px',
            border: '2px solid rgba(158, 158, 158, 0.3)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>🌱</div>
            <h3 style={{ color: '#2E7D32', marginBottom: '8px', fontFamily: 'Fredoka, sans-serif' }}>
            1️⃣단계 - 새싹 주민
            </h3>
            <p style={{ color: '#666', fontSize: '12px', fontFamily: 'Nunito, sans-serif', marginBottom: '8px' }}>
              게시물 0개
            </p>
            <div style={{ fontSize: '11px', color: '#888', textAlign: 'left' }}>
              <strong>내 집: </strong> 흑백 디자인 + 컬러 화분분<br/>
              <strong>지도: </strong> 도로 & 건물 테마 
            </div>
          </div>

          {/* 2단계 */}
          <div style={{ 
            background: 'linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%)',
            padding: '20px',
            borderRadius: '20px',
            border: '2px solid rgba(255, 183, 77, 0.3)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>🌿</div>
            <h3 style={{ color: '#2E7D32', marginBottom: '8px', fontFamily: 'Fredoka, sans-serif' }}>
            2️⃣단계 - 성장 주민
            </h3>
            <p style={{ color: '#666', fontSize: '12px', fontFamily: 'Nunito, sans-serif', marginBottom: '8px' }}>
              게시물 1개 달성
            </p>
            <div style={{ fontSize: '11px', color: '#888', textAlign: 'left' }}>
              <strong>내 집: </strong> 침대도 컬러 업그레이드<br/>
              <strong>지도: </strong> 가로등 추가 & 지도 업그레이드
            </div>
          </div>

          {/* 3단계 */}
          <div style={{ 
            background: 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)',
            padding: '20px',
            borderRadius: '20px',
            border: '2px solid rgba(139, 195, 74, 0.3)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>🌳</div>
            <h3 style={{ color: '#2E7D32', marginBottom: '8px', fontFamily: 'Fredoka, sans-serif' }}>
            3️⃣단계 - 성숙 주민
            </h3>
            <p style={{ color: '#666', fontSize: '12px', fontFamily: 'Nunito, sans-serif', marginBottom: '8px' }}>
              게시물 5개 달성
            </p>
            <div style={{ fontSize: '11px', color: '#888', textAlign: 'left' }}>
              <strong>내 집: </strong> 옷장 컬러 업그레이드<br/>
              <strong>지도: </strong> 나무 추가 & 지도 업그레이드
            </div>
          </div>

          {/* 4단계 */}
          <div style={{ 
            background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
            padding: '20px',
            borderRadius: '20px',
            border: '2px solid rgba(33, 150, 243, 0.3)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>🌟</div>
            <h3 style={{ color: '#2E7D32', marginBottom: '8px', fontFamily: 'Fredoka, sans-serif' }}>
            4️⃣단계 - 명예 주민
            </h3>
            <p style={{ color: '#666', fontSize: '12px', fontFamily: 'Nunito, sans-serif', marginBottom: '8px' }}>
              게시물 10개 달성
            </p>
            <div style={{ fontSize: '11px', color: '#888', textAlign: 'left' }}>
              <strong>내 집: </strong> 거울도 컬러 업그레이드<br/>
              <strong>지도: </strong> 화단 추가 & 지도 업그레이드
            </div>
          </div>

          {/* 5단계 */}
          <div style={{ 
            background: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd9 100%)',
            padding: '20px',
            borderRadius: '20px',
            border: '2px solid rgba(233, 30, 99, 0.3)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>👑</div>
            <h3 style={{ color: '#2E7D32', marginBottom: '8px', fontFamily: 'Fredoka, sans-serif' }}>
            5️⃣단계 - 빌리지 마스터 
            </h3>
            <p style={{ color: '#666', fontSize: '12px', fontFamily: 'Nunito, sans-serif', marginBottom: '8px' }}>
              게시물 50개 달성
            </p>
            <div style={{ fontSize: '11px', color: '#888', textAlign: 'left' }}>
              <strong>내 집: </strong> 책상 컬러 업그레이드<br/>
              <strong>지도: </strong> 연못 & 지도 업그레이드
            </div>
          </div>
        </div>
      </div>

      {/* 시작하기 버튼 */}
      <div style={{ textAlign: 'center', marginTop: '32px' }}>
        <Link 
          to="/home" 
          style={{ 
            fontSize: '18px', 
            padding: '16px 32px',
            background: 'linear-gradient(235deg, #c8e6c9 0%, #a5d6a7 50%, #81c784 100%)',
            color: '#2E7D32',
            textDecoration: 'none',
            borderRadius: '25px',
            boxShadow: '0 4px 15px rgba(129, 199, 132, 0.3)',
            display: 'inline-block',
            fontFamily: 'Fredoka, sans-serif',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 20px rgba(129, 199, 132, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 15px rgba(129, 199, 132, 0.3)';
          }}
        >
          🏡 마을로 돌아가기 🏡
        </Link>
      </div>
    </div>
  );
}

export default VillageGuide;

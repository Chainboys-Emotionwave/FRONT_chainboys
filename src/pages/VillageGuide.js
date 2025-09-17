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
            EmotionWave Village에 오신 것을 환영합니다! 마을에서의 즐거운 생활을 위한 가이드입니다.
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
              모든 마을 주민들을 존중하고, 서로의 창작물에 대해 건설적인 피드백을 제공해주세요.
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
              다른 사람의 창작물을 무단으로 사용하거나 복제하지 마세요. 저작권을 존중해주세요.
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
              마을에 긍정적인 에너지를 전파하고, 다른 주민들과 함께 성장해나가세요.
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
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
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
              여러분의 감정과 아이디어를 음악으로 표현해보세요. 창작물은 마을 주민들과 공유됩니다.
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
              다른 주민들의 작품에 축제 참여권(🎫)으로 응원하고, 인기 작품을 확인해보세요.
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
              명예의 훈장
            </h3>
            <p style={{ color: '#666', lineHeight: '1.6', fontFamily: 'Nunito, sans-serif', marginBottom: '16px' }}>
              특별한 활동이나 기여에 대해 명예의 훈장(SBT)을 받을 수 있습니다. 마을의 명예 시민이 되어보세요!
            </p>
            <Link className="btn btn-primary" to="/collection" style={{ fontSize: '14px', padding: '8px 16px' }}>
              내 훈장 보기
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
              마을 발전에 기여한 주민들에게 공동 금고에서 보상이 지급됩니다. 함께 마을을 발전시켜보세요!
            </p>
            <Link className="btn btn-primary" to="/home" style={{ fontSize: '14px', padding: '8px 16px' }}>
              금고 확인하기
            </Link>
          </div>
        </div>
      </div>

      {/* 아티스트별 전용 마을 */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <h2 style={{ 
          color: '#2E7D32', 
          marginBottom: '20px',
          fontFamily: 'Fredoka, sans-serif',
          textAlign: 'center'
        }}>
          🎭 아티스트별 전용 마을
        </h2>
        <div style={{ 
          background: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd9 100%)',
          padding: '30px',
          borderRadius: '20px',
          border: '2px solid rgba(233, 30, 99, 0.3)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>🌟</div>
          <h3 style={{ color: '#2E7D32', marginBottom: '16px', fontFamily: 'Fredoka, sans-serif' }}>
            특별한 마을 경험
          </h3>
          <p style={{ 
            color: '#666', 
            lineHeight: '1.6', 
            fontFamily: 'Nunito, sans-serif',
            maxWidth: '600px',
            margin: '0 auto 20px auto'
          }}>
            각 아티스트마다 고유한 전용 마을이 있습니다! 좋아하는 아티스트의 마을에서 
            특별한 콘텐츠와 이벤트를 만나보세요. 팬덤 관리 도구이자 홍보 채널로도 활용됩니다.
          </p>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '16px',
            marginTop: '24px'
          }}>
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.8)',
              padding: '16px',
              borderRadius: '15px',
              border: '2px solid rgba(255, 255, 255, 0.5)'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>🎵</div>
              <strong style={{ color: '#2E7D32', fontFamily: 'Quicksand, sans-serif' }}>전용 콘텐츠</strong>
            </div>
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.8)',
              padding: '16px',
              borderRadius: '15px',
              border: '2px solid rgba(255, 255, 255, 0.5)'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>🎉</div>
              <strong style={{ color: '#2E7D32', fontFamily: 'Quicksand, sans-serif' }}>특별 이벤트</strong>
            </div>
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.8)',
              padding: '16px',
              borderRadius: '15px',
              border: '2px solid rgba(255, 255, 255, 0.5)'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>👥</div>
              <strong style={{ color: '#2E7D32', fontFamily: 'Quicksand, sans-serif' }}>팬덤 관리</strong>
            </div>
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.8)',
              padding: '16px',
              borderRadius: '15px',
              border: '2px solid rgba(255, 255, 255, 0.5)'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>📊</div>
              <strong style={{ color: '#2E7D32', fontFamily: 'Quicksand, sans-serif' }}>데이터 확보</strong>
            </div>
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
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '20px' 
        }}>
          <div style={{ 
            background: 'linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%)',
            padding: '20px',
            borderRadius: '20px',
            border: '2px solid rgba(255, 183, 77, 0.3)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>🌱</div>
            <h3 style={{ color: '#2E7D32', marginBottom: '8px', fontFamily: 'Fredoka, sans-serif' }}>
              새싹 주민
            </h3>
            <p style={{ color: '#666', fontSize: '14px', fontFamily: 'Nunito, sans-serif' }}>
              마을에 처음 입장한 주민
            </p>
          </div>
          <div style={{ 
            background: 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)',
            padding: '20px',
            borderRadius: '20px',
            border: '2px solid rgba(139, 195, 74, 0.3)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>🌿</div>
            <h3 style={{ color: '#2E7D32', marginBottom: '8px', fontFamily: 'Fredoka, sans-serif' }}>
              성장 주민
            </h3>
            <p style={{ color: '#666', fontSize: '14px', fontFamily: 'Nunito, sans-serif' }}>
              활발히 활동하는 주민
            </p>
          </div>
          <div style={{ 
            background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
            padding: '20px',
            borderRadius: '20px',
            border: '2px solid rgba(33, 150, 243, 0.3)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>🌳</div>
            <h3 style={{ color: '#2E7D32', marginBottom: '8px', fontFamily: 'Fredoka, sans-serif' }}>
              성숙 주민
            </h3>
            <p style={{ color: '#666', fontSize: '14px', fontFamily: 'Nunito, sans-serif' }}>
              마을에 기여하는 주민
            </p>
          </div>
          <div style={{ 
            background: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd9 100%)',
            padding: '20px',
            borderRadius: '20px',
            border: '2px solid rgba(233, 30, 99, 0.3)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>👑</div>
            <h3 style={{ color: '#2E7D32', marginBottom: '8px', fontFamily: 'Fredoka, sans-serif' }}>
              명예 시민
            </h3>
            <p style={{ color: '#666', fontSize: '14px', fontFamily: 'Nunito, sans-serif' }}>
              마을의 리더 주민
            </p>
          </div>
        </div>
      </div>

      {/* 시작하기 버튼 */}
      <div style={{ textAlign: 'center', marginTop: '32px' }}>
        <Link className="btn btn-primary" to="/home" style={{ fontSize: '18px', padding: '16px 32px' }}>
          🏡 마을로 돌아가기
        </Link>
      </div>
    </div>
  );
}

export default VillageGuide;

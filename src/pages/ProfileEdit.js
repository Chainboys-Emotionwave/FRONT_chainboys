import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function ProfileEdit() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [profileImageId, setProfileImageId] = useState(1);
  const [profileColorId, setProfileColorId] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 프로필 이미지 옵션들 (ID 기반, 100개 이상)
  const profileImageOptions = [
    // 음악 관련
    { id: 1, emoji: "🎵", category: "music", name: "음표" },
    { id: 2, emoji: "🎤", category: "music", name: "마이크" },
    { id: 3, emoji: "🎧", category: "music", name: "헤드폰" },
    { id: 4, emoji: "🎸", category: "music", name: "기타" },
    { id: 5, emoji: "🎹", category: "music", name: "피아노" },
    { id: 6, emoji: "🥁", category: "music", name: "드럼" },
    { id: 7, emoji: "🎺", category: "music", name: "트럼펫" },
    { id: 8, emoji: "🎻", category: "music", name: "바이올린" },
    { id: 9, emoji: "🎼", category: "music", name: "악보" },
    { id: 10, emoji: "🎶", category: "music", name: "음표들" },
    { id: 11, emoji: "🎙️", category: "music", name: "스튜디오마이크" },
    { id: 12, emoji: "🎚️", category: "music", name: "레벨슬라이더" },
    { id: 13, emoji: "🎛️", category: "music", name: "믹싱보드" },
    { id: 14, emoji: "🎜️", category: "music", name: "음향조절" },
    { id: 15, emoji: "🎝️", category: "music", name: "음향장비" },
    { id: 16, emoji: "🎞️", category: "music", name: "필름프레임" },
    { id: 17, emoji: "🎟️", category: "music", name: "입장권" },
    { id: 18, emoji: "🎠", category: "music", name: "회전목마" },
    { id: 19, emoji: "🎡", category: "music", name: "관람차" },
    { id: 20, emoji: "🎢", category: "music", name: "롤러코스터" },
    
    // 아트 & 창작
    { id: 21, emoji: "🎨", category: "art", name: "팔레트" },
    { id: 22, emoji: "🖌️", category: "art", name: "붓" },
    { id: 23, emoji: "🖍️", category: "art", name: "크레파스" },
    { id: 24, emoji: "✏️", category: "art", name: "연필" },
    { id: 25, emoji: "📝", category: "art", name: "메모" },
    { id: 26, emoji: "📚", category: "art", name: "책들" },
    { id: 27, emoji: "📖", category: "art", name: "열린책" },
    { id: 28, emoji: "🎭", category: "art", name: "연극가면" },
    { id: 29, emoji: "🎪", category: "art", name: "서커스텐트" },
    { id: 30, emoji: "🖼️", category: "art", name: "그림틀" },
    { id: 31, emoji: "🖽", category: "art", name: "프레임" },
    { id: 32, emoji: "🖾", category: "art", name: "카드" },
    { id: 33, emoji: "🖿", category: "art", name: "파일" },
    { id: 34, emoji: "🗀", category: "art", name: "폴더" },
    { id: 35, emoji: "🗁", category: "art", name: "열린폴더" },
    { id: 36, emoji: "🗂️", category: "art", name: "분류카드" },
    { id: 37, emoji: "🗃️", category: "art", name: "파일박스" },
    { id: 38, emoji: "🗄️", category: "art", name: "파일캐비닛" },
    { id: 39, emoji: "🗅", category: "art", name: "빈폴더" },
    { id: 40, emoji: "🗆", category: "art", name: "폴더" },
    
    // 댄스 & 공연
    { id: 41, emoji: "💃", category: "dance", name: "여자댄서" },
    { id: 42, emoji: "🕺", category: "dance", name: "남자댄서" },
    { id: 43, emoji: "🎬", category: "dance", name: "영화촬영" },
    { id: 44, emoji: "📷", category: "dance", name: "카메라" },
    { id: 45, emoji: "🎥", category: "dance", name: "비디오카메라" },
    { id: 46, emoji: "🎞️", category: "dance", name: "필름" },
    { id: 47, emoji: "📹", category: "dance", name: "비디오" },
    { id: 48, emoji: "🎦", category: "dance", name: "영화" },
    { id: 49, emoji: "🎩", category: "dance", name: "실크햇" },
    { id: 50, emoji: "🎪", category: "dance", name: "서커스" },
    { id: 51, emoji: "🎫", category: "dance", name: "티켓" },
    { id: 52, emoji: "🎮", category: "dance", name: "게임패드" },
    { id: 53, emoji: "🎯", category: "dance", name: "다트" },
    { id: 54, emoji: "🎰", category: "dance", name: "슬롯머신" },
    { id: 55, emoji: "🎱", category: "dance", name: "8번공" },
    { id: 56, emoji: "🎲", category: "dance", name: "주사위" },
    { id: 57, emoji: "🎳", category: "dance", name: "볼링" },
    { id: 58, emoji: "🎴", category: "dance", name: "플라워카드" },
    { id: 59, emoji: "🎵", category: "dance", name: "음표" },
    { id: 60, emoji: "🎶", category: "dance", name: "음표들" },
    
    // 별 & 반짝임
    { id: 61, emoji: "🌟", category: "sparkle", name: "반짝이는별" },
    { id: 62, emoji: "⭐", category: "sparkle", name: "별" },
    { id: 63, emoji: "✨", category: "sparkle", name: "반짝임" },
    { id: 64, emoji: "💫", category: "sparkle", name: "별똥별" },
    { id: 65, emoji: "🌈", category: "sparkle", name: "무지개" },
    { id: 66, emoji: "🎆", category: "sparkle", name: "불꽃놀이" },
    { id: 67, emoji: "🎇", category: "sparkle", name: "스파클" },
    { id: 68, emoji: "💎", category: "sparkle", name: "다이아몬드" },
    { id: 69, emoji: "🔮", category: "sparkle", name: "수정구슬" },
    { id: 70, emoji: "🎊", category: "sparkle", name: "축하" },
    { id: 71, emoji: "🎉", category: "sparkle", name: "파티" },
    { id: 72, emoji: "🎈", category: "sparkle", name: "풍선" },
    { id: 73, emoji: "🎁", category: "sparkle", name: "선물" },
    { id: 74, emoji: "🏆", category: "sparkle", name: "트로피" },
    { id: 75, emoji: "🥇", category: "sparkle", name: "금메달" },
    { id: 76, emoji: "🥈", category: "sparkle", name: "은메달" },
    { id: 77, emoji: "🥉", category: "sparkle", name: "동메달" },
    { id: 78, emoji: "🏅", category: "sparkle", name: "메달" },
    { id: 79, emoji: "🎖️", category: "sparkle", name: "군사메달" },
    { id: 80, emoji: "🏵️", category: "sparkle", name: "장미장식" },
    
    // 동물 & 자연
    { id: 81, emoji: "🐱", category: "animal", name: "고양이" },
    { id: 82, emoji: "🐶", category: "animal", name: "강아지" },
    { id: 83, emoji: "🐭", category: "animal", name: "쥐" },
    { id: 84, emoji: "🐹", category: "animal", name: "햄스터" },
    { id: 85, emoji: "🐰", category: "animal", name: "토끼" },
    { id: 86, emoji: "🦊", category: "animal", name: "여우" },
    { id: 87, emoji: "🐻", category: "animal", name: "곰" },
    { id: 88, emoji: "🐼", category: "animal", name: "판다" },
    { id: 89, emoji: "🐨", category: "animal", name: "코알라" },
    { id: 90, emoji: "🐯", category: "animal", name: "호랑이" },
    { id: 91, emoji: "🦁", category: "animal", name: "사자" },
    { id: 92, emoji: "🐮", category: "animal", name: "소" },
    { id: 93, emoji: "🐷", category: "animal", name: "돼지" },
    { id: 94, emoji: "🐸", category: "animal", name: "개구리" },
    { id: 95, emoji: "🐵", category: "animal", name: "원숭이" },
    { id: 96, emoji: "🙈", category: "animal", name: "못본척원숭이" },
    { id: 97, emoji: "🙉", category: "animal", name: "못들은척원숭이" },
    { id: 98, emoji: "🙊", category: "animal", name: "못말하는척원숭이" },
    { id: 99, emoji: "🐒", category: "animal", name: "원숭이" },
    { id: 100, emoji: "🦍", category: "animal", name: "고릴라" }
  ];

  // 프로필 색상 옵션들 (ID 기반)
  const profileColorOptions = [
    { id: 1, gradient: "linear-gradient(135deg, #aed581 0%, #ffb74d 100%)", name: "자연" },
    { id: 2, gradient: "linear-gradient(135deg, #4fc3f7 0%, #29b6f6 100%)", name: "바다" },
    { id: 3, gradient: "linear-gradient(135deg, #ff7043 0%, #ff5722 100%)", name: "일몰" },
    { id: 4, gradient: "linear-gradient(135deg, #ba68c8 0%, #9c27b0 100%)", name: "보라" },
    { id: 5, gradient: "linear-gradient(135deg, #f06292 0%, #e91e63 100%)", name: "핑크" },
    { id: 6, gradient: "linear-gradient(135deg, #4db6ac 0%, #009688 100%)", name: "청록" },
    { id: 7, gradient: "linear-gradient(135deg, #ffd54f 0%, #ffc107 100%)", name: "황금" },
    { id: 8, gradient: "linear-gradient(135deg, #90a4ae 0%, #607d8b 100%)", name: "은색" },
    { id: 9, gradient: "linear-gradient(135deg, #ef5350 0%, #f44336 100%)", name: "빨강" },
    { id: 10, gradient: "linear-gradient(135deg, #66bb6a 0%, #4caf50 100%)", name: "초록" },
    { id: 11, gradient: "linear-gradient(135deg, #42a5f5 0%, #2196f3 100%)", name: "파랑" },
    { id: 12, gradient: "linear-gradient(135deg, #ffa726 0%, #ff9800 100%)", name: "주황" },
    { id: 13, gradient: "linear-gradient(135deg, #8e24aa 0%, #7b1fa2 100%)", name: "딥퍼플" },
    { id: 14, gradient: "linear-gradient(135deg, #00acc1 0%, #0097a7 100%)", name: "시안" },
    { id: 15, gradient: "linear-gradient(135deg, #5d4037 0%, #4e342e 100%)", name: "브라운" },
    { id: 16, gradient: "linear-gradient(135deg, #795548 0%, #6d4c41 100%)", name: "라이트브라운" },
    { id: 17, gradient: "linear-gradient(135deg, #607d8b 0%, #455a64 100%)", name: "블루그레이" },
    { id: 18, gradient: "linear-gradient(135deg, #ff5722 0%, #d84315 100%)", name: "딥오렌지" },
    { id: 19, gradient: "linear-gradient(135deg, #4caf50 0%, #388e3c 100%)", name: "딥그린" },
    { id: 20, gradient: "linear-gradient(135deg, #3f51b5 0%, #303f9f 100%)", name: "인디고" }
  ];

  // 데모용 사용자 데이터 (실제로는 API에서 가져올 데이터)
  const userData = {
    nickname: "음악의 요정",
    profileImageId: 1,  // 요정 이모지 ID
    profileColorId: 1   // 자연 색상 ID
  };

  useEffect(() => {
    // 현재 사용자 데이터로 폼 초기화
    setNickname(userData.nickname);
    setProfileImageId(userData.profileImageId);
    setProfileColorId(userData.profileColorId);
  }, [userData.nickname, userData.profileImageId, userData.profileColorId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!nickname.trim()) {
      setMessage("닉네임을 입력해주세요.");
      return;
    }

    if (nickname.length > 20) {
      setMessage("닉네임은 20자 이하로 입력해주세요.");
      return;
    }

    try {
      setIsLoading(true);
      
      // 실제 API 호출 (데모용 지연)
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // API 요청 데이터 구성
      const requestData = {
        nickname: nickname.trim(),
        profileImageId: profileImageId,
        profileColorId: profileColorId
      };

      // 실제 API 호출 (주석 처리)
      // const response = await fetch('http://localhost:8000/api/profile', {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(requestData)
      // });

      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }

      console.log('프로필 업데이트 요청:', requestData);
      
      setMessage("프로필이 성공적으로 변경되었습니다! 🎉");
      
      // 2초 후 내 집 페이지로 이동
      setTimeout(() => {
        navigate("/collection");
      }, 2000);
      
    } catch (err) {
      console.error('프로필 업데이트 오류:', err);
      setMessage("프로필 변경 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* 헤더 섹션 */}
      <div className="card hero-section">
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <h1 style={{ color: '#333', marginBottom: '16px', fontSize: '2rem' }}>
            ✏️ 프로필 변경
          </h1>
          <p style={{ color: '#666', fontSize: '18px', marginBottom: '24px' }}>
            나만의 프로필을 꾸며보세요!
          </p>
        </div>
      </div>

      {/* 프로필 편집 폼 */}
      <div className="card">
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
          {/* 현재 프로필 미리보기 */}
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h3 style={{ color: '#333', marginBottom: '16px' }}>프로필 미리보기</h3>
            <div style={{ 
              width: '100px', 
              height: '100px', 
              borderRadius: '50%', 
              background: profileColorOptions.find(color => color.id === profileColorId)?.gradient || 'linear-gradient(135deg, #aed581 0%, #ffb74d 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '40px',
              fontWeight: 'bold',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
              margin: '0 auto 16px auto'
            }}>
              {profileImageOptions.find(img => img.id === profileImageId)?.emoji || nickname?.charAt(0) || '🎵'}
            </div>
            <p style={{ color: '#666', fontSize: '16px', fontWeight: 'bold' }}>
              {nickname || '닉네임을 입력하세요'}
            </p>
          </div>

          {/* 닉네임 입력 */}
          <label style={{ display: 'grid', gap: '8px' }}>
            <span style={{ fontWeight: 600, fontSize: '16px' }}>닉네임 *</span>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="예) 음악의 요정"
              maxLength={20}
              style={{ 
                padding: '12px 16px', 
                borderRadius: '8px', 
                border: '1px solid #ddd',
                fontSize: '16px'
              }}
            />
            <div style={{ fontSize: '12px', color: '#666', textAlign: 'right' }}>
              {nickname.length}/20
            </div>
          </label>

          {/* 프로필 이미지 선택 */}
          <label style={{ display: 'grid', gap: '8px' }}>
            <span style={{ fontWeight: 600, fontSize: '16px' }}>프로필 이미지</span>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(10, 1fr)', 
              gap: '12px',
              maxHeight: '240px', // 3행 높이 (50px + 12px gap) * 3
              overflowY: 'auto',
              padding: '16px',
              background: '#f8f9fa',
              borderRadius: '8px',
              border: '1px solid #e9ecef',
              scrollbarWidth: 'thin',
              scrollbarColor: '#aed581 #f0f0f0'
            }}>
              {profileImageOptions.map((imageOption) => (
                <button
                  key={imageOption.id}
                  type="button"
                  onClick={() => setProfileImageId(imageOption.id)}
                  style={{
                    width: '50px',
                    height: '50px',
                    fontSize: '20px',
                    border: profileImageId === imageOption.id ? '3px solid #aed581' : '2px solid #e9ecef',
                    borderRadius: '8px',
                    background: profileImageId === imageOption.id ? '#f0f8e8' : 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onMouseEnter={(e) => {
                    if (profileImageId !== imageOption.id) {
                      e.target.style.borderColor = '#aed581';
                      e.target.style.background = '#f8f9fa';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (profileImageId !== imageOption.id) {
                      e.target.style.borderColor = '#e9ecef';
                      e.target.style.background = 'white';
                    }
                  }}
                  title={imageOption.name} // 툴팁으로 이모지 이름 표시
                >
                  {imageOption.emoji}
                </button>
              ))}
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>
              원하는 이모지를 클릭하여 선택하세요
            </div>
          </label>

          {/* 프로필 색상 선택 */}
          <label style={{ display: 'grid', gap: '8px' }}>
            <span style={{ fontWeight: 600, fontSize: '16px' }}>프로필 배경색</span>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(10, 1fr)', 
              gridTemplateRows: 'repeat(2, 1fr)',
              gap: '12px',
              padding: '16px',
              background: '#f8f9fa',
              borderRadius: '8px',
              border: '1px solid #e9ecef',
              maxWidth: '600px'
            }}>
              {profileColorOptions.map((colorOption) => (
                <button
                  key={colorOption.id}
                  type="button"
                  onClick={() => setProfileColorId(colorOption.id)}
                  style={{
                    width: '50px',
                    height: '50px',
                    background: colorOption.gradient,
                    border: profileColorId === colorOption.id ? '3px solid #333' : '2px solid #e9ecef',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onMouseEnter={(e) => {
                    if (profileColorId !== colorOption.id) {
                      e.target.style.borderColor = '#aed581';
                      e.target.style.transform = 'scale(1.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (profileColorId !== colorOption.id) {
                      e.target.style.borderColor = '#e9ecef';
                      e.target.style.transform = 'scale(1)';
                    }
                  }}
                  title={colorOption.name} // 툴팁으로 색상 이름 표시
                >
                </button>
              ))}
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>
              원하는 색상을 클릭하여 선택하세요
            </div>
          </label>

          {/* 제출 버튼 */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
            <button 
              className="btn btn-primary" 
              type="submit" 
              disabled={isLoading}
              style={{ 
                flex: 1,
                padding: '14px 24px',
                fontSize: '16px',
                fontWeight: '600'
              }}
            >
              {isLoading ? '변경 중...' : '프로필 변경하기'}
            </button>
            <Link 
              to="/collection" 
              className="btn btn-secondary" 
              style={{ 
                padding: '14px 24px',
                fontSize: '16px',
                textDecoration: 'none',
                textAlign: 'center'
              }}
            >
              취소
            </Link>
          </div>
        </form>

        {message && (
          <div style={{ 
            marginTop: '20px', 
            padding: '12px 16px',
            borderRadius: '8px',
            color: message.includes('성공') ? '#155724' : '#721c24',
            background: message.includes('성공') ? '#d4edda' : '#f8d7da',
            border: `1px solid ${message.includes('성공') ? '#c3e6cb' : '#f5c6cb'}`
          }}>
            {message}
          </div>
        )}
      </div>

      {/* 가이드 섹션 */}
      <div className="card">
        <h3 style={{ color: '#333', marginBottom: '16px' }}>📋 프로필 변경 가이드</h3>
        <div style={{ display: 'grid', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
            <span style={{ color: '#667eea', fontSize: '16px' }}>1️⃣</span>
            <span style={{ fontSize: '14px', color: '#666' }}>
              닉네임은 20자 이하로 입력해주세요
            </span>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
            <span style={{ color: '#667eea', fontSize: '16px' }}>2️⃣</span>
            <span style={{ fontSize: '14px', color: '#666' }}>
              프로필 이미지는 다양한 이모지 중에서 선택할 수 있습니다
            </span>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
            <span style={{ color: '#667eea', fontSize: '16px' }}>3️⃣</span>
            <span style={{ fontSize: '14px', color: '#666' }}>
              변경된 프로필은 마을에서 다른 사용자들에게 보여집니다
            </span>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
            <span style={{ color: '#667eea', fontSize: '16px' }}>4️⃣</span>
            <span style={{ fontSize: '14px', color: '#666' }}>
              언제든지 다시 변경할 수 있습니다
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileEdit;

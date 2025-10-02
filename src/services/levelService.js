// 사용자 레벨 관리 서비스
class LevelService {
  constructor() {
    this.levelThresholds = [
      { level: 1, minPosts: 0, maxPosts: 2, name: '새싹 주민', emoji: '🌱' },
      { level: 2, minPosts: 3, maxPosts: 7, name: '성장 주민', emoji: '🌿' },
      { level: 3, minPosts: 8, maxPosts: 15, name: '활발 주민', emoji: '🌳' },
      { level: 4, minPosts: 16, maxPosts: 30, name: '인기 주민', emoji: '⭐' },
      { level: 5, minPosts: 31, maxPosts: Infinity, name: '명예 시민', emoji: '👑' }
    ];
  }

  // 게시물 수를 기반으로 사용자 레벨 계산
  calculateLevel(postCount) {
    for (const threshold of this.levelThresholds) {
      if (postCount >= threshold.minPosts && postCount <= threshold.maxPosts) {
        return threshold;
      }
    }
    // 기본값 (레벨 1)
    return this.levelThresholds[0];
  }

  // 레벨에 따른 지도 이미지 경로 반환
  getMapImage(level) {
    const mapImages = {
      1: '/map_1.jpg',
      2: '/map_2.jpg', 
      3: '/map_3.jpg',
      4: '/map_4.jpg',
      5: '/map_5.jpg'
    };
    return mapImages[level] || '/map_1.jpg';
  }

  // 다음 레벨까지 필요한 게시물 수 계산
  getPostsToNextLevel(currentPostCount) {
    const currentLevel = this.calculateLevel(currentPostCount);
    if (currentLevel.level >= 5) {
      return 0; // 최고 레벨
    }
    
    const nextLevel = this.levelThresholds[currentLevel.level];
    return nextLevel.minPosts - currentPostCount;
  }

  // 레벨 진행률 계산 (0-100%)
  getLevelProgress(currentPostCount) {
    const currentLevel = this.calculateLevel(currentPostCount);
    if (currentLevel.level >= 5) {
      return 100; // 최고 레벨
    }
    
    const levelRange = currentLevel.maxPosts - currentLevel.minPosts + 1;
    const progressInLevel = currentPostCount - currentLevel.minPosts + 1;
    return Math.round((progressInLevel / levelRange) * 100);
  }

  // 모든 레벨 정보 반환
  getAllLevels() {
    return this.levelThresholds;
  }
}

export default new LevelService();


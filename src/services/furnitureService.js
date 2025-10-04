// 가구 이미지 관리 서비스
class FurnitureService {
  constructor() {
    // 레벨별 가구 조합 정의
    this.furnitureConfig = {
      1: {
        // 1단계: 화분 컬러, 나머지 흑백
        pots: 'color',
        bed: 'black',
        desk: 'black', 
        closet: 'black',
        mirror: 'black'
      },
      2: {
        // 2단계: 화분 컬러, 침대 컬러, 나머지 흑백
        pots: 'color',
        bed: 'color',
        desk: 'black',
        closet: 'black', 
        mirror: 'black'
      },
      3: {
        // 3단계: 화분 컬러, 침대 컬러, 옷장 컬러, 나머지 흑백
        pots: 'color',
        bed: 'color',
        desk: 'black',
        closet: 'color',
        mirror: 'black'
      },
      4: {
        // 4단계: 화분 컬러, 침대 컬러, 옷장 컬러, 거울 컬러, 책상 흑백
        pots: 'color',
        bed: 'color',
        desk: 'black',
        closet: 'color',
        mirror: 'color'
      },
      5: {
        // 5단계: 모든 가구 컬러
        pots: 'color',
        bed: 'color',
        desk: 'color',
        closet: 'color',
        mirror: 'color'
      }
    };

    // 가구별 이미지 경로 매핑
    this.furnitureImages = {
      pots: {
        color: '/pots_color.png',
        black: '/pots_color.png' // 화분은 항상 컬러
      },
      bed: {
        color: '/bed_color.png',
        black: '/bed_black.png'
      },
      desk: {
        color: '/desk_color.png', 
        black: '/desk_black.png'
      },
      closet: {
        color: '/closet_color.png',
        black: '/closet_black.png'
      },
      mirror: {
        color: '/mirror_color.png',
        black: '/mirror_black.png'
      }
    };

    // 가구별 기능 매핑
    this.furnitureFunctions = {
      pots: {
        name: '내 집 통계',
        description: '내 집 통계를 확인하세요',
        route: '/profile'
      },
      bed: {
        name: '보상 내역',
        description: '보상 내역을 확인하세요',
        route: '/rewards'
      },
      mirror: {
        name: '뱃지 컬렉션',
        description: '뱃지 컬렉션을 확인하세요',
        route: '/collection'
      },
      desk: {
        name: '마을 가이드',
        description: '마을 가이드를 확인하세요',
        route: '/guide'
      },
      closet: {
        name: '콘텐츠',
        description: '콘텐츠를 확인하세요',
        route: '/search'
      }
    };
  }

  // 레벨에 따른 가구 이미지 경로 반환
  getFurnitureImage(furnitureType, level) {
    const config = this.furnitureConfig[level] || this.furnitureConfig[1];
    const colorType = config[furnitureType] || 'black';
    return this.furnitureImages[furnitureType][colorType];
  }

  // 레벨에 따른 모든 가구 정보 반환
  getAllFurniture(level) {
    const config = this.furnitureConfig[level] || this.furnitureConfig[1];
    const furniture = {};

    Object.keys(this.furnitureImages).forEach(type => {
      const colorType = config[type] || 'black';
      furniture[type] = {
        image: this.furnitureImages[type][colorType],
        function: this.furnitureFunctions[type],
        isColor: colorType === 'color'
      };
    });

    return furniture;
  }

  // 배경 이미지 경로 반환
  getBackgroundImage() {
    return '/room_back.png';
  }

  // 레벨별 가구 조합 정보 반환
  getLevelFurnitureInfo(level) {
    const config = this.furnitureConfig[level] || this.furnitureConfig[1];
    const colorFurniture = [];
    const blackFurniture = [];

    Object.keys(config).forEach(type => {
      if (config[type] === 'color') {
        colorFurniture.push(this.furnitureFunctions[type].name);
      } else {
        blackFurniture.push(this.furnitureFunctions[type].name);
      }
    });

    return {
      level,
      colorFurniture,
      blackFurniture,
      config
    };
  }
}

export default new FurnitureService();

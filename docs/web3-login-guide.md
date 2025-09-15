# 웹3 지갑 로그인 구현 가이드

## 구현된 기능

### 1. API 서비스 (`src/services/authService.js`)
- 서명 메시지 요청 API 호출
- 서명 검증 및 로그인 API 호출
- JWT 토큰 관리
- 로그아웃 기능
- 토큰 유효성 검증

### 2. 인증 컨텍스트 (`src/contexts/AuthContext.js`)
- 전역 인증 상태 관리
- JWT 토큰 기반 로그인 상태 유지
- 사용자 정보 관리
- 자동 토큰 검증

### 3. 지갑 연결 컴포넌트 (`src/components/WalletConnect.js`)
- 메타마스크 지갑 연결
- 웹3 서명 기반 로그인 플로우
- 사용자 프로필 표시
- 네트워크 전환 기능

## 로그인 플로우

1. **지갑 연결**: 사용자가 "지갑 연결" 버튼 클릭
2. **계정 선택**: 메타마스크에서 계정 선택
3. **서명 메시지 요청**: 백엔드에 지갑 주소 전송하여 서명 메시지 받기
4. **서명 요청**: 메타마스크에서 서명 요청
5. **서명 검증**: 백엔드에서 서명 검증 및 JWT 토큰 발급
6. **로그인 완료**: 사용자 정보 저장 및 UI 업데이트

## 백엔드 API 엔드포인트

### 1. 서명 메시지 요청
```
POST /api/auth/request-message
Content-Type: application/json

{
  "walletAddress": "0x1234..."
}

Response:
{
  "message": "Welcome to MyDApp! Please sign this message to confirm your identity. Nonce: 9876543210"
}
```

### 2. 서명 검증 및 로그인
```
POST /api/auth/verify-signature
Content-Type: application/json

{
  "walletAddress": "0x1234...",
  "signature": "0x5678..."
}

Response:
{
  "status": "success",
  "token": "eyJhbGciOi...",
  "user": {
    "id": 1,
    "walletAddress": "0x1234...",
    "username": "MyDAppUser",
    "fan_ticket_count": 5
  }
}
```

### 3. 로그아웃
```
POST /api/auth/logout
Authorization: Bearer <JWT_TOKEN>

Response:
{
  "status": "success",
  "message": "로그아웃되었습니다."
}
```

## 환경 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
REACT_APP_API_URL=http://localhost:3001
REACT_APP_ENV=development
```

## 테스트 방법

1. **메타마스크 설치**: 브라우저에 메타마스크 확장 프로그램 설치
2. **개발 서버 실행**: `npm start`
3. **지갑 연결**: "지갑 연결" 버튼 클릭
4. **계정 선택**: 메타마스크에서 계정 선택
5. **서명 확인**: 메타마스크에서 서명 요청 승인
6. **로그인 확인**: 사용자 정보가 표시되는지 확인

## 주의사항

- 백엔드 서버가 실행 중이어야 합니다
- 메타마스크가 설치되어 있어야 합니다
- 네트워크 설정이 올바른지 확인하세요
- CORS 설정이 프론트엔드 도메인을 허용하는지 확인하세요

## 문제 해결

### 1. "메타마스크를 설치해주세요" 오류
- 브라우저에 메타마스크 확장 프로그램이 설치되어 있는지 확인

### 2. "서명 메시지 요청에 실패했습니다" 오류
- 백엔드 서버가 실행 중인지 확인
- API URL이 올바른지 확인
- CORS 설정 확인

### 3. "로그인에 실패했습니다" 오류
- 서명이 올바른지 확인
- 백엔드에서 서명 검증 로직 확인
- JWT 토큰 발급 로직 확인

# 스마트 계약 인터페이스 초안

## RewardPool (보상 풀)
- state
  - totalPool(): uint256 — 예치 총액
  - period(): {start, end}
  - rule(): bytes — 분배 규칙 식별자/설정
- admin
  - deposit(): payable — 보상 재원 예치
  - configure(start, end, rule): onlyOwner — 기간/규칙 설정
  - distribute(address[] creators, uint256[] amounts): onlyOwner — 분배 실행, 이벤트 방출
- view
  - getSchedule(): (start, end, rule)
- events
  - Deposited(sender, amount)
  - Configured(start, end, rule)
  - Distributed(batchId, creators[], amounts[])

## SBT (활동 증명 배지)
- 특징: 비양도성(transfer/approve 차단)
- admin
  - mint(to, tokenId, metadataURI): onlyMinter — 조건 충족 시 발급
  - setMinter(address)
- view
  - tokenURI(tokenId): string
- events
  - Minted(to, tokenId, uri)

## 온체인/오프체인 연동 포인트
- 분배 입력 데이터: 백엔드 집계 값(응원/랭킹) → distribute 호출
- SBT 발급 조건: 백엔드 판정(주간 1위 등) → mint 호출



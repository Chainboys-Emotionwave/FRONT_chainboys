# 임시 백엔드 API 스펙 (Draft)

Base URL: /api

## 인증/지갑
- (추후) 지갑 서명 기반 세션 발급 또는 단순 지갑 주소 파라미터 사용

## Contents
- POST /contents
  - body: { creatorWallet, title, description, link }
  - 201 { id }
- GET /contents/:id
  - 200 { id, creatorWallet, title, description, link, createdAt, stats }
- GET /contents
  - query: { page, size, sort }
  - 200 { items: [...], page, total }

## Ranking / Support(응원)
- POST /support
  - body: { contentId, supporterWallet, txHash? }
  - 200 { ok: true }
- GET /ranking
  - query: { period=weekly|monthly, metric=trades|likes }
  - 200 { items: [{ rank, contentId, metricValue, title, creator }] }

## Reward Pool
- POST /reward/config
  - body: { total, start, end, rule }
  - 200 { ok: true }
- POST /reward/distribute
  - body: { batchId?, items: [{ creatorWallet, amount }] }
  - 200 { txHash }
- GET /reward/logs
  - 200 { items: [{ time, batchId, total, txHash }] }

## Badges (SBT)
- POST /badges/mint
  - body: { to, type, metadata }
  - 200 { txHash, tokenId }
- GET /badges/:wallet
  - 200 { items: [{ tokenId, type, uri }] }

## 이벤트 웹훅(옵션)
- POST /webhook/onchain
  - body: { event, payload }
  - 200 { ok: true }



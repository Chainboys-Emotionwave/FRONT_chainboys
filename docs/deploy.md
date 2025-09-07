# 배포 가이드 (Hardhat)

## 설치
```bash
npm i -D hardhat @nomicfoundation/hardhat-toolbox dotenv
```

## 초기화
```bash
npx hardhat init
```

## 환경변수(.env)
```
SEPOLIA_RPC_URL=...
PRIVATE_KEY=...
```

## hardhat.config.js 예시
```js
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
```

## 스크립트 예시(scripts/deploy.js)
```js
async function main() {
  const RewardPool = await ethers.getContractFactory("RewardPool");
  const pool = await RewardPool.deploy();
  await pool.deployed();
  console.log("RewardPool:", pool.address);
}
main().catch((e)=>{ console.error(e); process.exit(1); });
```

## 배포
```bash
npx hardhat run scripts/deploy.js --network sepolia
```



/**** Hardhat deploy script (CommonJS) ****/
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deployer:", deployer.address);

  const RewardPool = await hre.ethers.getContractFactory("RewardPool");
  const rewardPool = await RewardPool.deploy();
  await rewardPool.deployed();
  console.log("RewardPool deployed:", rewardPool.address);

  const SBT = await hre.ethers.getContractFactory("SoulboundBadge");
  const sbt = await SBT.deploy("EmotionWave SBT", "EWSBT");
  await sbt.deployed();
  console.log("SoulboundBadge deployed:", sbt.address);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});



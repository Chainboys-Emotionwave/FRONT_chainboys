
/**** Hardhat deploy script (CommonJS, ethers v6) ****/
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deployer:", deployer.address);

  const RewardPool = await hre.ethers.getContractFactory("RewardPool");
  const rewardPool = await RewardPool.deploy();
  await rewardPool.waitForDeployment();
  console.log("RewardPool deployed:", rewardPool.target);

  const SBT = await hre.ethers.getContractFactory("SoulboundBadge");
  const sbt = await SBT.deploy("EmotionWave SBT", "EWSBT");
  await sbt.waitForDeployment();
  console.log("SoulboundBadge deployed:", sbt.target);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

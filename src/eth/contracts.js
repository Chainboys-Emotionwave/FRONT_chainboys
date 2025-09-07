import { ethers } from "ethers";

export const ALLOWED_CHAIN_IDS = [31337, 11155111]; // Hardhat local, Sepolia

export const CONTRACTS = {
  RewardPool: {
    // NOTE: 로컬 하드햇 배포 주소. 테스트넷 배포 후 교체하세요.
    address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    abi: [
      "function deposit() payable",
      "function configure(uint256,uint256,bytes)",
      "function distribute(address[],uint256[])",
      "function getSchedule() view returns (uint256,uint256,bytes)",
      "function totalPool() view returns (uint256)",
      "event Deposited(address indexed sender, uint256 amount)",
      "event Configured(uint256 start, uint256 end, bytes rule)",
      "event Distributed(bytes32 indexed batchId, address[] creators, uint256[] amounts)"
    ]
  }
};

export async function getProvider() {
  if (!window.ethereum) throw new Error("No wallet");
  return new ethers.BrowserProvider(window.ethereum);
}

export async function getSigner() {
  const provider = await getProvider();
  const network = await provider.getNetwork();
  if (!ALLOWED_CHAIN_IDS.includes(Number(network.chainId))) {
    throw new Error("Wrong network");
  }
  return await provider.getSigner();
}

export async function getRewardPoolContract(withSigner = true) {
  const provider = await getProvider();
  const iface = new ethers.Interface(CONTRACTS.RewardPool.abi);
  const target = CONTRACTS.RewardPool.address;
  if (withSigner) {
    const signer = await getSigner();
    return new ethers.Contract(target, iface, signer);
  }
  return new ethers.Contract(target, iface, provider);
}

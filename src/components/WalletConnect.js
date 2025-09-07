import { useEffect, useState } from "react";
import { ethers } from "ethers";

function WalletConnect() {
  const [account, setAccount] = useState("");
  const [network, setNetwork] = useState("");
  const [error, setError] = useState("");
  const [chainId, setChainId] = useState(0);

  useEffect(() => {
    if (!window.ethereum) return;
    const provider = new ethers.BrowserProvider(window.ethereum);
    provider.getNetwork().then((n) => { setNetwork(n?.name || ""); setChainId(Number(n?.chainId || 0)); });

    window.ethereum.on?.("accountsChanged", (accs) => {
      setAccount(accs?.[0] || "");
    });
    window.ethereum.on?.("chainChanged", () => {
      window.location.reload();
    });

    return () => {
      window.ethereum?.removeListener?.("accountsChanged", () => {});
      window.ethereum?.removeListener?.("chainChanged", () => {});
    };
  }, []);

  const connect = async () => {
    try {
      if (!window.ethereum) {
        setError("메타마스크를 설치해주세요.");
        return;
      }
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts?.[0] || "");
      const net = await provider.getNetwork();
      setNetwork(net?.name || "");
      setChainId(Number(net?.chainId || 0));
      setError("");
    } catch (e) {
      setError("지갑 연결에 실패했습니다.");
    }
  };

  const switchToSepolia = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: '0xAA36A7',
          chainName: 'Sepolia',
          rpcUrls: ['https://sepolia.drpc.org'],
          nativeCurrency: { name: 'SepoliaETH', symbol: 'ETH', decimals: 18 },
          blockExplorerUrls: ['https://sepolia.etherscan.io']
        }]
      });
    } catch (e) {
      setError("네트워크 전환에 실패했습니다.");
    }
  };

  const wrongNet = account && chainId !== 11155111;

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      {account ? (
        <span style={{ fontSize: 14, color: '#333' }}>
          {network && <strong style={{ marginRight: 6 }}>{network}</strong>}
          {account.slice(0, 6)}...{account.slice(-4)}
        </span>
      ) : (
        <button className="btn" onClick={connect}>🔗 지갑 연결</button>
      )}
      {wrongNet && (
        <button className="btn" onClick={switchToSepolia} style={{ padding: '6px 12px', fontSize: 12 }}>↪ Sepolia 전환</button>
      )}
      {error && <span style={{ color: '#d9480f', fontSize: 12 }}>{error}</span>}
    </div>
  );
}

export default WalletConnect;

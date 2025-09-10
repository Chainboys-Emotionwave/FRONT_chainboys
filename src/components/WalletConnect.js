import { useEffect, useState, useCallback } from "react";
import { ethers } from "ethers";

function WalletConnect() {
  const [account, setAccount] = useState("");
  const [, setNetwork] = useState("");
  const [error, setError] = useState("");
  const [chainId, setChainId] = useState(0);
  const [isConnecting, setIsConnecting] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const checkConnection = useCallback(async () => {
    try {
      if (!window.ethereum) return;
      
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        await loadUserProfile(accounts[0]);
      }
    } catch (error) {
      console.error("연결 상태 확인 실패:", error);
    }
  }, []);

  const handleAccountsChanged = useCallback((accounts) => {
    if (accounts.length > 0) {
      setAccount(accounts[0]);
      loadUserProfile(accounts[0]);
    } else {
      setAccount("");
      setUserProfile(null);
    }
  }, []);

  useEffect(() => {
    if (!window.ethereum) return;
    
    // 기존 연결 상태 확인
    checkConnection();
    
    const provider = new ethers.BrowserProvider(window.ethereum);
    provider.getNetwork().then((n) => { 
      setNetwork(n?.name || ""); 
      setChainId(Number(n?.chainId || 0)); 
    });

    // 이벤트 리스너 등록
    window.ethereum.on?.("accountsChanged", handleAccountsChanged);
    window.ethereum.on?.("chainChanged", handleChainChanged);

    return () => {
      window.ethereum?.removeListener?.("accountsChanged", handleAccountsChanged);
      window.ethereum?.removeListener?.("chainChanged", handleChainChanged);
    };
  }, [checkConnection, handleAccountsChanged]);

  const handleChainChanged = () => {
    window.location.reload();
  };

  const loadUserProfile = async (address) => {
    try {
      // 실제로는 API에서 사용자 프로필을 가져옴
      // 데모용으로 로컬 스토리지에서 가져오거나 기본값 사용
      const savedProfile = localStorage.getItem(`profile_${address}`);
      if (savedProfile) {
        setUserProfile(JSON.parse(savedProfile));
      } else {
        // 기본 프로필 생성
        const defaultProfile = {
          nickname: `User${address.slice(-4)}`,
          avatar: null,
          joinedAt: new Date().toISOString()
        };
        setUserProfile(defaultProfile);
        localStorage.setItem(`profile_${address}`, JSON.stringify(defaultProfile));
      }
    } catch (error) {
      console.error("프로필 로드 실패:", error);
    }
  };

  const connect = async () => {
    try {
      setIsConnecting(true);
      setError("");

      if (!window.ethereum) {
        setError("메타마스크를 설치해주세요.");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      
      if (accounts.length === 0) {
        setError("계정을 선택해주세요.");
        return;
      }

      setAccount(accounts[0]);
      await loadUserProfile(accounts[0]);
      
      const net = await provider.getNetwork();
      setNetwork(net?.name || "");
      setChainId(Number(net?.chainId || 0));
      
      // 연결 성공 알림
      setError("");
      
    } catch (e) {
      if (e.code === 4001) {
        setError("사용자가 연결을 거부했습니다.");
      } else {
        setError("지갑 연결에 실패했습니다.");
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = async () => {
    try {
      setAccount("");
      setUserProfile(null);
      setNetwork("");
      setChainId(0);
      setError("");
    } catch (e) {
      setError("연결 해제 중 오류가 발생했습니다.");
    }
  };

  const switchToSepolia = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xAA36A7' }],
      });
    } catch (switchError) {
      // Sepolia 네트워크가 추가되지 않은 경우
      if (switchError.code === 4902) {
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
        } catch (addError) {
          setError("네트워크 추가에 실패했습니다.");
        }
      } else {
        setError("네트워크 전환에 실패했습니다.");
      }
    }
  };

  const wrongNet = account && chainId !== 11155111;

  if (!window.ethereum) {
    return (
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        <a 
          href="https://metamask.io/download/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn btn-outline"
          style={{ fontSize: '14px', padding: '8px 16px' }}
        >
          📥 MetaMask 설치
        </a>
      </div>
    );
  }

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      {account ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* 사용자 프로필 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ 
              width: '32px', 
              height: '32px', 
              borderRadius: '50%', 
              background: '#667eea',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '14px',
              fontWeight: 'bold'
            }}>
              {userProfile?.nickname?.charAt(0).toUpperCase() || account.charAt(2).toUpperCase()}
            </div>
            <div style={{ fontSize: 14, color: '#333' }}>
              <div style={{ fontWeight: '600' }}>
                {userProfile?.nickname || `User${account.slice(-4)}`}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                {account.slice(0, 6)}...{account.slice(-4)}
              </div>
            </div>
          </div>

          {/* 네트워크 상태 */}
          {wrongNet && (
            <button 
              className="btn btn-warning" 
              onClick={switchToSepolia} 
              style={{ padding: '6px 12px', fontSize: 12 }}
            >
              ⚠️ Sepolia 전환
            </button>
          )}

          {/* 연결 해제 */}
          <button 
            className="btn btn-outline" 
            onClick={disconnect}
            style={{ padding: '6px 12px', fontSize: 12 }}
          >
            연결 해제
          </button>
        </div>
      ) : (
        <button 
          className="btn btn-primary" 
          onClick={connect}
          disabled={isConnecting}
          style={{ fontSize: '14px', padding: '8px 16px' }}
        >
          {isConnecting ? '연결 중...' : '🔗 지갑 연결'}
        </button>
      )}
      
      {error && (
        <div style={{ 
          position: 'absolute',
          top: '100%',
          right: 0,
          background: '#f8d7da',
          color: '#721c24',
          padding: '8px 12px',
          borderRadius: '4px',
          fontSize: '12px',
          border: '1px solid #f5c6cb',
          zIndex: 1000,
          marginTop: '4px'
        }}>
          {error}
        </div>
      )}
    </div>
  );
}

export default WalletConnect;

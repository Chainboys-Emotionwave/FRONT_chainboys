import { useEffect, useState, useCallback } from "react";
import { ethers } from "ethers";
import { useAuth } from "../contexts/AuthContext";
import authService from "../services/authService";

function WalletConnect() {
  const { user, isAuthenticated, loginWithWallet, logout, isLoading } = useAuth();
  const [account, setAccount] = useState("");
  const [, setNetwork] = useState("");
  const [error, setError] = useState("");
  const [chainId, setChainId] = useState(0);
  const [isConnecting, setIsConnecting] = useState(false);

  const checkConnection = useCallback(async () => {
    try {
      if (!window.ethereum) return;
      
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }
    } catch (error) {
      console.error("연결 상태 확인 실패:", error);
    }
  }, []);

  const handleAccountsChanged = useCallback((accounts) => {
    if (accounts.length > 0) {
      setAccount(accounts[0]);
    } else {
      setAccount("");
      // 지갑이 변경되면 로그아웃
      if (isAuthenticated) {
        logout();
      }
    }
  }, [isAuthenticated, logout]);

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

  // 웹3 지갑 로그인 처리
  const handleWeb3Login = async (walletAddress) => {
    try {
      setIsConnecting(true);
      setError("");

      // 1. 서명 메시지 요청
      const message = await authService.requestMessage(walletAddress);
      
      // 2. 메타마스크로 서명 요청
      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [message, walletAddress],
      });

      // 3. 서명 검증 및 로그인
      const result = await loginWithWallet(walletAddress, signature);
      
      if (result.success) {
        setError("");
        console.log("로그인 성공:", result.user);
      } else {
        setError(result.error || "로그인에 실패했습니다.");
      }
    } catch (error) {
      console.error("웹3 로그인 오류:", error);
      if (error.code === 4001) {
        setError("사용자가 서명을 거부했습니다.");
      } else {
        setError("로그인 중 오류가 발생했습니다.");
      }
    } finally {
      setIsConnecting(false);
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

      // 지갑 연결
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      
      if (accounts.length === 0) {
        setError("계정을 선택해주세요.");
        return;
      }

      const walletAddress = accounts[0];
      setAccount(walletAddress);
      
      const net = await provider.getNetwork();
      setNetwork(net?.name || "");
      setChainId(Number(net?.chainId || 0));
      
      // 웹3 로그인 처리
      await handleWeb3Login(walletAddress);
      
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
      await logout();
      setAccount("");
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
      {isAuthenticated && user ? (
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
              {user.username?.charAt(0).toUpperCase() || user.walletAddress?.charAt(2).toUpperCase()}
            </div>
            <div style={{ fontSize: 14, color: '#333' }}>
              <div style={{ fontWeight: '600' }}>
                {user.username || `User${user.walletAddress?.slice(-4)}`}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                {user.walletAddress?.slice(0, 6)}...{user.walletAddress?.slice(-4)}
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
          disabled={isConnecting || isLoading}
          style={{ fontSize: '14px', padding: '8px 16px' }}
        >
          {isConnecting || isLoading ? '연결 중...' : '🔗 지갑 연결'}
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

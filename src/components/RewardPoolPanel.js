import { useEffect, useState } from "react";
import { getRewardPoolContract } from "../eth/contracts";
import { ethers } from "ethers";

function formatEth(wei) {
  try { return (Number(wei) / 1e18).toFixed(4) + " ETH"; } catch { return "-"; }
}

function RewardPoolPanel() {
  const [total, setTotal] = useState("-");
  const [amount, setAmount] = useState("0.01");
  const [status, setStatus] = useState("");

  const load = async () => {
    try {
      const pool = await getRewardPoolContract(false);
      const t = await pool.totalPool();
      setTotal(formatEth(t));
    } catch (e) {
      setStatus("네트워크/지갑 확인 필요");
    }
  };

  useEffect(() => { load(); }, []);

  const deposit = async () => {
    try {
      setStatus("예치 중...");
      const pool = await getRewardPoolContract(true);
      const value = ethers.parseEther(String(amount || "0"));
      const tx = await pool.deposit({ value });
      await tx.wait();
      setStatus("예치 완료");
      load();
    } catch (e) {
      setStatus("예치 실패: " + (e?.shortMessage || e?.message || ""));
    }
  };

  return (
    <div className="card" style={{ 
      background: 'rgba(255, 248, 225, 0.9)',
      backdropFilter: 'blur(10px)',
      border: '2px solid rgba(255, 183, 77, 0.3)',
      marginBottom: '24px'
    }}>
      <h2 style={{ 
        color: '#2E7D32', 
        marginBottom: '20px',
        fontFamily: 'Fredoka, sans-serif',
        textAlign: 'center'
      }}>
        💰 마을 공동 금고
      </h2>
      
      {/* 금고 현황 */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '20px',
        borderRadius: '20px',
        border: '2px solid rgba(139, 195, 74, 0.3)',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        <div style={{ 
          fontSize: '2.5rem', 
          marginBottom: '8px',
          color: '#2E7D32'
        }}>
          🏦
        </div>
        <h3 style={{ 
          color: '#2E7D32',
          margin: '0 0 8px 0',
          fontFamily: 'Fredoka, sans-serif',
          fontSize: '18px'
        }}>
          총 예치액
        </h3>
        <div style={{ 
          fontSize: '2rem', 
          fontWeight: 'bold', 
          color: '#FF9800',
          fontFamily: 'Fredoka, sans-serif',
          marginBottom: '8px'
        }}>
          {total}
        </div>
        <p style={{ 
          color: '#666', 
          margin: '0',
          fontSize: '14px',
          fontFamily: 'Nunito, sans-serif'
        }}>
          마을 발전을 위한 공동 자금
        </p>
      </div>

      {/* 기여자 현황 */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '20px',
        borderRadius: '20px',
        border: '2px solid rgba(139, 195, 74, 0.3)',
        marginBottom: '20px'
      }}>
        <h3 style={{ 
          color: '#2E7D32',
          margin: '0 0 16px 0',
          fontFamily: 'Fredoka, sans-serif',
          fontSize: '16px',
          textAlign: 'center'
        }}>
          🏆 기여자 현황
        </h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
          gap: '12px'
        }}>
          {[
            { name: "MusicLover123", amount: "2.5 ETH", rank: 1 },
            { name: "ArtMaster", amount: "1.8 ETH", rank: 2 },
            { name: "DanceQueen", amount: "1.2 ETH", rank: 3 },
            { name: "ComedyKing", amount: "0.9 ETH", rank: 4 }
          ].map((contributor) => (
            <div key={contributor.rank} style={{
              background: contributor.rank <= 3 ? 'rgba(255, 183, 77, 0.2)' : 'rgba(200, 200, 200, 0.2)',
              padding: '12px',
              borderRadius: '15px',
              border: `2px solid ${contributor.rank <= 3 ? 'rgba(255, 183, 77, 0.5)' : 'rgba(200, 200, 200, 0.5)'}`,
              textAlign: 'center'
            }}>
              <div style={{ 
                fontSize: '20px', 
                marginBottom: '4px',
                color: contributor.rank <= 3 ? '#FF9800' : '#999'
              }}>
                {contributor.rank === 1 ? '🥇' : contributor.rank === 2 ? '🥈' : contributor.rank === 3 ? '🥉' : '🏅'}
              </div>
              <div style={{ 
                fontSize: '12px',
                fontFamily: 'Quicksand, sans-serif',
                fontWeight: 'bold',
                color: contributor.rank <= 3 ? '#2E7D32' : '#999',
                marginBottom: '4px'
              }}>
                {contributor.name}
              </div>
              <div style={{ 
                fontSize: '11px',
                fontFamily: 'Quicksand, sans-serif',
                color: contributor.rank <= 3 ? '#FF9800' : '#999'
              }}>
                {contributor.amount}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 기여하기 */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '20px',
        borderRadius: '20px',
        border: '2px solid rgba(139, 195, 74, 0.3)'
      }}>
        <h3 style={{ 
          color: '#2E7D32',
          margin: '0 0 16px 0',
          fontFamily: 'Fredoka, sans-serif',
          fontSize: '16px',
          textAlign: 'center'
        }}>
          💝 마을에 기여하기
        </h3>
        <div style={{ 
          display: 'flex', 
          gap: '12px', 
          alignItems: 'center', 
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <input
            type="number"
            min="0"
            step="0.001"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ 
              padding: '12px 16px', 
              borderRadius: '20px', 
              border: '2px solid rgba(139, 195, 74, 0.3)',
              width: '140px',
              fontSize: '14px',
              fontFamily: 'Quicksand, sans-serif',
              textAlign: 'center'
            }}
            placeholder="0.01"
          />
          <button 
            className="btn" 
            onClick={deposit}
            style={{
              background: 'linear-gradient(135deg, #8bc34a 0%, #aed581 100%)',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '20px',
              fontSize: '14px',
              fontFamily: 'Quicksand, sans-serif',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            💰 기여하기
          </button>
        </div>
        {status && (
          <div style={{ 
            textAlign: 'center',
            marginTop: '12px',
            padding: '8px 12px',
            background: status.includes('완료') ? 'rgba(76, 175, 80, 0.2)' : 
                       status.includes('실패') ? 'rgba(244, 67, 54, 0.2)' : 'rgba(33, 150, 243, 0.2)',
            color: status.includes('완료') ? '#2E7D32' : 
                   status.includes('실패') ? '#D32F2F' : '#1976D2',
            borderRadius: '12px',
            fontSize: '12px',
            fontFamily: 'Quicksand, sans-serif',
            fontWeight: 'bold'
          }}>
            {status}
          </div>
        )}
      </div>
    </div>
  );
}

export default RewardPoolPanel;

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
    <div className="card">
      <h3 style={{ marginBottom: 8 }}>💰 보상 풀 (RewardPool)</h3>
      <p style={{ margin: '4px 0', color: '#333' }}>총 예치액: <strong>{total}</strong></p>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 8 }}>
        <input
          type="number"
          min="0"
          step="0.001"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid #ddd', width: 120 }}
        />
        <button className="btn" onClick={deposit}>예치</button>
        {status && <span style={{ color: '#666', fontSize: 12 }}>{status}</span>}
      </div>
    </div>
  );
}

export default RewardPoolPanel;

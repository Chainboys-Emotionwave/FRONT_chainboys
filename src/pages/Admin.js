import { useState, useEffect } from "react";

function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isAdmin, setIsAdmin] = useState(false);
  const [rewardPoolBalance, setRewardPoolBalance] = useState(45.2);
  const [depositAmount, setDepositAmount] = useState("");
  const [isDepositing, setIsDepositing] = useState(false);
  const [depositMessage, setDepositMessage] = useState("");

  // 데모용 관리자 데이터
  const adminStats = {
    dau: 1247,
    newUsers: 89,
    newContents: 23,
    totalCheers: 15420,
    weeklyRewardDistributed: 12.5,
    pendingRewards: 8.3
  };

  // 데모용 보상 분배 데이터
  const rewardDistribution = [
    {
      week: "2025-W03",
      totalAmount: 12.5,
      recipients: 15,
      status: "completed",
      txHash: "0xabc123...",
      completedAt: "2025-01-15 00:00:00"
    },
    {
      week: "2025-W02", 
      totalAmount: 10.8,
      recipients: 12,
      status: "completed",
      txHash: "0xdef456...",
      completedAt: "2025-01-08 00:00:00"
    },
    {
      week: "2025-W01",
      totalAmount: 8.3,
      recipients: 10,
      status: "pending",
      txHash: null,
      completedAt: null
    }
  ];

  // 데모용 사용자 관리 데이터
  const userReports = [
    {
      id: "1",
      reporter: "0x1234...abcd",
      reported: "0x5678...efgh",
      reason: "부적절한 콘텐츠",
      contentId: "content_123",
      status: "pending",
      reportedAt: "2025-01-15 14:30:00"
    },
    {
      id: "2",
      reporter: "0x9abc...ijkl",
      reported: "0xdef0...mnop",
      reason: "스팸 행위",
      contentId: "content_456",
      status: "resolved",
      reportedAt: "2025-01-14 09:15:00"
    }
  ];

  useEffect(() => {
    // 관리자 권한 확인 (데모용)
    setIsAdmin(true);
  }, []);

  const handleDeposit = async () => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) {
      setDepositMessage("올바른 금액을 입력해주세요.");
      return;
    }

    try {
      setIsDepositing(true);
      setDepositMessage("");

      // 실제로는 블록체인 트랜잭션 실행
      await new Promise(resolve => setTimeout(resolve, 2000));

      setRewardPoolBalance(prev => prev + parseFloat(depositAmount));
      setDepositAmount("");
      setDepositMessage("보상 풀에 성공적으로 예치되었습니다! 🎉");
      
    } catch (error) {
      setDepositMessage("예치 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsDepositing(false);
    }
  };

  const handleRewardDistribution = async (week) => {
    try {
      // 실제로는 블록체인 트랜잭션 실행
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // 성공 처리
      setDepositMessage(`${week} 주간 보상 분배가 완료되었습니다! 🎉`);
    } catch (error) {
      setDepositMessage("보상 분배 중 오류가 발생했습니다.");
    }
  };

  if (!isAdmin) {
    return (
      <div>
        <div className="card">
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <h1 style={{ color: '#333', marginBottom: '16px' }}>🔒 관리자 페이지</h1>
            <p style={{ color: '#666', fontSize: '18px', marginBottom: '24px' }}>
              관리자 권한이 필요합니다.
            </p>
            <button className="btn btn-primary" style={{ fontSize: '18px', padding: '12px 24px' }}>
              🔑 관리자 로그인
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* 헤더 */}
      <div className="card hero-section">
        <div style={{ padding: '20px' }}>
          <h1 style={{ color: '#333', marginBottom: '16px', fontSize: '2rem' }}>
            🛠️ 관리자 대시보드
          </h1>
          <p style={{ color: '#666', fontSize: '18px' }}>
            플랫폼 운영 및 관리
          </p>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="card">
        <div style={{ 
          display: 'flex', 
          borderBottom: '1px solid #e9ecef',
          marginBottom: '20px'
        }}>
          {[
            { id: 'dashboard', label: '📊 대시보드', icon: '📊' },
            { id: 'rewardPool', label: '💰 보상 풀 관리', icon: '💰' },
            { id: 'distribution', label: '🎁 보상 분배', icon: '🎁' },
            { id: 'moderation', label: '🛡️ 콘텐츠 관리', icon: '🛡️' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '12px 24px',
                border: 'none',
                background: 'none',
                borderBottom: activeTab === tab.id ? '2px solid #667eea' : '2px solid transparent',
                color: activeTab === tab.id ? '#667eea' : '#666',
                fontWeight: activeTab === tab.id ? '600' : '400',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 대시보드 탭 */}
        {activeTab === 'dashboard' && (
          <div>
            <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>📊 플랫폼 현황</h3>
            
            {/* KPI 카드 */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '20px',
              marginBottom: '32px'
            }}>
              <div style={{ 
                background: '#f8f9fa', 
                padding: '20px', 
                borderRadius: '12px',
                textAlign: 'center',
                border: '1px solid #e9ecef'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>👥</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>
                  {adminStats.dau.toLocaleString()}
                </div>
                <div style={{ color: '#666' }}>일일 활성 사용자</div>
              </div>
              
              <div style={{ 
                background: '#f8f9fa', 
                padding: '20px', 
                borderRadius: '12px',
                textAlign: 'center',
                border: '1px solid #e9ecef'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🆕</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>
                  {adminStats.newUsers}
                </div>
                <div style={{ color: '#666' }}>신규 가입자</div>
              </div>
              
              <div style={{ 
                background: '#f8f9fa', 
                padding: '20px', 
                borderRadius: '12px',
                textAlign: 'center',
                border: '1px solid #e9ecef'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📝</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>
                  {adminStats.newContents}
                </div>
                <div style={{ color: '#666' }}>신규 콘텐츠</div>
              </div>
              
              <div style={{ 
                background: '#f8f9fa', 
                padding: '20px', 
                borderRadius: '12px',
                textAlign: 'center',
                border: '1px solid #e9ecef'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>💖</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>
                  {adminStats.totalCheers.toLocaleString()}
                </div>
                <div style={{ color: '#666' }}>총 응원 수</div>
              </div>
            </div>

            {/* 보상 현황 */}
            <div style={{ 
              background: '#e8f4f8', 
              padding: '20px', 
              borderRadius: '12px',
              border: '1px solid #b8daff'
            }}>
              <h4 style={{ margin: '0 0 16px 0', color: '#0c5460' }}>💰 보상 현황</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#27ae60' }}>
                    {rewardPoolBalance} ETH
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>현재 보상 풀</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#667eea' }}>
                    {adminStats.weeklyRewardDistributed} ETH
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>이번 주 분배</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#e74c3c' }}>
                    {adminStats.pendingRewards} ETH
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>대기 중</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 보상 풀 관리 탭 */}
        {activeTab === 'rewardPool' && (
          <div>
            <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>💰 보상 풀 관리</h3>
            
            {/* 현재 잔액 */}
            <div style={{ 
              background: '#f8f9fa', 
              padding: '20px', 
              borderRadius: '12px',
              marginBottom: '24px',
              textAlign: 'center'
            }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#333' }}>현재 보상 풀 잔액</h4>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#27ae60' }}>
                {rewardPoolBalance} ETH
              </div>
            </div>

            {/* 예치 폼 */}
            <div style={{ 
              background: '#fff', 
              padding: '24px', 
              borderRadius: '12px',
              border: '1px solid #e9ecef',
              marginBottom: '24px'
            }}>
              <h4 style={{ margin: '0 0 16px 0', color: '#333' }}>보상 풀 예치</h4>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'end' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                    예치할 금액 (ETH)
                  </label>
                  <input
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    placeholder="0.0"
                    min="0"
                    step="0.001"
                    style={{ 
                      width: '100%',
                      padding: '12px 16px', 
                      borderRadius: '8px', 
                      border: '1px solid #ddd',
                      fontSize: '16px'
                    }}
                  />
                </div>
                <button 
                  className="btn btn-primary"
                  onClick={handleDeposit}
                  disabled={isDepositing}
                  style={{ 
                    padding: '12px 24px',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}
                >
                  {isDepositing ? '예치 중...' : '예치하기'}
                </button>
              </div>
              
              {depositMessage && (
                <div style={{ 
                  marginTop: '16px', 
                  padding: '12px 16px',
                  borderRadius: '8px',
                  color: depositMessage.includes('성공') ? '#155724' : '#721c24',
                  background: depositMessage.includes('성공') ? '#d4edda' : '#f8d7da',
                  border: `1px solid ${depositMessage.includes('성공') ? '#c3e6cb' : '#f5c6cb'}`
                }}>
                  {depositMessage}
                </div>
              )}
            </div>

            {/* 예치 내역 */}
            <div>
              <h4 style={{ margin: '0 0 16px 0', color: '#333' }}>예치 내역</h4>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #e9ecef' }}>
                      <th style={{ padding: '12px', textAlign: 'left', color: '#666' }}>날짜</th>
                      <th style={{ padding: '12px', textAlign: 'right', color: '#666' }}>금액</th>
                      <th style={{ padding: '12px', textAlign: 'center', color: '#666' }}>실행자</th>
                      <th style={{ padding: '12px', textAlign: 'center', color: '#666' }}>트랜잭션</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #f8f9fa' }}>
                      <td style={{ padding: '12px', fontSize: '14px' }}>2025-01-15 14:30:00</td>
                      <td style={{ padding: '12px', textAlign: 'right', fontWeight: 'bold', color: '#27ae60' }}>
                        5.0 ETH
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center', fontSize: '14px' }}>
                        Admin
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <a 
                          href="#"
                          style={{ color: '#667eea', textDecoration: 'none', fontSize: '12px' }}
                        >
                          보기
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 보상 분배 탭 */}
        {activeTab === 'distribution' && (
          <div>
            <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>🎁 보상 분배</h3>
            
            <div style={{ display: 'grid', gap: '16px' }}>
              {rewardDistribution.map((reward) => (
                <div key={reward.week} style={{ 
                  background: '#f8f9fa', 
                  padding: '20px', 
                  borderRadius: '12px',
                  border: '1px solid #e9ecef'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h4 style={{ margin: 0, color: '#333' }}>{reward.week} 주간 보상</h4>
                    <span style={{ 
                      padding: '4px 12px', 
                      borderRadius: '16px', 
                      fontSize: '12px',
                      fontWeight: 'bold',
                      background: reward.status === 'completed' ? '#d4edda' : '#fff3cd',
                      color: reward.status === 'completed' ? '#155724' : '#856404'
                    }}>
                      {reward.status === 'completed' ? '완료' : '대기중'}
                    </span>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <div style={{ fontSize: '12px', color: '#666' }}>총 분배액</div>
                      <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#27ae60' }}>
                        {reward.totalAmount} ETH
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: '#666' }}>수혜자 수</div>
                      <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
                        {reward.recipients}명
                      </div>
                    </div>
                    {reward.completedAt && (
                      <div>
                        <div style={{ fontSize: '12px', color: '#666' }}>완료일시</div>
                        <div style={{ fontSize: '14px', color: '#333' }}>
                          {reward.completedAt}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {reward.status === 'pending' && (
                    <button 
                      className="btn btn-primary"
                      onClick={() => handleRewardDistribution(reward.week)}
                      style={{ fontSize: '14px', padding: '8px 16px' }}
                    >
                      🎁 보상 분배 실행
                    </button>
                  )}
                  
                  {reward.txHash && (
                    <div style={{ marginTop: '12px' }}>
                      <a 
                        href="#"
                        style={{ color: '#667eea', textDecoration: 'none', fontSize: '12px' }}
                      >
                        트랜잭션 보기: {reward.txHash}
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 콘텐츠 관리 탭 */}
        {activeTab === 'moderation' && (
          <div>
            <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>🛡️ 콘텐츠 관리</h3>
            
            <div style={{ display: 'grid', gap: '16px' }}>
              {userReports.map((report) => (
                <div key={report.id} style={{ 
                  background: '#f8f9fa', 
                  padding: '20px', 
                  borderRadius: '12px',
                  border: '1px solid #e9ecef'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h4 style={{ margin: 0, color: '#333' }}>신고 #{report.id}</h4>
                    <span style={{ 
                      padding: '4px 12px', 
                      borderRadius: '16px', 
                      fontSize: '12px',
                      fontWeight: 'bold',
                      background: report.status === 'resolved' ? '#d4edda' : '#fff3cd',
                      color: report.status === 'resolved' ? '#155724' : '#856404'
                    }}>
                      {report.status === 'resolved' ? '처리완료' : '대기중'}
                    </span>
                  </div>
                  
                  <div style={{ display: 'grid', gap: '8px', marginBottom: '16px' }}>
                    <div>
                      <strong>신고자:</strong> {report.reporter}
                    </div>
                    <div>
                      <strong>신고대상:</strong> {report.reported}
                    </div>
                    <div>
                      <strong>신고사유:</strong> {report.reason}
                    </div>
                    <div>
                      <strong>콘텐츠 ID:</strong> {report.contentId}
                    </div>
                    <div>
                      <strong>신고일시:</strong> {report.reportedAt}
                    </div>
                  </div>
                  
                  {report.status === 'pending' && (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button className="btn btn-danger" style={{ fontSize: '14px', padding: '8px 16px' }}>
                        🚫 콘텐츠 삭제
                      </button>
                      <button className="btn btn-warning" style={{ fontSize: '14px', padding: '8px 16px' }}>
                        ⚠️ 경고 발송
                      </button>
                      <button className="btn btn-success" style={{ fontSize: '14px', padding: '8px 16px' }}>
                        ✅ 신고 기각
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;

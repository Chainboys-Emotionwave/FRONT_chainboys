import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Ranking from "./pages/Ranking";
import Upload from "./pages/Upload";
import ContentDetail from "./pages/ContentDetail";
import WalletConnect from "./components/WalletConnect";

function App() {
  return (
    <Router>
      <div className="container">
        <nav>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ margin: '0 0 16px 0', color: '#667eea' }}>🎵 EmotionWave NFT</h2>
            <Link to="/">🏠 홈</Link>
            <Link to="/upload">📤 등록</Link>
            <Link to="/collection">💎 내 보관함</Link>
            <Link to="/ranking">🏆 인기 랭킹</Link>
            <div style={{ marginTop: 12 }}>
              <WalletConnect />
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/content/:id" element={<ContentDetail />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/ranking" element={<Ranking />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
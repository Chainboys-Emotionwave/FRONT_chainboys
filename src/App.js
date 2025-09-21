import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Ranking from "./pages/Ranking";
import Upload from "./pages/Upload";
import ContentDetail from "./pages/ContentDetail";
import Admin from "./pages/Admin";
import VillageGuide from "./pages/VillageGuide";
import Festival from "./pages/Festival";
import Search from "./pages/Search";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* 시작 화면 - 네비게이션 없음 */}
          <Route path="/" element={<Welcome />} />
          
          {/* 메인 앱 - 네비게이션 포함 */}
          <Route path="/home" element={
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
              <Navigation />
              <main style={{ flex: 1 }}>
                <div className="container">
                  <Home />
                </div>
              </main>
              <Footer />
            </div>
          } />
          
          <Route path="/upload" element={
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
              <Navigation />
              <main style={{ flex: 1 }}>
                <div className="container">
                  <Upload />
                </div>
              </main>
              <Footer />
            </div>
          } />
          
          <Route path="/content/:id" element={
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
              <Navigation />
              <main style={{ flex: 1 }}>
                <div className="container">
                  <ContentDetail />
                </div>
              </main>
              <Footer />
            </div>
          } />
          
          <Route path="/collection" element={
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
              <Navigation />
              <main style={{ flex: 1 }}>
                <div className="container">
                  <Collection />
                </div>
              </main>
              <Footer />
            </div>
          } />
          
          <Route path="/ranking" element={
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
              <Navigation />
              <main style={{ flex: 1 }}>
                <div className="container">
                  <Ranking />
                </div>
              </main>
              <Footer />
            </div>
          } />
          
          <Route path="/festival" element={
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
              <Navigation />
              <main style={{ flex: 1 }}>
                <div className="container">
                  <Festival />
                </div>
              </main>
              <Footer />
            </div>
          } />
          
          <Route path="/search" element={
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
              <Navigation />
              <main style={{ flex: 1 }}>
                <div className="container">
                  <Search />
                </div>
              </main>
              <Footer />
            </div>
          } />
          
              <Route path="/admin" element={
                <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                  <Navigation />
                  <main style={{ flex: 1 }}>
                    <div className="container">
                      <Admin />
                    </div>
                  </main>
                  <Footer />
                </div>
              } />
              
              <Route path="/guide" element={
                <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                  <Navigation />
                  <main style={{ flex: 1 }}>
                    <div className="container">
                      <VillageGuide />
                    </div>
                  </main>
                  <Footer />
                </div>
              } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
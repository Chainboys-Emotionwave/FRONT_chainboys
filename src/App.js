import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Ranking from "./pages/Ranking";
import Upload from "./pages/Upload";
import ContentDetail from "./pages/ContentDetail";
import Admin from "./pages/Admin";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navigation />
        
        <main style={{ flex: 1 }}>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/content/:id" element={<ContentDetail />} />
              <Route path="/collection" element={<Collection />} />
              <Route path="/ranking" element={<Ranking />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </div>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Admin from './subdomain/Admin'; // 👈 import admin từ subdomain

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />          {/* Trang chủ */}
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} /> {/* 👈 thêm route admin */}

      </Routes>
    </Router>
  );
}

export default App;

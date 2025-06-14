import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import '../styles/Home.css';
import { postFile } from '../services/api';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : location.state?.user || {};
  });
  const getAvatarUrl = (avatar: string | undefined) => {
    if (!avatar) return '/default-avatar.png';
    return avatar.startsWith('http') ? avatar : `${API_BASE}${avatar}`;
  };
  // Nếu người dùng đăng nhập lần đầu, lưu vào localStorage
  useEffect(() => {
    if (user?.id_user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);
    formData.append('id_user', user.id_user);

    try {
      const res = await postFile('/upload-avatar', formData);
      const fullUrl = `${API_BASE}${res.avatarUrl}?t=${Date.now()}`;
      const updatedUser = { ...user, avatar: fullUrl };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (err) {
      alert('Lỗi upload ảnh');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/'); // quay lại trang login
  };

  return (
    <div className="home-container">
      <h2>Trang chính</h2>
      <p>Xin chào, <strong>{user.email}</strong></p>
      <div className="avatar-wrapper" onClick={handleAvatarClick}>
        <img
          src={getAvatarUrl(user.avatar) || '/default-avatar.png'}
          alt="Avatar"
          className="avatar"
        />
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>
      <button className="logout-button" onClick={handleLogout}>
        Đăng xuất
      </button>
    </div>
  );
};

export default Home;

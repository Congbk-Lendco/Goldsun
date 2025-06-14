import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postData } from '../services/api';
import '../styles/Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const userData = {
        email,
        pass,
        avatar: null, // Gửi avatar = null cho đúng định dạng server yêu cầu
      };

      await postData('/register', userData);
      alert('Đăng ký thành công!');
      navigate('/');
    } catch (err: any) {
      alert('Lỗi: ' + err.message);
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <h2>Đăng ký</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={pass}
          onChange={e => setPass(e.target.value)}
        />
        <button onClick={handleRegister}>Đăng ký</button>
      </div>
    </div>
  );
};

export default Register;

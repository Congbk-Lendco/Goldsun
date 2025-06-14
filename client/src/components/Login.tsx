import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postData } from '../services/api';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const user = await postData('/login', { email, pass });
      alert('Đăng nhập thành công');
      navigate('/home', { state: { user } });
    } catch (err: any) {
      alert('Lỗi đăng nhập: ' + err.message);
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>Đăng nhập</h2>
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
        <button onClick={handleLogin}>Đăng nhập</button>
        <p className="register-link">
          Chưa có tài khoản?{' '}
          <button className="register-button" onClick={handleRegisterRedirect}>
            Đăng ký
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;

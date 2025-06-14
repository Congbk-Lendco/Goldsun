import { useEffect, useState } from 'react';
import { getData } from '../services/api';
import '../styles/Admin.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const Admin = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getData('/admin/users');
        setUsers(data);
      } catch (err) {
        alert('Không thể tải danh sách user');
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="admin-container">
      <h2>Quản lý người dùng</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Avatar</th>
            <th>Thời gian tạo</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id_user}>
              <td>{user.email}</td>
              <td>
                <img
                  src={user.avatar ? `${API_BASE}${user.avatar}` : '/default-avatar.png'}
                  alt="avatar"
                  width={40}
                />
              </td>
              <td>{user.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;

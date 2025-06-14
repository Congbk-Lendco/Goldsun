import { useEffect, useState } from 'react';
import { getData } from '../services/api';
import '../styles/Admin.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

interface User {
    id_user: string;
    email: string;
    avatar: string;
    time: string;
}

const Admin = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getData('/getUser');
                setUsers(data);
            } catch (err) {
                alert('Không thể tải danh sách user');
            }
        };
        fetchUsers();
    }, []);

    const filteredUsers = users.filter(user =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="admin-container">
            <h2>Quản lý người dùng</h2>

            <input
                type="text"
                placeholder="Tìm kiếm theo email..."
                className="search-box"
                value={searchTerm}
                onChange={e => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                }}
            />

            <table className="user-table">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Email</th>
                        <th>Avatar</th>
                        <th>Thời gian tạo</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedUsers.map((user, index) => (
                        <tr key={user.id_user}>
                            <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                            <td>{user.email}</td>
                            <td>
                                <img
                                    src={
                                        user.avatar && user.avatar.startsWith('http')
                                            ? user.avatar
                                            : user.avatar
                                                ? `${API_BASE}${user.avatar}`
                                                : '/default-avatar.png'
                                    }
                                    alt="avatar"
                                    className="avatar-img"
                                />
                            </td>
                            <td>{new Date(user.time).toLocaleString('vi-VN')}</td>
                            <td>
                                <button className="action-btn">Sửa</button>
                                <button className="action-btn delete">Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination">
                {Array.from({ length: totalPages }, (_, idx) => (
                    <button
                        key={idx}
                        className={currentPage === idx + 1 ? 'active' : ''}
                        onClick={() => setCurrentPage(idx + 1)}
                    >
                        {idx + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Admin;

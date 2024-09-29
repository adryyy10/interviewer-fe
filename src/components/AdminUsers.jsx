import React, { useEffect, useState } from 'react';
import { fetchAdminUsers } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './AdminUsers.css';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getUsers = async () => {
            const response = await fetchAdminUsers();
            setUsers(response.data['hydra:member']);
        };
        getUsers();
    }, []);

    const handleAddUserClick = () => {
        navigate('/admin/users/create');
    };

    return (
        <div className="admin-container">
            <div className="admin-header">
                <h2 className="admin-title">Users</h2>
                <button className="add-user-button" onClick={handleAddUserClick}>
                  Add User
                </button>
            </div>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Is admin</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.admin.toString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminUsers;

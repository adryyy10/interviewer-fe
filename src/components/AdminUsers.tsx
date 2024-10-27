import React, { useEffect, useState, FC } from 'react';
import { fetchAdminUsers } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './AdminUsers.css';
import { User } from '../types';
import { AxiosResponse } from 'axios';
import { Routes } from '../constants/routes';
import { HydraMemberResponse } from '../types/api/HydraMemberResponse';

const AdminUsers: FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response: AxiosResponse<HydraMemberResponse<User>> = await fetchAdminUsers();
                setUsers(response.data['hydra:member']);
            } catch (err) {
                console.error('Error fetching admin users:', err);
                setError('Failed to fetch users. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        getUsers();
    }, []);

    const handleAddUserClick = () => {
        navigate(Routes.CreateUser);
    };

    const handleViewUserClick = (userId: number): React.MouseEventHandler<HTMLTableRowElement> => {
        return () => {
            navigate(`/admin/users/${userId}`);
        };
    };

    if (loading) {
        return <div className="admin-container"><p>Loading users...</p></div>;
    }

    if (error) {
        return <div className="admin-container"><p className="error-message">{error}</p></div>;
    }

    return (
        <div className="admin-container">
            <div className="admin-header">
                <h2 className="admin-title">Users</h2>
                <button className="add-user-button" onClick={handleAddUserClick}>
                    Add User
                </button>
            </div>
            {users.length > 0 ? (
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Is Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: User) => (
                            <tr key={user.id || user.email} onClick={handleViewUserClick(user.id)}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.admin ? 'Yes' : 'No'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No users available.</p>
            )}
        </div>
    );
};

export default AdminUsers;

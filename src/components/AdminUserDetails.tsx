import React, { useEffect, useState, FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchAdminUserById } from '../services/api';
import { User } from '../types';
import { AxiosResponse } from 'axios';
import './AdminUserDetails.css';
import { FaArrowLeft } from 'react-icons/fa';
import { Routes } from '../constants/routes';

const AdminUserDetails: FC = () => {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            if (!id) {
                setError('No user ID provided.');
                setLoading(false);
                return;
            }
            try {
                const response: AxiosResponse<User> = await fetchAdminUserById(Number(id));
                setUser(response.data);
            } catch (err) {
                console.error('Error fetching user details:', err);
                setError('Failed to fetch user details. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        getUser();
    }, [id]);

    const handleBackClick = () => {
        navigate(Routes.AdminUsers);
    };

    if (loading) {
        return <div className="admin-user-details-container"><p>Loading user details...</p></div>;
    }

    if (error) {
        return <div className="admin-user-details-container"><p className="error-message">{error}</p></div>;
    }

    if (!user) {
        return <div className="admin-user-details-container"><p>User not found.</p></div>;
    }

    return (
        <div className="admin-user-details-container">
            <button className="back-button" onClick={handleBackClick}>
                <FaArrowLeft /> Back to Users
            </button>
            <div className="user-details-card">
                <h2>User Details</h2>
                <div className="user-detail">
                    <span className="label">Username:</span>
                    <span className="value">{user.username}</span>
                </div>
                <div className="user-detail">
                    <span className="label">Email:</span>
                    <span className="value">{user.email}</span>
                </div>
                <div className="user-detail">
                    <span className="label">Admin Status:</span>
                    <span className="value">{user.admin ? 'Admin' : 'Regular User'}</span>
                </div>
            </div>
        </div>
    );
};

export default AdminUserDetails;

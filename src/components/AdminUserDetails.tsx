import React, { useEffect, useState, FC, ChangeEvent, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchAdminUserById, updateAdminUserById } from '../services/api';
import { User } from "../types";
import { AxiosResponse } from 'axios';
import './AdminUserDetails.css';
import { FaArrowLeft, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { Routes } from '../constants/routes';
import { UpdateUserData } from '../types/user/UpdateUserData';

const AdminUserDetails: FC = () => {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [formData, setFormData] = useState<Partial<User>>({});
    const [updateError, setUpdateError] = useState<string>('');
    const [updateSuccess, setUpdateSuccess] = useState<string>('');
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const navigate = useNavigate();

    // Function to fetch user details
    const getUser = async () => {
        if (!id) {
            setError('No user ID provided.');
            setLoading(false);
            return;
        }
        try {
            const response: AxiosResponse<User> = await fetchAdminUserById(Number(id));
            setUser(response.data);
            setFormData(response.data);
        } catch (err: any) {
            console.error('Error fetching user details:', err);
            setError('Failed to fetch user details. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUser();
    }, [id]);

    const handleBackClick = () => {
        navigate(Routes.AdminUsers);
    };

    const handleEditClick = () => {
        setIsEditing(true);
        setUpdateSuccess('');
        setUpdateError('');
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setFormData(user || {});
        setUpdateSuccess('');
        setUpdateError('');
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!id || !user) {
            setUpdateError('Invalid user data.');
            return;
        }

        // Basic validation
        if (!formData.username || !formData.email) {
            setUpdateError('Username and Email are required fields.');
            return;
        }

        setIsUpdating(true);
        setUpdateError('');
        setUpdateSuccess('');

        try {
            const updatedData: UpdateUserData = {
                username: formData.username,
                email: formData.email,
                admin: formData.admin,
            };
            console.log('Updated Data:', updatedData);
            const response: AxiosResponse<User> = await updateAdminUserById(Number(id), updatedData);
            setUser(response.data);
            setFormData(response.data);
            setIsEditing(false);
            setUpdateSuccess('User updated successfully.');
        } catch (err: any) {
            console.error('Error updating user:', err);
            if (err.response) {
                console.error('Backend Response:', err.response.data);
                if (err.response.data.message) {
                    setUpdateError(`Failed to update user: ${err.response.data.message}`);
                } else if (err.response.data.errors) {
                    const errorMessages = Object.values(err.response.data.errors).flat().join(' ');
                    setUpdateError(`Failed to update user: ${errorMessages}`);
                } else {
                    setUpdateError('Failed to update user. Please try again.');
                }
            } else {
                setUpdateError('Failed to update user. Please try again.');
            }
        } finally {
            setIsUpdating(false);
        }
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
                {!isEditing ? (
                    <>
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
                        <button className="edit-button" onClick={handleEditClick}>
                            <FaEdit /> Edit User
                        </button>
                        {updateSuccess && <p className="success-message">{updateSuccess}</p>}
                        {updateError && <p className="error-message">{updateError}</p>}
                    </>
                ) : (
                    <form onSubmit={handleSubmit} className="edit-form">
                        <div className="form-group">
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username || ''}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email || ''}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="admin">Admin Status:</label>
                            <select
                                id="admin"
                                name="admin"
                                value={formData.admin ? 'true' : 'false'}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    admin: e.target.value === 'true',
                                }))}
                                required
                            >
                                <option value="false">Regular User</option>
                                <option value="true">Admin</option>
                            </select>
                        </div>
                        {/* Add more form fields as necessary */}
                        <div className="form-actions">
                            <button type="submit" className="save-button" disabled={isUpdating}>
                                {isUpdating ? 'Saving...' : <><FaSave /> Save Changes</>}
                            </button>
                            <button type="button" className="cancel-button" onClick={handleCancelEdit} disabled={isUpdating}>
                                <FaTimes /> Cancel
                            </button>
                        </div>
                        {updateError && <p className="error-message">{updateError}</p>}
                        {updateSuccess && <p className="success-message">{updateSuccess}</p>}
                    </form>
                )}
            </div>
        </div>
    );
};

export default AdminUserDetails;

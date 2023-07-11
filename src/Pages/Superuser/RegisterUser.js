import React, {useContext, useState} from 'react';
import './Styles/registeruser.css';
import axios from "axios";
import AuthContext from "../../Components/AuthProvider";

const RegisterUser = () => {
    // Context Variables:
    const {BASE_URL} = useContext(AuthContext)

    // State Variables:
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [superuser, setSuperuser] = useState(false);
    const [userDelete, setUserDelete] = useState('')
    const [deletionConfirmation, setDeletionConfirmation] = useState(false);
    const [passwordMatchError, setPasswordMatchError] = useState(false);

    // Client sends all the user data as JSON:
    const handleRegistrationSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setPasswordMatchError(true);
            return;
        }

        const data = {
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password,
            employeeId: employeeId,
            superuser: superuser,
        }
        try {
            await axios.post(BASE_URL + '/user/register/', data)
            setFirstName('')
            setLastName('')
            setUsername('')
            setPassword('')
            setConfirmPassword('')
            setEmployeeId('')
            setSuperuser(false)
        } catch (error) {
            console.error('Error: ', error)
            alert('Error creating user')
        }

    };

    // The username to be deleted is sent:
    const handleDeletionSubmit = async (e) => {
        e.preventDefault();
        if (!deletionConfirmation) {
            return;
        }
        try {
            await axios.post(BASE_URL + '/user/delete/', userDelete)
            setDeletionConfirmation(false)
            setUserDelete('')
        } catch (error) {
            console.error('Error:', error)
            alert('Error deleting user')
        }
    };

    return (
        <div className="user-container">
            <div className="user-form-container">
                <div className="user-registration-form">
                    <h2>User Registration</h2>
                    <form onSubmit={handleRegistrationSubmit}>
                        <div className="user-form-row">
                            <label htmlFor="firstName">First Name:</label>
                            <input
                                type="text"
                                id="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className='user-fields'
                                required
                            />
                        </div>

                        <div className="user-form-row">
                            <label htmlFor="lastName">Last Name:</label>
                            <input
                                type="text"
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className='user-fields'
                                required
                            />
                        </div>

                        <div className="user-form-row">
                            <label htmlFor="username">Username:</label>
                            <input
                                type="username"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className='user-fields'
                                required
                            />
                        </div>

                        <div className="user-form-row">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='user-fields'
                                required
                            />
                        </div>

                        <div className="user-form-row">
                            <label htmlFor="confirmPassword">Confirm Password:</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className='user-fields'
                                required
                            />
                        </div>

                        {passwordMatchError && (
                            <div className="error-message">Passwords do not match!</div>
                        )}

                        <div className="user-form-row">
                            <label htmlFor="employeeId">Employee ID:</label>
                            <input
                                type="text"
                                id="employeeId"
                                value={employeeId}
                                onChange={(e) => setEmployeeId(e.target.value)}
                                className='user-fields'
                                required
                            />
                        </div>

                        <div className="user-form-row">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={superuser}
                                    onChange={(e) => setSuperuser(e.target.checked)}
                                />
                                Superuser Access
                            </label>
                        </div>

                        <div className="user-form-row">
                            <button type="submit" className='user'>Register User</button>
                        </div>
                    </form>
                </div>

                <div className="user-deletion-form">
                    <h2>User Deletion</h2>
                    <form onSubmit={handleDeletionSubmit}>
                        <div className="user-form-row">
                            <label htmlFor="userDelete">Username: (to delete)</label>
                            <input
                                type="text"
                                name="userDelete"
                                id="userDelete"
                                value={userDelete}
                                onChange={e => setUserDelete(e.target.value)}
                            />
                        </div>
                        <div className="user-form-row">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={deletionConfirmation}
                                    onChange={(e) => setDeletionConfirmation(e.target.checked)}
                                />
                                I confirm the user deletion
                            </label>
                        </div>

                        <div className="user-form-row">
                            <button type="submit" className='user'>Delete User</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterUser;

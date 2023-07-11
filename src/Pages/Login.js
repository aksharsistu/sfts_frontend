import React, {useContext} from 'react'
import './Styles/login.css'
import AuthContext from "../Components/AuthProvider";

const Login = () => {
    const {loginUser} = useContext(AuthContext)

    return (
        <div className="login-container">
            <h1 className="login">Login</h1>
            <form onSubmit={loginUser}>
                <div className="login-form-row">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" placeholder="Enter username"/>
                </div>
                <div className="login-form-row">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" placeholder="Enter password"/>
                </div>
                <div className="login-form-row">
                    <button className="login-button" type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login
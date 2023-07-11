import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'
import AuthContext from "./AuthProvider";

const NavBar = () => {
    const {username, superuser} = useContext(AuthContext)

    const home = (
        <li>
        <Link to="/">Home</Link>
        </li>
    )

    const superuserLinks = [
        <li>
            <Link to="/product">Products</Link>
        </li>,
        <li>
            <Link to="/process">Process</Link>
        </li>,
        <li>
            <Link to="/stage">Stages</Link>
        </li>,
        <li>
            <Link to="/user">Users</Link>
        </li>
    ]

    const logout = (
        <li>
            <Link to="/logout">Logout</Link>
        </li>
    )

    return (
        <nav>
            <div className="nav-container">
                <div className="nav-left">
                    <span className="user"><strong>User:</strong> {username}</span>
                    <h1 className="page-title">SFTS - SynegraEMS</h1>
                </div>
                <ul className="nav-right">
                    {username ? home : null}
                    {username && superuser ? superuserLinks : null}
                    {username ? logout : null}
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;

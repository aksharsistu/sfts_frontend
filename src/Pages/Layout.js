import React from "react";
import './Styles/layout.css'
import {Outlet} from "react-router-dom";
import NavBar from '../Components/NavBar'

export default function Layout({username, superuser}) {
    return <div className="layout">
        <NavBar username={username} superuser={superuser}/>
        <Outlet/>
        <footer>Software made by BITSians for SynegraEMS</footer>
    </div>
}


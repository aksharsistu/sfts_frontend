import React, {useContext} from "react";
import AuthContext from "./AuthProvider";
import {Navigate} from "react-router-dom";

export default function PrivateRoutes({children}) {
    const {username} = useContext(AuthContext)
    return <>{ !username ? <Navigate to='/login' /> : children }</>
}

export function SuperuserRoutes({children}) {
    const {username, superuser} = useContext(AuthContext)
    if(!username){
        return <Navigate to='/login' />
    }
    return <>{ superuser ? children : <Navigate to='/nopage' /> }</>
}
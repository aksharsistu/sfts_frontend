import { createContext, useState } from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {
    const [backendIp, setBackendIp] = useState('192.168.100.248')
    // const [username, setUsername] = useState(localStorage.getItem('username') ? localStorage.getItem('username') : null)
    // const [superuser, setSuperuser] = useState(localStorage.getItem('superuser') ? localStorage.getItem('superuser') : false)
    const [username, setUsername] = useState(null)
    const [superuser, setSuperuser] = useState(false)
    const navigate = useNavigate()
    const BASE_URL = 'http://' + backendIp + ':8000'
    /*
    The Client sends username and password which the backend server verifies
    and responds with JSON containing username and superuser access boolean.
     */

    const loginUser = async (e) => {
        e.preventDefault()

        let data = {
            username: e.currentTarget.elements.username.value,
            password: e.currentTarget.elements.password.value
        }
        try {
            const response = await axios.post(BASE_URL + '/user/login/', data)
            const {username, superuser, message} = response.data
            if (message) {
                return alert(message)
            }
            // localStorage.setItem('username', username)
            // localStorage.setItem('superuser', superuser)
            setUsername(username)
            setSuperuser(superuser)
            navigate('/')
        } catch (error) {
            console.error('Error while logging in:', error)
            alert('Error while logging in')
        }
    }

    const logoutUser = () => {
        // localStorage.removeItem('username')
        // localStorage.removeItem('superuser')
        setUsername(null)
        setSuperuser(false)
        navigate('/login')
    }

    const contextData = {
        username: username,
        superuser: superuser,
        loginUser: loginUser,
        logoutUser: logoutUser,
        BASE_URL: BASE_URL,
        backendIp: backendIp,
        setBackendIp: setBackendIp
    }

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}
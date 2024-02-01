/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useState, useContext, createContext } from "react";
import { useNavigate } from "react-router-dom"

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(localStorage.getItem("site") || "")
    const navigate = useNavigate()

    const loginAction = async (data) => {
        try {
            const response = await fetch('https://frogsword-blog-api.adaptable.app/api/login', {
                mode: 'cors',
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const res = await response.json()
            
            if (res.token) {
                setUser(res.user) 
                setToken(res.token)
                localStorage.setItem("site", res.token)
                navigate("/")
                window.location.reload()
                return
            }
            else if (res.message) {
                alert(res.message)
                return
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    const logOut = () => {
        setUser(null)
        setToken("")
        localStorage.removeItem("site")
        navigate("/")
        window.location.reload()
    }

    const register = async (data) => {
        try {
            const response = await fetch('https://frogsword-blog-api.adaptable.app/api/register', {
                mode: 'cors',
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const res = await response.json()

            if (res.message === "User created successfully. Please login.") {
                alert(res.message)
                navigate("/login")
                window.location.reload()
                return
            }
            else {
                alert("Registration failed: Password must be at least 8 characters long, including one uppercase letter.")
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
    <AuthContext.Provider value={{ user, token, logOut, loginAction, register}}>
        {children}
    </AuthContext.Provider>
    )
}

export default AuthProvider;

export function useAuth() {
    return useContext(AuthContext)
}
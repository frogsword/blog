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
            
            if (res) {
                setUser(res.user) 
                setToken(res.token)
                localStorage.setItem("site", res.token)
                navigate("/")
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
        navigate("/login")
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
            
            if (res) {
                navigate("/login")
                return
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut, register}}>
        {children}
    </AuthContext.Provider>
    )
}

export default AuthProvider;

export function useAuth() {
    return useContext(AuthContext)
}
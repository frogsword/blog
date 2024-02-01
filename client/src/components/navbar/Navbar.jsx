import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { useAuth } from "../../context/AuthProvider"
import './Navbar.scss'

export function Navbar() {
    const auth = useAuth()

    //get auth status and comments
    const [authenticated, setAuthenticated] = useState(false)
    
    useEffect(() => {
        const fetchAuth = async() => {
            const token = localStorage.getItem("site")
            if (token === null) {
                setAuthenticated(false)
            }
            else {
                try {
                    const response = await fetch('https://frogsword-blog-api.adaptable.app/api/auth-status', {
                        mode: 'cors',
                        headers: {
                            authorization: `bearer ${token}`,
                        },
                        })
                        const res = await response.json()

                        setAuthenticated(res.isAuthenticated)
                }
                catch (err) {
                    setAuthenticated(false)
                }
            }
        }
        fetchAuth()
    }, [])

        return (
            <div id="navbar">

                <div id="navbar-home-link">
                    <Link to="/" style={{textDecoration: 'none'}}>
                        <h1 className="navbar-title">Blog</h1>
                    </Link>
                </div>

                <div id="navbar-auth-functions">
                    {!authenticated && (
                    <>
                        <Link to="/register">
                            <button type="button" id="register-btn" className="btn btn-secondary">Register</button>
                        </Link>
                        <Link to="/login">
                            <button type="button" id="login-btn" className="btn btn-primary">Login</button>
                        </Link>
                    </>
                    )}
                    {authenticated && (
                    <button type="button" id="login-btn" className="btn btn-primary" onClick={() => auth.logOut()}>Logout</button>
                    )}
                </div>

            </div>
        )
}
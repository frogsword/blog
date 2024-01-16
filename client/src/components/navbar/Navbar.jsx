import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthProvider"
import './Navbar.scss'

export function Navbar() {
    const auth = useAuth()
    console.log(auth)

    if (auth.user == null)
        return (
            <div className="navbar">
                <Link to="/">
                    <h1 className="navbar-title">Blog</h1>
                </Link>
                <Link to="/login">
                    <button type="button" id="login-btn" className="btn btn-primary">Log In</button>
                </Link>
                <Link to="/register">
                    <button type="button" className="btn btn-secondary register-btn">Register</button>
                </Link>
            </div>
        )
    else {
        return (
            <div className="navbar">
                <Link to="/">
                    <h1 className="navbar-title">Blog</h1>
                </Link>
                <Link to="/login">
                    <button type="button" id="login-btn" className="btn btn-primary">Log In</button>
                </Link>
                <Link to="/register">
                    <button type="button" className="btn btn-secondary register-btn">Register</button>
                </Link>
            </div>
        )   
    }

}
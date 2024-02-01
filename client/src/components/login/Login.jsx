import { useState } from "react"
import { useAuth } from "../../context/AuthProvider";
import "./Login.scss"

export function Login() {
    const [input, setInput] = useState({
        username: "",
        password: ""
    })
    const auth = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (input.username !== "" && input.password !== "") {
            auth.loginAction(input)
            return
        }
        alert("please provide a username and password")
    }

    const handleInput = (e) => {
        const { name, value } = e
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

        return (
            <div className="login-container">

                <h1>Login</h1>

                <form className="login-form" onSubmit={handleSubmit}>

                    <div className="row g-3 align-items-center input-container">
                            <input type="text" placeholder="Enter Username" name="username" className="form-control focus-ring focus-ring-light" aria-describedby="usernameHelpInline" 
                            onChange={(e) => handleInput(e.target)}></input>
                    </div>
                    
                    <div className="row g-3 align-items-center input-container">
                            <input type="password" placeholder="Enter Password" name="password" className="form-control focus-ring focus-ring-light" aria-describedby="passwordHelpInline"
                            onChange={(e) => handleInput(e.target)}></input>
                    </div>
    
                    <button id="submit-btn" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
}
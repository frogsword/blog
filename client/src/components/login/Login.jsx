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
            window.location.reload(false)
            return
        }
        alert("please provide a valid username and password")
    }

    const handleInput = (e) => {
        const { name, value } = e
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

        return (
            <div className="login">
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="row g-3 align-items-center">
                    <div className="col-auto">
                        <label htmlFor="input-username" className="col-form-label">Username</label>
                    </div>
                    <div className="col-auto">
                        <input type="text" id="input-username" name="username" className="form-control" aria-describedby="usernameHelpInline" 
                        onChange={(e) => handleInput(e.target)}></input>
                    </div>
                    </div>
    
                    
                    <div className="row g-3 align-items-center">
                    <div className="col-auto">
                        <label htmlFor="inputPassword6" className="col-form-label">Password</label>
                    </div>
                    <div className="col-auto">
                        <input type="password" id="inputPassword6" name="password" className="form-control" aria-describedby="passwordHelpInline"
                        onChange={(e) => handleInput(e.target)}></input>
                    </div>
                    <div className="col-auto">
                        <span id="passwordHelpInline" className="form-text">
                        Must be 8-20 characters long.
                        </span>
                    </div>
                    </div>
    
                    <button className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
}
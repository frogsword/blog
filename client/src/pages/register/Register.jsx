import { useState } from "react"
import { useAuth } from "../../context/AuthProvider";
import "./Register.scss"

export function Register() {
    const [input, setInput] = useState({
        username: "",
        password: "",
        confirm: ""
    })
    const auth = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (input.username !== "" && input.password !== "" && input.password === input.confirm) {
            auth.register(input)
            return
        }
        else {
            alert("Invalid username and/or password. Make sure that passwords match and that a valid username is entered.")
        }

    }

    const handleInput = (e) => {
        const { name, value } = e
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

        return (
            <div className="register-container">

                <h1>Register</h1>

                <form className="register-form" onSubmit={handleSubmit}>

                    <div className="row g-3 align-items-center input-container">
                            <input type="text" id="inputUsername" placeholder="Enter Username" name="username" className="form-control focus-ring focus-ring-light" aria-describedby="usernameHelpInline" 
                            onChange={(e) => handleInput(e.target)}></input>
                    </div>
    
                    <div className="row g-3 align-items-center input-container">
                            <input type="password" id="inputPassword" placeholder="Enter Password" name="password" className="form-control focus-ring focus-ring-light" aria-describedby="PasswordHelpInline"
                            onChange={(e) => handleInput(e.target)}></input>
                    </div>

                    <div className="row g-3 align-items-center input-container">
                            <input type="password" id="inputConfirmPassword" placeholder="Confirm Password" name="confirm" className="form-control focus-ring focus-ring-light" aria-describedby="confirmPasswordHelpInline"
                            onChange={(e) => handleInput(e.target)}></input>
                    </div>
    
                    <button id="submit-btn" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
}
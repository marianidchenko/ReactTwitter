import { useState } from "react"
import { useNavigate } from "react-router-dom"

import "../form.css"

import * as authService from "../../../services/authServices"

export const Register = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onRegister = (e) => {
        e.preventDefault();
        authService.register(email, password);
        navigate("/")
    }

    return (
        <div className="form-container">
            <h2>Step 1</h2>
            <h1 className="title">Create your account</h1>
            <form className="form" onSubmit={onRegister}>
                <input type="email" className="form-field" placeholder="Email" onChange={(e) => {setEmail(e.target.value)}}/>
                <input type="password" className="form-field" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
                <input
                    type="password"
                    className="form-field"
                    placeholder="Repeat password"
                />
                <input type="submit" className="form-btn" defaultValue="Next" />
            </form>
        </div>

    )
}
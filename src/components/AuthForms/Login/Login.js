import "../form.css"
import * as authService from "../../../services/authServices"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export const Login = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onLogin = (e) => {
        e.preventDefault();
        authService.login(email, password);
        navigate("/")
    }

    return (
        <div className="form-container">
            <h1 className="title">Sign into your profile</h1>
            <form className="form" onSubmit={onLogin}>
                <input type="email" className="form-field" placeholder="Email" onChange={(e) => {setEmail(e.target.value)}}/>
                <input type="password" className="form-field" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
                <input type="submit" className="form-btn" defaultValue="Sign in" />
                <Link to="/register" className="suggestion">Don't have an account? Get started here.</Link>
            </form>
        </div>

    )
}
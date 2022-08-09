import "../form.css"
import * as authService from "../../../services/authServices"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export const Login = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

    const validateEmail = () => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!email.match(re)) {
            setEmailError("Please enter a valid email address.");
        } else {
            setEmailError(null)
        }
    }

    const validatePassword = () => {
        if (!password.length) {
            setPasswordError("Please enter your password.");
        } else if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters long.");
        } else {
            setPasswordError(null);
        }
    }

    const onLogin = (e) => {
        e.preventDefault();
        authService.login(email, password)
            .then((error) => {
                if (error) {
                    if (error.message.includes("wrong-password")) {
                        setPasswordError("Password is incorrect.");
                        setEmailError(null)
                    } else if (error.message.includes("user-not-found")) {
                        setEmailError("Account with that email address does not exist.");
                        setPasswordError(null)
                    }
                    return
                }
                navigate('/');
            })
    }

    return (
        <div className="form-container">
            <h1 className="title">Sign into your profile</h1>
            <form className="form" onSubmit={onLogin}>
                <input type="email" className="form-field" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} onBlur={validateEmail} />
                {emailError && <label className="label-error">{emailError}</label>}
                <input type="password" className="form-field" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} onBlur={validatePassword} />
                {passwordError && <label className="label-error">{passwordError}</label>}
                <button type="submit" className="form-btn">Sign in</button>
                <Link to="/register" className="suggestion">Don't have an account? Get started here.</Link>
            </form>
        </div>

    )
}
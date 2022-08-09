import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import "../form.css"

import * as authService from "../../../services/authServices"

export const Register = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [rePassword, setRePassword] = useState("");

    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

    const validateEmail = () => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!email.match(re)) {
            setEmailError("Please enter a valid email address.");
        } else {
            setEmailError(null)
        }
    };

    const validatePassword = () => {
        if (!password.length) {
            setPasswordError("Please enter your password.");
        } else if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters long.");
        } else if (password !== rePassword && rePassword) {
            setPasswordError("Passwords do not match.");
        } else {
            setPasswordError(null);
        }
    }

    const validateRePassword = () => {
        if (password !== rePassword) {
            setPasswordError("Passwords do not match.");
        } else {
            setPasswordError(null);
        }
    }

    const onRegister = (e) => {
        e.preventDefault();
        authService.register(email, password)
            .then((error) => {
                if (error) {
                    if (error.message.includes("email-already-in-use")) {
                        setEmailError("Email address already in use. Sign in instead.");
                    }
                    return
                }
                navigate("/profile-setup")
            })
    }

    return (
        <div className="form-container">
            <h2>Step 1</h2>
            <h1 className="title">Create your account</h1>
            <form className="form" onSubmit={onRegister}>
                <input
                    type="email"
                    className="form-field"
                    placeholder="Email"
                    onChange={(e) => { setEmail(e.target.value) }}
                    onBlur={validateEmail}
                />
                {emailError && <label className="label-error">{emailError}</label>}
                <input
                    type="password"
                    className="form-field"
                    placeholder="Password"
                    onChange={(e) => { setPassword(e.target.value) }}
                    onBlur={validatePassword}
                />
                {passwordError && <label className="label-error">{passwordError}</label>}
                <input
                    type="password"
                    className="form-field"
                    placeholder="Repeat password"
                    value={rePassword}
                    onChange={(e) => { setRePassword(e.target.value) }}
                    onBlur={validateRePassword}
                />
                <button type="submit" className="form-btn" disabled={emailError || passwordError}>Next </button>
                <Link to="/login" className="suggestion">Already have an account? Sign in here.</Link>
            </form>
        </div>

    )
}
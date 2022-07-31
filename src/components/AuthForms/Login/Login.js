import "../form.css"

export const Login = () => {
    return (
        <div className="form-container">
            <h1 className="title">Sign into your profile</h1>
            <form className="form">
                <input type="email" className="form-field" placeholder="Email" />
                <input type="password" className="form-field" placeholder="Password" />
                <input type="submit" className="form-btn" defaultValue="Sign in" />
            </form>
        </div>

    )
}
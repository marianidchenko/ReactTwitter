import "../form.css"

export const Register = () => {
    return (
        <div className="form-container">
            <h2>Step 1</h2>
            <h1 className="title">Create your account</h1>
            <form className="form">
                <input type="email" className="form-field" placeholder="Email" />
                <input type="password" className="form-field" placeholder="Password" />
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
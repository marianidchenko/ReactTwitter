import "../form.css"

export const ProfileSetup = () => {
    return (
        <div className="form-container">
            <h2>Step 2</h2>
            <h1 className="title">Set up your profile</h1>
            <form className="form">
                <input type="text" className="form-field" placeholder="First Name" />
                <input type="text" className="form-field" placeholder="Last Name" />
                <input type="text" className="form-field" placeholder="Username" />
                <input type="text" className="form-field" placeholder="Image URL" />
                <input type="submit" className="form-btn" defaultValue="Register" />
            </form>
        </div>

    )
}
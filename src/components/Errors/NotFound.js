import { Link } from "react-router-dom";
import "./errors.css";

export const NotFound = () => {
    return (
        <div className="warningWrapper">
            <h1 className="code">404</h1>
            <h1 className="warning">Page not found!</h1>
            <Link to ="/" className="homeBtn">Go to homepage</Link>
        </div>

    )
}
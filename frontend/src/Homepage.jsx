import { Link } from "react-router-dom";


function Homepage() {
    return (
        <>
            <h1>--- Roshan Sharma ---</h1>
            <nav>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </nav>
        </>
    )
}

export default Homepage;
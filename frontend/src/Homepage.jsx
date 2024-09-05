import { Link } from "react-router-dom";


function Homepage (){
    return(
        <>
        <h1>--- Roshan Sharma ---</h1>
        <a href="/register"><button className="btn signup" >SignUp</button></a>
        <a href="/login"><button className="btn login">Login</button></a>
        </>
    )
}

export default Homepage;
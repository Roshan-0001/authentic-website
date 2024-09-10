import { useState, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function LoginPage() {
    return (
            <nav>
            <Link to="/">Home</Link>
            <Link to="/login/otp-login">otp</Link>
            <Link to="/login/password-login">password</Link>
            </nav>
    )
}

function PasswordLogin() {

    const [formdata, setFormdata] = useState({ username: "", password: "" });
    const [msg, setMsg] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormdata({ ...formdata, [e.target.id]: e.target.value });
    }

    const submitLogin = async (e) => {
        e.preventDefault();

        try {

            const response = await fetch("/api/login/password-login", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                },
                body: JSON.stringify(formdata),
            });
            console.log(response);
            const result = await response.json();
            console.log(result);
            
            if (response.ok) {
                alert(result.message);
                navigate("/");
            } else {
                alert(result.errors);
            }

        } catch (error) {
            console.log("Error----", error);
        }
    }




    return (
        <>
            <h1>password login  </h1>
            <form onSubmit={submitLogin}>
                <input type="text" name="username" id="username" placeholder="Username" value={formdata.username} onChange={handleChange} />
                <input type="password" name="password" id="password" placeholder="Password" value={formdata.password} onChange={handleChange} />
                <button type="submit" className="btn">Submit</button>
            </form>
        </>
    )
}
function OtpLogin() {
    return (
        <>
            <h1>OTP login here</h1>
        </>
    )
}

export { LoginPage, PasswordLogin, OtpLogin };

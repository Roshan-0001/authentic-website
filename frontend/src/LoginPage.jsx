import { useState, useEffect } from "react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

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
            
            const result = await response.json();
            if (response.ok) {
                alert(result.message);
                navigate("/");
            } else {
                alert(result.errors);
            }


        } catch (error) {
            console.error("Error----", error);
            alert(error.message || 'An unknown error occurred');
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

    const navigate = useNavigate();

    const [formdata , setFormdata] = useState({ username: "", password: "" });

    const handleChange = (e)=>{
        setFormdata({...formdata , [e.target.id]: e.target.value})
    };

    const handleSubmit= async(e) =>{
        e.preventDefault();

        try {
            const response = await fetch("/api/login/otp-login", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                },
                body: JSON.stringify(formdata),
            });
            const result = await response.json();
            if(response.ok){

                const otpResponse = await fetch("/api/login/otp-login/send-otp", {
                    method: "POST",
                    headers: {
                        'Content-Type': "application/json",
                    },
                    body: JSON.stringify(result.data),
                });

                const otpResponseResult = await otpResponse.json();

                alert(otpResponseResult.data);

                // const mail = result.data;

                navigate('/login/otp-login/verify-otp',{
                    state:result.data,
                });
                

            }else {
            alert(result.errors);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <h1>OTP login </h1>
            <form onSubmit={handleSubmit} >
                <input type="text" placeholder="Username" className="username" id="username" autoComplete="username" onChange={handleChange} />
                <p>OR</p>
                <input type="text" placeholder="Email" className="email" id="email" autoComplete="email" onChange={handleChange} /> <br />
                <button type="submit" className="btn">Submit</button>
            </form>
        </>
    )
}

function OtpLoginVerify() {
    const location = useLocation();
    const navigate = useNavigate();
    const mail = location.state;
    const [otp , setOtp] = useState({"otp": ""});

    const handleChange =(e)=>{
        setOtp({...otp, [e.target.id]:e.target.value});
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();

        const data = {...otp , ...mail};

        try {
            const response = await fetch("/api/login/otp-login/verify-otp", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                },
                body: JSON.stringify(data),
            });
    
            const result =  await response.json();
    
            if(response.ok){
                alert("User logged in successfully");
                navigate('/');
            }
            console.log(result);
            
            
        } catch (error) {
            console.log(error);
        }

        
    }
    return(
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter OTP Here" id="otp" className="otp" autoComplete="otp" onChange={handleChange} />
                <button className="btn" type="submit">Submit</button>
            </form>
        </>
    )
}

export { LoginPage, PasswordLogin, OtpLogin, OtpLoginVerify };

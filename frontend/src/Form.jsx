import "./Form.css";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';


function Form() {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' })
    const [msg, setMsg] = useState(null);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                setFormData({ username: '', email: '', password: '' });
                alert("Registration Successful, otp verrification required . Don't go back");
                navigate('/register/send-otp', {
                    state: { result },
                });
            } else {
                console.log('Registration failed:', result);
                setMsg(result.errors);
            }

        } catch (error) {
            console.log('Error: ', error);
        }
        // useEffect(() => {
        //     // Define the URL of your backend API
        //     const apiUrl = '/api/register';

        //     // Fetch data from the backend
        //     fetch(apiUrl)
        //         .then((response) => {
        //             if (!response.ok) {
        //                 throw new Error('Network response was not ok');
        //             }
        //             return response.json();
        //         })
        //         .then((data) => {
        //             setData(data);
        //             setLoading(false);
        //         })
        //         .catch((error) => {
        //             setError(error);
        //             setLoading(false);
        //         });
        // }, []);
        // console.log(data);
    };

    return (
        <>
            <h1 className="signup">SignUp</h1>
            <p className="msg">{msg}</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    id="email"
                    placeholder="Mail"
                    value={formData.email}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <button
                    className="btn"
                    type="submit"
                >
                    Submit
                </button>
            </form>


        </>
    )
}

function OtpResponse() {
    const location = useLocation();
    const m2 = location.state.result.data;
    const {email} = m2;
    const mail = {email};

    const sendOtp = async () => {
        try {
            console.log(mail);
            const response = await fetch('/api/register/send-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(mail),
            });

            const result = await response.json();

            console.log(result);
            


        } catch (error) {
            console.log(error);

        }
    }

    sendOtp();


    // try {

    //     const response = await fetch('/api/register/send-otp' , {
    //         method: 'POST',
    //         headers:{
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(message.email),
    //     });

    //     const result = await response.json();



    // } catch (error) {
    //     console.log("Error: ", error);
    // }


}


function FormOTP() {

    const [otp, setOtp] = useState({ otp: '' })


    const handleChange = (e) => {
        setOtp({ ...otp, [e.target.id]: e.target.value });
    }

    const submitOtp = async (e) => {
        e.preventDefault();

        try {

            const response = await fetch("/api/register/otp", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(otp),
            });

        } catch (error) {
            console.log("Error : ", error);
        }
    }

    return (
        <form onChange={submitOtp}>
            <input
                type="text"
                id="otp"
                placeholder="Enter otp"
                value={otp.otp}
                onChange={handleChange}
            />

            <button
                className="btn"
                type="submit"
            >
                Submit
            </button>
        </form>

    )
}

export { Form, FormOTP, OtpResponse };
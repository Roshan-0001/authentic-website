import "./Form.css";
import React from "react";
import { useState } from "react";

function Form(){
    const [formData, setFormData] = useState({username: '', email: '', password: ''})

    const handleChange = (e) =>{
        setFormData({...formData, [e.target.id]: e.target.value});
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try {
            
            const response = await fetch('/api/register' , {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if(response.ok){
                setFormData({ username: '',email: '', password: '' });
                console.log('Registration Successful:', result);
            } else {
                console.log('Registration failed:', result);   
            }

        } catch (error) {
            console.log('Error: ', error);
        }
    };

    return(
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
    )
}



function FormOTP(){

    const [otp , setOtp] = useState({otp: ''})

    const handleChange = (e) =>{
        setOtp({...otp, [e.target.id]: e.target.value});
    }

    const submitOtp = async(e) =>{
        e.preventDefault();

        try {
            
            const response = await fetch("/api/register/otp", {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(otp),
            });

        } catch (error) {
            console.log("Error : ", error);
        }
    }

    return(
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

export  {Form, FormOTP};
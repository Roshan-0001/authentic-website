import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { FormOTP, Form, OtpResponse } from './Form';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Homepage from './Homepage';
import { LoginPage, OtpLogin, PasswordLogin } from './LoginPage';


function App() {


  const [data, setData] = useState(null);

  result();

   async function result() {
    try {
      // const response = await fetch('/api', {
      //   method: "GET",
      //   headers: {
      //     'Content-Type': "application/json",
      //   },
      // });

      const response = await axios.get('/api');
      setData(response.data);
    } catch (error) {
      console.log('Error........', error); 
    }
  }
    
  return (
    <Router>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}
      <Routes>
        <Route path="*" element={<div>Page not found on this route </div>} />
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Form />} />
        <Route path="/register/send-otp" element={<OtpResponse />} />
        <Route path="/register/verify-otp" element={<FormOTP />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/login/password-login' element={<PasswordLogin />} />
        <Route path='/login/otp-login' element={<OtpLogin />} />
      </Routes>
    </Router>
  );
}

export default App;

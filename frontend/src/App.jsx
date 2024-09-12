import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { FormOTP, Form, OtpResponse } from './Form';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Homepage from './Homepage';
import { LoginPage, OtpLogin, PasswordLogin } from './LoginPage';


function App() {

  return (
    <Router>
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

import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { FormOTP , Form, OtpResponse } from './Form';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Homepage from './Homepage';

function App() {

  // const [data, setData] = useState(null);

  // useEffect(()=>{
  //   axios.get('/api')
  //     .then(response => setData(response.data))
  //     .catch(error => console.log('Error fetching data: ', error));
  // // }, []);
  // const handleClick = useCallback(() => OtpResponse(), []);

  return (
    <Router>
      
      {/* {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'} */}

      <Routes>
        <Route path="*" element={<div>Page not found</div>} />
        <Route path="/" element={<Homepage/>} />
        <Route path="/register" element={<Form/>} />
        <Route path="/register/send-otp" element={<OtpResponse/>} />
        <Route path="/register/verify-otp" element={<FormOTP/>} />
      </Routes>
    </Router>
  );
}

export default App;

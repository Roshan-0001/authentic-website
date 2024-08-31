import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { FormOTP , Form } from './Form';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {

  const [data, setData] = useState(null);

  useEffect(()=>{
    axios.get('/api')
      .then(response => setData(response.data))
      .catch(error => console.log('Error fetching data: ', error));
  }, []);

  return (
    <Router>
      
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}

      <Routes>
        <Route path="/register" element={<Form/>} />
        <Route path="/register/send-otp" element={<FormOTP/>} />
        <Route path="/register/verify-otp" element={<FormOTP/>} />
      </Routes>
    </Router>
  );
}

export default App;

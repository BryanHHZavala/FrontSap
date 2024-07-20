import './assets/styles/App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import ICC from "./pages/icc";
import React, { useState } from 'react';

const PrivateRoute = ({ element, auth }) => {
  return auth ? element : <Navigate to="/login" />;
};

function App() {
  const [auth, setAuth] = useState(false);

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route path="/" element={<PrivateRoute element={<Home />} auth={auth} />} />
          <Route path="/about" element={<PrivateRoute element={<About />} auth={auth} />} />
          <Route path="/universidad/icc" element={<PrivateRoute element={<ICC />} auth={auth} />} />
        </Routes>
        {auth && <Navbar />}
      </div>
    </BrowserRouter>
  );
}

export default App;

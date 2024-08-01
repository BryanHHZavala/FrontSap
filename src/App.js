import './assets/styles/App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Cate from "./pages/Catedraticos";
import ICC from "./pages/icc";
import React, { useState } from 'react';
import CIVIL from './pages/civil';

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
          <Route path="/catedraticos" element={<PrivateRoute element={<Cate />} auth={auth} />} />
          <Route path="/universidad/sistemas" element={<PrivateRoute element={<ICC />} auth={auth} />} />
          <Route path="/universidad/civil" element={<PrivateRoute element={<CIVIL />} auth={auth} />} />
        </Routes>
        {auth && <Navbar />}
      </div>
    </BrowserRouter>
  );
}

export default App;

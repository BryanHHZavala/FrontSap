import './assets/styles/App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import PERIODO from './pages/periodos';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Cate from "./pages/Catedraticos";
import ICC from "./pages/icc";
import React, { useState } from 'react';
import CIVIL from './pages/civil';
import PSICO from './pages/psicologia';
import MERCA from './pages/mercadotecnia';
import MEDICINA from './pages/medicina';
import DERECHO from './pages/derecho';
import GESTION from './pages/gestion';
import INDUSTRIAL from './pages/industrial';

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
          <Route path="/periodos" element={<PrivateRoute element={<PERIODO />} auth={auth} />} />
          <Route path="/catedraticos" element={<PrivateRoute element={<Cate />} auth={auth} />} />
          <Route path="/universidad/sistemas" element={<PrivateRoute element={<ICC />} auth={auth} />} />
          <Route path="/universidad/civil" element={<PrivateRoute element={<CIVIL />} auth={auth} />} />
          <Route path="/universidad/psicologia" element={<PrivateRoute element={<PSICO />} auth={auth} />} />
          <Route path="/universidad/mercadotecnia" element={<PrivateRoute element={<MERCA />} auth={auth} />} />
          <Route path="/universidad/medicina" element={<PrivateRoute element={<MEDICINA />} auth={auth} />} />
          <Route path="/universidad/derecho" element={<PrivateRoute element={<DERECHO />} auth={auth} />} />
          <Route path="/universidad/gestion" element={<PrivateRoute element={<GESTION />} auth={auth} />} />
          <Route path="/universidad/industrial" element={<PrivateRoute element={<INDUSTRIAL />} auth={auth} />} />
        </Routes>
        {auth && <Navbar />}
      </div>
    </BrowserRouter>
  );
}

export default App;

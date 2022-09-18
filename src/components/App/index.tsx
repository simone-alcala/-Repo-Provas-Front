import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './../../assets/styles/reset.css';

import AuthProvider from '../../contexts/AuthProvider';

import Home from '../../pages/Home';
import SignUp from '../../pages/SignUp';
import SignIn from '../../pages/SignIn';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/sign-in' element={<SignIn/>}/>
          <Route path='/sign-up' element={<SignUp/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
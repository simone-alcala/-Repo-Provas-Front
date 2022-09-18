import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../../pages/Home';
import SignUp from '../../pages/SignUp';
import SignIn from '../../pages/SignIn';

import './../../assets/styles/reset.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/sign-up' element={<SignIn/>}/>
        <Route path='/sign-in' element={<SignUp/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
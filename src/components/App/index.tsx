import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './../../assets/styles/reset.css';

import AuthProvider from '../../contexts/AuthProvider';

import PrivateRoute from '../PrivateRoute';
import SignUp from '../../pages/SignUp';
import SignIn from '../../pages/SignIn';
import AddTest from '../../pages/AddTest';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PrivateRoute>{<AddTest/>}</PrivateRoute>}/>
          <Route path='/tests' element={<PrivateRoute>{<AddTest/>}</PrivateRoute>}/>
          
          <Route path='/sign-in' element={<SignIn/>}/>
          <Route path='/sign-up' element={<SignUp/>}/>
          
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
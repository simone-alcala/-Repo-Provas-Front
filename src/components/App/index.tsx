import React , { StrictMode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AuthProvider from '../../contexts/AuthProvider';

import PrivateRoute from '../PrivateRoute';
import Home from '../../pages/Home';
import SignIn from '../../pages/SignIn';
import SignUp from '../../pages/SignUp';

function App() {
  return (
    <StrictMode>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            
            <Route path='/' element={ <Home/> }/>

            <Route path='/home' element={ <PrivateRoute>{ <Home/> }</PrivateRoute> }/>
            
            <Route path='/sign-up' element={ <SignUp />} />
            <Route path='/sign-in' element={ <SignIn />} />
            
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </StrictMode>
  );
}

export default App;
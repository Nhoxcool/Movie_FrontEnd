import React from 'react';
import Navbar from './components/user/Navbar';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import EmailVerification from './components/auth/EmailVerification';
import ForgetPassword from './components/auth/ForgetPassword';
import ConfirmPassword from './components/auth/ConfirmPassword';
import NotFound from './components/NotFound';
export default function App() {
  return (
    <>
      <Navbar />
      <div className="fixed left-1/2 -translate-x-1/2 top-24">
        <div className=" shadow-md shadow-gray-400 bg-red-400 bounce-custom">
          <p className="text-white px-4 py-2 font-semibold ">Something went wrong</p>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/signin" element={<Signin />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/verification" element={<EmailVerification />} />
        <Route path="/auth/forget-password" element={<ForgetPassword />} />
        <Route path="/auth/confirm-password" element={<ConfirmPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

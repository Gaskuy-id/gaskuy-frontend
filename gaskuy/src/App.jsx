import React from 'react';

import {  
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from './pages/Main/Home';
import Booking from './pages/Main/Booking';
import Detail from './pages/Main/Detail';
import BookNoDriver from './pages/Main/BookNoDriver';
import BookDriver from './pages/Main/BookDriver';
import BookSuccess from './pages/Main/BookSuccess';
import Payment from './pages/Main/Payment';
import History from './pages/Main/History';
import Profile from './pages/Main/Profile';
import MainDashboard from './pages/Dashboard/MainDashboard';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Root />}/>

          // Auth
          <Route path='/login' exact element={<Login />}/>
          <Route path='/register' exact element={<Register />}/>

          // Main
          <Route path='/home' exact element={<Home />}/>
          <Route path='/booking' exact element={<Booking />}/>
          <Route path='/detail' exact element={<Detail />}/>
          <Route path='/book-no-driver' exact element={<BookNoDriver />}/>
          <Route path='/book-driver' exact element={<BookDriver />}/>
          <Route path='/book-success' exact element={<BookSuccess />}/>
          <Route path='/payment' exact element={<Payment />}/>
          <Route path='/history' exact element={<History />}/>
          <Route path='/profile' exact element={<Profile />}/>

          // Dashboard
          <Route path='/admin-dashboard' exact element={<MainDashboard />}/>


        </Routes>
      </Router>
    </div>
  )
}

export default App;

const Root = () => {
  // Check if token existed in local storage
  const isAuthenticated = !!localStorage.getItem("token");

  // Redirected to home if authenticated, otherwise to home 
  return isAuthenticated ? (
    <Navigate to="/home" />
  ) : (
    <Navigate to="/home" />
  );
};

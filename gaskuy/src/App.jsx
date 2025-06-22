import React from 'react';
import {  
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Pages
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from './pages/Main/Home';
import Booking from './pages/Main/Booking';
import Detail from './pages/Main/Detail';
import BookPage from './pages/Main/BookPage'
import BookSuccess from './pages/Main/BookSuccess';
import Payment from './pages/Main/Payment';
import History from './pages/Main/History';
import Profile from './pages/Main/Profile';
import MainDashboard from './pages/Dashboard/MainDashboard';
import DriverDashboard from './pages/Dashboard/Driver';
import ForgotPassword from './pages/Auth/ForgotPassword'; 

// Middleware
import ProtectedRoute from './middleware/ProtectedRoute';
import RoleBasedRoute from './middleware/RoleBasedRoute';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Root />} />

          {/* Auth */}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />

          {/* Main Customer - protected for any logged-in user */}
          <Route path='/home' element={
              <Home />
          }/>
          <Route path='/booking' element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          }/>
          <Route path='/detail' element={
            <ProtectedRoute>
              <Detail />
            </ProtectedRoute>
          }/>
          <Route path='/book/:type' element={
            <ProtectedRoute>
              <BookPage />
            </ProtectedRoute>
          }/>
          <Route path='/book-success' element={
            <ProtectedRoute>
              <BookSuccess />
            </ProtectedRoute>
          }/>
          <Route path='/payment' element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }/>
          <Route path='/history' element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }/>
          <Route path='/profile' element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }/>

          {/* Dashboard Admin */}
          <Route path='/admin-dashboard' element={
            <RoleBasedRoute allowedRoles={['admin']}>
              <MainDashboard />
            </RoleBasedRoute>
          }/>

          {/* Dashboard Driver */}
          <Route path='/driver-dashboard' element={
            <RoleBasedRoute allowedRoles={['driver']}>
              <DriverDashboard />
            </RoleBasedRoute>
          }/>
        </Routes>
      </Router>
    </div>
  );
};

export default App;

// Arahkan user ke halaman sesuai role
const Root = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/home" />;

  switch (role) {
    case 'admin':
      return <Navigate to="/admin-dashboard" />;
    case 'driver':
      return <Navigate to="/driver-dashboard" />;
    case 'customer':
    default:
      return <Navigate to="/home" />;
  }
};

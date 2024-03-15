import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from './Layout/Layout';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import RestrictedRoute from './RestrictedRoute/RestrictedRoute';
import HomePage from '../pages/HomePage/HomePage';
import AuthPage from '../pages/AuthPage/AuthPage';
import WelcomePage from 'pages/WelcomePage/WelcomePage';
import AdminDashboard from './AdminComponents/AdminDashboard/AdminDashboard';

export const App = () => {

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<WelcomePage />} />
          <Route path='auth' element={<AuthPage />} />
          <Route path='home/:userType' element={<PrivateRoute component={<HomePage />} />} >
            <Route path='dashboard' element={<AdminDashboard />}></Route>
            <Route path='courses' element={<AdminDashboard  />}></Route>
            <Route path='courses/:courseId' element={<AdminDashboard />}></Route>
            <Route path='groups' element={<AdminDashboard />}></Route>
            <Route path='students' element={<AdminDashboard />}></Route>
            <Route path='teachers' element={<AdminDashboard />}></Route>
            
          </Route>
          <Route path='*' element={<RestrictedRoute component={WelcomePage} />} />
        </Route>
      </Routes>
    </>
  );
};
